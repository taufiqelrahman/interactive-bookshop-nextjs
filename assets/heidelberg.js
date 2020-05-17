/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
// /* global Hammer */

const init = function() {
  (function(factory) {
    // expose Heidelberg
    // if (typeof module === 'object' && module.exports) {
    //   require('browsernizr/test/css/transformstylepreserve3d');
    //   require('browsernizr/test/css/transforms3d');

    //   module.exports = factory(require('jquery'), require('browsernizr'));
    // } else {
    // Check for Modernizr, if not available assume modern browser
    const Modernizr = window.Modernizr || { csstransforms3d: true };
    if (typeof Modernizr.preserve3d !== 'boolean') {
      Modernizr.preserve3d = true;
    }

    window.Heidelberg = factory(require('jquery'), Modernizr);
    // }
  })(function($, Modernizr) {
    'use strict';

    function Heidelberg(el, options) {
      // Allow developer to omit new when instantiating
      if (!(this instanceof Heidelberg)) {
        if (el.length) {
          Array.prototype.forEach.call(el, function(n) {
            return new Heidelberg(n, options);
          });
        } else {
          return new Heidelberg(el, options);
        }
      }

      // OPTIONS
      const defaults = {
        nextButton: $(),
        previousButton: $(),
        hasSpreads: false,
        canClose: false,
        arrowKeys: true,
        concurrentAnimations: null,
        limitPageTurns: true,
        initialActivePage: 0,
        onPageTurn: function() {},
        onSpreadSetup: function() {},
      };

      this.options = $.extend({}, defaults, options);

      // PRIVATE constIABLES
      // Main element always a jQuery object
      this.el = el instanceof $ ? el : $(el);
      this.el.attr('data-useragent', navigator.userAgent); // Add user agent attribute to HTMLElement - used in CSS selection ( for IE10 detection )
      // RUN
      this.init();
    }

    Heidelberg.prototype.init = function() {
      const el = this.el;
      const els = {};
      const options = this.options;

      setTimeout(function() {
        el.addClass('is-ready');
      }, 0);

      if (options.hasSpreads) {
        this.setupSpreads();
      }

      const leftFunction = options.canClose ? 'even' : 'odd';
      const rightFunction = options.canClose ? 'odd' : 'even';

      els.pages = $('.Heidelberg-Page', this.el);
      els.pagesLeft = $('.Heidelberg-Page:nth-child(' + leftFunction + ')', el);
      els.pagesRight = $('.Heidelberg-Page:nth-child(' + rightFunction + ')', el);

      // if initialActivePage is odd, we substract one.
      const initialActivePage =
        options.initialActivePage & 1 ? options.initialActivePage - 1 : options.initialActivePage;

      if (!options.canClose) {
        const coverEl = $('<div />').addClass('Heidelberg-HiddenCover');
        el.prepend(coverEl.clone());
        el.append(coverEl.clone());

        els.pages
          .eq(initialActivePage)
          .add(els.pages.eq(initialActivePage + 1))
          .addClass('is-active');
      } else {
        if (options.initialActivePage !== 0) {
          els.pages
            .eq(initialActivePage)
            .add(els.pages.eq(initialActivePage + 1))
            .addClass('is-active');
        } else {
          els.pages.eq(0).addClass('is-active');
        }
      }

      els.previousTrigger = els.pagesLeft.add(options.previousButton);
      els.nextTrigger = els.pagesRight.add(options.nextButton);

      els.previousTrigger.on(
        'click',
        function() {
          this.turnPage('back');
        }.bind(this),
      );

      els.nextTrigger.on(
        'click',
        function() {
          this.turnPage('forwards');
        }.bind(this),
      );

      if (typeof Hammer !== 'undefined') {
        const opts = {
          drag_min_distance: 5,
          swipe_velocity: 0.3,
        };

        const hammerLeft = new Hammer(document.querySelector('.Heidelberg-Page:nth-child(2n)'), opts);
        hammerLeft.on(
          'swiperight',
          function(evt) {
            this.turnPage('back');
            // evt.gesture.stopDetect();
            evt.preventDefault();
          }.bind(this),
        );

        const hammerRight = new Hammer(document.querySelector('.Heidelberg-Page:nth-child(odd)'), opts);
        hammerRight.on(
          'swipeleft',
          function(evt) {
            this.turnPage('forwards');
            // evt.gesture.stopDetect();
            evt.preventDefault();
          }.bind(this),
        );
      }

      let forwardsKeycode = 37;
      let backKeycode = 39;

      if (!Modernizr.csstransforms3d) {
        forwardsKeycode = 39;
        backKeycode = 37;
      }

      if (options.arrowKeys) {
        $(document).keydown(
          function(e) {
            if (e.keyCode == forwardsKeycode) {
              this.turnPage('forwards');
              return false;
            }
            if (e.keyCode == backKeycode) {
              this.turnPage('back');
              return false;
            }
          }.bind(this),
        );
      }
    };

    Heidelberg.prototype.isLastPage = function() {
      const el = this.el;
      const els = {};
      const index = {};
      els.pages = $('.Heidelberg-Page', el);
      els.pagesActive = $('.Heidelberg-Page.is-active', el);
      index.activeLeft = els.pagesActive.eq(0).index(); // Note about fix: the double spread code above caused code to wrap to bottom of array . This is the fix for double spreads.
      return els.pages.last().index() == index.activeLeft;
    };

    Heidelberg.prototype.isFirstPage = function() {
      const el = this.el;
      const els = {};
      const index = {};
      els.pages = $('.Heidelberg-Page', el);
      els.pagesActive = $('.Heidelberg-Page.is-active', el);
      index.activeRight = els.pagesActive.eq(0).index();
      return els.pages.first().index() == index.activeRight;
    };

    Heidelberg.prototype.turnPage = function(arg) {
      const el = this.el;
      const els = {};
      const options = this.options;
      const index = {};
      let direction = arg;

      els.pages = $('.Heidelberg-Page', el);
      els.pagesActive = $('.Heidelberg-Page.is-active', el);
      els.pagesAnimating = $('.Heidelberg-Page.is-animating', el);
      els.children = $('.Heidelberg-Page, .Heidelberg-HiddenCover', el);

      const maxAnimations = options.concurrentAnimations && els.pagesAnimating.length > options.concurrentAnimations;
      const maxAnimationsBrowser = !Modernizr.preserve3d && els.pagesAnimating.length > 2 && options.limitPageTurns;

      if (maxAnimations || maxAnimationsBrowser) {
        return;
      }

      if (options.hasSpreads) {
        index.activeRight = els.pagesActive.eq(1).index();
        index.activeLeft = index.activeRight - 1;
      } else {
        // Single page spreads
        index.activeLeft = els.pagesActive.eq(0).index(); // Note about fix: the double spread code above caused code to wrap to bottom of array . This is the fix for double spreads.
        index.activeRight = index.activeLeft + 1;
      }

      const isFirstPage = els.pages.first().index() == index.activeLeft && direction == 'back';
      const isLastPage = els.pages.last().index() == index.activeRight && direction == 'forwards';

      if (isFirstPage || isLastPage) {
        return;
      }

      if (typeof arg == 'number') {
        const isOdd = arg & 1;
        const isRight = options.canClose ? isOdd : !isOdd;

        index.targetRight = isRight ? arg : arg + 1;
        index.targetLeft = index.targetRight - 1;

        if (index.targetLeft == index.activeLeft) {
          return;
        } else if (index.targetLeft > index.activeRight) {
          direction = 'forwards';
          index.target = index.targetLeft;
          index.targetSibling = index.target + 1;
        } else {
          direction = 'back';
          index.target = index.targetRight;
          index.targetSibling = index.target - 1;
        }

        if (!options.hasSpreads) {
          index.target = index.target - 1;
          index.targetSibling = index.targetSibling - 1;
        }
      } else {
        index.target = direction == 'forwards' ? index.activeRight + 1 : index.activeLeft - 1;
        index.targetSibling = direction == 'forwards' ? index.activeRight + 2 : index.activeLeft - 2;
      }

      if (!options.hasSpreads && direction == 'forwards' && index.target == 2) {
        index.target = 1;
        index.targetSibling = 2;
      }

      els.pagesAnimatingOut = direction == 'back' ? els.pagesActive.first() : els.pagesActive.last();
      els.pagesAnimatingIn = els.children.eq(index.target);
      els.pagesTarget = els.pagesAnimatingIn;
      if (index.targetSibling !== -1) els.pagesTarget = els.pagesTarget.add(els.children.eq(index.targetSibling));
      els.pagesAnimating = els.pagesAnimatingIn.add(els.pagesAnimatingOut);

      els.pagesActive.removeClass('is-active').addClass('was-active');
      els.pagesTarget.addClass('is-active');

      if (Modernizr.csstransforms3d) {
        els.pagesAnimating.addClass('is-animating');
      }

      els.pagesAnimating.on(
        'webkitTransitionEnd oTransitionEnd msTransitionEnd transitionend',
        function() {
          els.pagesAnimating.removeClass('is-animating');
          els.pagesActive.removeClass('was-active');
        }.bind(document),
      );

      options.onPageTurn(el, els);
      // options.onPageTurn(this.isFirstPage(), this.isLastPage());
      $(this).trigger('pageTurn.heidelberg', [el, els]);

      if (direction == 'forwards' && els.pagesTarget.first().hasClass('last-page')) {
        $('#Heidelberg').removeClass('at-front-cover');
        $('#Heidelberg').addClass('at-rear-cover');
      } else if (direction == 'back' && els.pagesTarget.first().hasClass('first-page')) {
        $('#Heidelberg').removeClass('at-rear-cover');
        $('#Heidelberg').addClass('at-front-cover');
      } else {
        $('#Heidelberg').removeClass('at-rear-cover');
        $('#Heidelberg').removeClass('at-front-cover');
      }
    };

    Heidelberg.prototype.setupSpreads = function() {
      const el = this.el;
      const options = this.options;

      $('.Heidelberg-Spread', el).each(function() {
        const spreadEl = $(this);
        const pageEl = $('<div />')
          .addClass('Heidelberg-Page with-Spread')
          .html(spreadEl.clone());
        spreadEl.after(pageEl);
        spreadEl.replaceWith(pageEl.clone());
      });

      options.onSpreadSetup(el);
      $(this).trigger('spreadSetup.heidelberg', el);
    };
    return Heidelberg;
  });
};
export default init;
