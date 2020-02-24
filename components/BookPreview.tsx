import { useEffect, useState, useCallback, useRef } from 'react';
import $ from 'jquery';
import initHeidelberg from 'assets/heidelberg.js';
import debounce from 'lodash.debounce';
import BookPage from './atoms/BookPage';
import dummyPages from '_mocks/bookPages';
// import CircleType from 'circletype';

const BookPreview = (props: any) => {
  const [, setBook] = useState(null);
  const [state, setState] = useState({
    height: 0,
    loaded: false,
  });
  // const [pageInfo, setPageInfo] = useState({
  //   firstPage: true,
  //   lastPage: false,
  // });

  const updateHeight = () => {
    const image: any = document.querySelector('.Heidelberg-Page img');
    setState({ ...state, height: image.height, loaded: true });
    return Promise.resolve();
  };

  // const updatePageInfo = () => {
  //   setPageInfo({ ...pageInfo, firstPage: (book as any).isFirstPage(), lastPage: (book as any).isLastPage() });
  // };

  const setupBook = async () => {
    await updateHeight();
    const bookHeidelberg = new (window as any).Heidelberg($('#Heidelberg'), {
      // initialActivePage: 1,
      canClose: true,
      arrowKeys: true,
      concurrentAnimations: 5,
      // hasSpreads: true,
      // onPageTurn: (isFirstPage: boolean, isLastPage: boolean) => {
      //   setPageInfo({ firstPage: isFirstPage, lastPage: isLastPage });
      // },
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
    return () => {
      window.removeEventListener('resize', () => debouncedSetup);
    };
    // setTimeout(() => {
    //   new CircleType(document.getElementById('title1')).radius(384);
    //   new CircleType(document.getElementById('title2')).radius(384);
    //   new CircleType(document.getElementById('title3')).radius(384);
    // }, 1000);
  }, []);

  // useEffect(() => {
  //   if (!book) return;
  //   updatePageInfo();
  // }, [book]);

  // const firstPage = () => {
  //   if (pageInfo.firstPage) return;
  //   (book as any).turnPage(1);
  //   updatePageInfo();
  // };

  // const prevPage = () => {
  //   if (pageInfo.firstPage) return;
  //   (book as any).turnPage('back');
  //   updatePageInfo();
  // };

  // const nextPage = () => {
  //   if (pageInfo.lastPage) return;
  //   (book as any).turnPage('forwards');
  //   updatePageInfo();
  // };

  // const lastPage = () => {
  //   if (pageInfo.lastPage) return;
  //   (book as any).turnPage(6);
  //   updatePageInfo();
  // };

  const getImage = (job, order) => {
    const { gender, age, skin, hair } = props.selected;
    return `/static/images/pages/${job}/${order}/${gender}_${age}_${skin}_${hair}.jpeg`;
  };

  const pageClass = index => {
    if (index === 0) return 'first-page';
    if (index === dummyPages.length - 1) return 'last-page';
    return '';
  };

  return (
    <div className="c-book-preview">
      {/* <div className="c-book-preview__left">
        <span
          className={`c-book-preview__nav icon-chevron_left ${
            pageInfo.firstPage ? 'c-book-preview__nav--disabled' : ''
          }`}
          onClick={firstPage}
        />
        <span
          className={`c-book-preview__nav icon-chevron_left ${
            pageInfo.firstPage ? 'c-book-preview__nav--disabled' : ''
          }`}
          onClick={prevPage}
        />
      </div> */}
      <div className="c-book-preview__container">
        <div className="Heidelberg-Book at-front-cover" id="Heidelberg">
          {dummyPages &&
            dummyPages.map((page, index) => (
              <BookPage
                key={index}
                className={`Heidelberg-Page ${pageClass(index)}`}
                image={getImage(page.job, page.order)}
                name={props.selected.name}
                {...page}
              />
            ))}
        </div>
      </div>
      {/* <div className="c-book-preview__right">
        <span
          className={`c-book-preview__nav icon-chevron_right ${
            pageInfo.lastPage ? 'c-book-preview__nav--disabled' : ''
          }`}
          onClick={nextPage}
        />
        <span
          className={`c-book-preview__nav icon-chevron_right ${
            pageInfo.lastPage ? 'c-book-preview__nav--disabled' : ''
          }`}
          onClick={lastPage}
        />
      </div> */}
      <style jsx>{`
        .c-book-preview {
          @apply flex items-center mt-4;
          &__left {
            @apply w-2/12 flex justify-end;
            padding-right: 30px;
            z-index: 2;
          }
          &__container {
            @apply w-full relative;
            height: ${state.height}px;
            transition: height 0.5s;
            z-index: 1;
          }
          &__right {
            @apply w-2/12 flex justify-start;
            padding-left: 30px;
            z-index: 2;
          }
          &__nav {
            @apply text-white flex items-center justify-center font-bold cursor-pointer;
            background: #e1e1e1;
            border-radius: 50%;
            height: 44px;
            width: 44px;
            .c-book-preview__left &:first-child {
              margin-right: 12px;
            }
            .c-book-preview__right &:last-child {
              margin-left: 12px;
            }
            &:hover {
              background: #de6236;
              transition: background 0.5s;
            }
            &--disabled {
              @apply cursor-not-allowed;
              background: #efeef4;
              &:hover {
                background: #efeef4;
              }
            }
          }
        }
      `}</style>
      <style jsx global>{`
        .Heidelberg-Book {
          -webkit-perspective: 2200px;
          perspective: 2200px;
          -webkit-transform-style: preserve-3d;
          transform-style: preserve-3d;
          opacity: ${state.loaded ? 1 : 0};

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
          cursor: pointer;
          overflow: hidden;
          position: absolute;
          width: 50%;
          min-height: 100%;
          max-height: 100%;
          background: #000;
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
          -webkit-transform: rotateY(0);
          transform: rotateY(0);
          background: #efeef4;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
          -webkit-transition: none;
          -o-transition: none;
          transition: none;
          height: 100%;

          -webkit-transition: -webkit-transform 0.9s ease;
          transition: -webkit-transform 0.9s ease;
          -o-transition: transform 0.9s ease;
          transition: transform 0.9s ease;
          transition: transform 0.9s ease, -webkit-transform 0.9s ease;

          &:nth-child(2n) {
            -webkit-transform-origin: 100%;
            -ms-transform-origin: 100%;
            transform-origin: 100%;
            left: 0;
            border-radius: 6px 0px 0px 6px;

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
            border-radius: 0px 6px 6px 0px;

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
