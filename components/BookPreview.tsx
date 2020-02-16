import { useEffect, useState, useCallback, useRef } from 'react';
import $ from 'jquery';
import initHeidelberg from 'assets/heidelberg.js';
import debounce from 'lodash.debounce';
// import CircleType from 'circletype';

const BookPreview = () => {
  const [, setBook] = useState(null);
  const [height, setHeight] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const updateHeight = () => {
    const image: any = document.querySelector('.Heidelberg-Page img');
    setHeight(image.height);
    return Promise.resolve();
  };

  const setupBook = async () => {
    await updateHeight();
    setLoaded(true);
    const bookHeidelberg = new (window as any).Heidelberg($('#Heidelberg'), {
      initialActivePage: 1,
      canClose: true,
      arrowKeys: true,
      concurrentAnimations: 5,
      // hasSpreads: true,
    });
    setBook(bookHeidelberg);
  };

  const debouncedFunctionRef = useRef();
  (debouncedFunctionRef.current as any) = () => {
    setupBook();
  };
  const debouncedSetup = useCallback(
    debounce(() => (debouncedFunctionRef.current as any)(), 300),
    [],
  );
  useEffect(() => {
    initHeidelberg();
    setupBook();
    window.addEventListener('resize', debouncedSetup);
    // setTimeout(() => {
    //   new CircleType(document.getElementById('title1')).radius(384);
    //   new CircleType(document.getElementById('title2')).radius(384);
    //   new CircleType(document.getElementById('title3')).radius(384);
    // }, 1000);
    // TODOS
    // 1. add lazy loading images when near
    // 1. add loading spinner
    // 3. link breadcrumbs
    // 4. make it smooth with hammer etc maybe
  }, [false]);

  return (
    <div className="c-book-preview">
      {/* <div className="Heidelberg-Book with-Spreads" id="Heidelberg"> */}
      <div className="Heidelberg-Book at-front-cover" id="Heidelberg">
        <div className="Heidelberg-Page first-page">
          <img src="/static/images/pages/astronaut/1/girl_kid_light_hair.jpeg" />
        </div>
        <div className="Heidelberg-Page">
          <img src="/static/images/pages/astronaut/3/girl_kid_light_hair.jpeg" />
        </div>
        <div className="Heidelberg-Page">
          <img src="/static/images/pages/astronaut/2/girl_kid_light_hair.jpeg" />
        </div>
        <div className="Heidelberg-Page">
          <img src="/static/images/pages/astronaut/1/girl_kid_light_hair.jpeg" />
        </div>
        <div className="Heidelberg-Page">
          <img src="/static/images/pages/astronaut/2/girl_kid_light_hair.jpeg" />
        </div>
        <div className="Heidelberg-Page last-page">
          <img src="/static/images/pages/astronaut/3/girl_kid_light_hair.jpeg" />
        </div>
      </div>
      <style jsx>{`
        .c-book-preview {
          @apply w-4/5 relative mt-4 mx-auto;
          height: ${height}px;
          transition: height 0.5s;
          z-index: 1;
        }
      `}</style>
      <style jsx global>{`
        .Heidelberg-Book {
          -webkit-perspective: 2200px;
          perspective: 2200px;
          -webkit-transform-style: preserve-3d;
          transform-style: preserve-3d;
          opacity: ${loaded ? 1 : 0};

          .Heidelberg-Page {
            -webkit-transition: -webkit-transform 0.9s ease;
            transition: -webkit-transform 0.9s ease;
            -o-transition: transform 0.9s ease;
            transition: transform 0.9s ease;
            transition: transform 0.9s ease, -webkit-transform 0.9s ease;
          }

          &:not(.is-ready) * {
            -webkit-transition: none !important;
            -o-transition: none !important;
            transition: none !important;
          }

          &:after {
            content: '';
            display: table;
            clear: both;
          }
        }

        .Heidelberg-Page {
          overflow: hidden;
          position: absolute;
          width: 50%;
          min-height: 100%;
          max-height: 100%;
          background: #000;
          overflow: hidden;
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
          -webkit-transform: rotateY(0);
          transform: rotateY(0);
          border: 3px solid #e1e0e7;
          background: #efeef4;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
          -webkit-transition: none;
          -o-transition: none;
          transition: none;
          height: 100%;

          &:nth-child(2n) {
            -webkit-transform-origin: 100%;
            -ms-transform-origin: 100%;
            transform-origin: 100%;
            left: 0;
            border-radius: 16px 0px 0px 16px;

            &:not(.last-page) {
              border-right: none;
            }
          }

          &:nth-child(odd) {
            -webkit-transform-origin: 0;
            -ms-transform-origin: 0;
            transform-origin: 0;
            right: 0;
            -webkit-transform: rotateY(-180deg);
            transform: rotateY(-180deg);
            border-radius: 0px 16px 16px 0px;

            &:not(.first-page) {
              border-left: none;
            }
          }

          &.is-active {
            z-index: 2;

            &:nth-child(2n) {
              -webkit-transform: rotateY(10deg);
              transform: rotateY(10deg);

              &:hover {
                -webkit-transform: rotateY(15deg);
                transform: rotateY(15deg);
              }
            }

            &:nth-child(odd) {
              -webkit-transform: rotateY(-10deg);
              transform: rotateY(-10deg);

              &:hover {
                -webkit-transform: rotateY(-15deg);
                transform: rotateY(-15deg);
              }

              ~ .Heidelberg-Page {
                &:nth-child(2n) {
                  -webkit-transform: rotateY(180deg);
                  transform: rotateY(180deg);
                }

                &:nth-child(odd) {
                  -webkit-transform: rotateY(0);
                  transform: rotateY(0);
                }
              }
            }
          }

          &.was-active {
            z-index: 1;
          }

          &.is-animating {
            &:nth-child(odd) {
              z-index: 4;

              ~ .Heidelberg-Page.is-animating {
                z-index: 3;
              }
            }

            + .Heidelberg-Page:not(.is-animating):nth-child(odd) {
              z-index: 1;
            }
          }
        }

        .Heidelberg-Book > .Heidelberg-Spread {
          display: none;

          &:first-child {
            display: block;
            width: 100%;
            overflow: hidden;
          }
        }

        .no-csstransforms3d .Heidelberg-Page {
          display: none;

          &.is-active {
            display: block;
            position: relative;
            float: left;
          }
        }

        .Heidelberg-Spread {
          position: relative;
          width: 200%;
        }

        .Heidelberg-Page.with-Spread:nth-child(odd) .Heidelberg-Spread,
        .no-csstransforms3d
          .Heidelberg-Page.with-Spread.is-active
          + .Heidelberg-Page.with-Spread.is-active
          .Heidelberg-Spread {
          left: -100%;
        }

        .Heidelberg-Book {
          &[data-useragent*='MSIE 10.0'] .Heidelberg-Page {
            opacity: 0;

            &.is-active {
              -webkit-transition: opacity 0.9s ease, -webkit-transform 0.9s ease;
              transition: opacity 0.9s ease, -webkit-transform 0.9s ease;
              -o-transition: transform 0.9s ease, opacity 0.9s ease;
              transition: transform 0.9s ease, opacity 0.9s ease;
              transition: transform 0.9s ease, opacity 0.9s ease, -webkit-transform 0.9s ease;
              opacity: 1;
            }

            &.was-active {
              -webkit-transition-delay: 2s;
              -o-transition-delay: 2s;
              transition-delay: 2s;
              -webkit-transition: opacity 0.9s ease, -webkit-transform 0.9s ease;
              transition: opacity 0.9s ease, -webkit-transform 0.9s ease;
              -o-transition: transform 0.9s ease, opacity 0.9s ease;
              transition: transform 0.9s ease, opacity 0.9s ease;
              transition: transform 0.9s ease, opacity 0.9s ease, -webkit-transform 0.9s ease;
              opacity: 0;
            }
          }

          position: absolute;
          left: 0;
          -webkit-transition: left 0.7s;
          -o-transition: left 0.7s;
          transition: left 0.7s;
          top: 0;
          width: 100%;
          height: 100%;

          &.at-front-cover {
            left: -25%;
          }

          &.at-rear-cover {
            left: 25%;
          }
        }

        @supports (transition: transform 0.9s ease) and (not (-ms-ime-align: auto)) {
          .Heidelberg-Page {
            -webkit-transition: -webkit-transform 0.9s ease;
            transition: -webkit-transform 0.9s ease;
            -o-transition: transform 0.9s ease;
            transition: transform 0.9s ease;
            transition: transform 0.9s ease, -webkit-transform 0.9s ease;
          }
        }

        .Heidelberg-Page {
          &:before {
            content: '';
            position: absolute;
            z-index: 3;
            right: 0;
            width: 100%;
            height: 100%;
            background-size: 100% 100%;
          }

          &.with-Spread:before {
            display: none;
          }

          &:nth-child(2n).is-active:hover {
            -webkit-transform: rotateY(5deg);
            transform: rotateY(5deg);
          }

          &:nth-child(odd).is-active:hover {
            -webkit-transform: rotateY(-5deg);
            transform: rotateY(-5deg);
          }

          &.is-active:not(:hover) {
            -webkit-transform: rotateY(0deg);
            transform: rotateY(0deg);
          }
        }

        .Heidelberg-Spread {
          height: 100%;
        }

        .heidelberg-book-image {
          position: relative;
          z-index: 2;
          height: auto;
          width: 100%;
          display: block;
          pointer-events: none;
        }

        .Heidelberg-Page .ss-loading {
          font-size: 2rem;
          position: absolute;
          z-index: 1;
          top: 0;
          bottom: 0;
          width: 100%;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;

          &:before {
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            -webkit-box-pack: center;
            -ms-flex-pack: center;
            justify-content: center;
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default BookPreview;

/*
text trick

# text:
element: <foreignObject>
position: center or custom
width:

# title
element: <foreignObject>
CircleType

# the-end
element: <foreignObject>
CircleType

*/
