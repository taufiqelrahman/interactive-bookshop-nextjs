import { useEffect, useState, useCallback, useRef, Fragment, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { i18n } from 'i18n';
import debounce from 'lodash.debounce';
import groupby from 'lodash.groupby';
import sortby from 'lodash.sortby';
import * as gtag from 'lib/gtag';
import detectIt from 'detect-it';
import initBook from 'assets/flipbook.js';
import BookPage from 'components/atoms/BookPage';
// import dummyPages from '_mocks/bookPages';

const Pagination = dynamic(() => import('components/atoms/Pagination'));

const BookPreview = (props: any) => {
  // const [, setBook] = useState(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [bookClicked, setBookClicked] = useState<boolean>(false);
  const pagesRef = useRef<HTMLDivElement | null>(null);
  // const [pageInfo, setPageInfo] = useState({
  //   firstPage: true,
  //   lastPage: false,
  // });

  /**
   * Desktop only
   */
  const [showBook, setShowBook] = useState<boolean>(false);
  const [height, setHeight] = useState<number>(0);

  const updateHeight = () => {
    if (!pagesRef.current) return;
    const containerWidth = window.innerWidth > 1023 ? window.innerWidth * 0.75 : (window.innerWidth * 11) / 12;
    const padding = 60;
    const bookRatio = 495 / 700;
    setHeight(() => ((containerWidth - padding) / 2) * bookRatio);
  };

  const setupBook = (currentHeight: number) => {
    new (window as any).FlipBook('FlipBook', {
      canClose: true,
      arrowKeys: true,
      concurrentAnimations: 5,
      height: `${currentHeight}px`,
      initialCall: true,
      onPageTurn: (_: any, els: { pagesTarget: any }) => {
        gtag.event({
          action: 'click_book_page',
          category: 'engagement',
          label: 'desktop',
        });
        const currentPage = els.pagesTarget[els.pagesTarget.length - 1];
        if (currentPage) setCurrentPage(parseInt(currentPage.id, 10));
        if (!bookClicked) setBookClicked(true);
      },
    });
    // setBook(flipBookInstance);
  };
  const debouncedSetup = useCallback(
    debounce(() => updateHeight(), 300),
    [],
  );

  /**
   * Mobile only
   */
  const handleScroll = () => {
    const svgPages = document.getElementsByClassName('c-book-page__svg');
    if (!svgPages.length) return;
    const imageWidth = document.getElementsByClassName('c-book-page__svg')[0].getBoundingClientRect().width;
    const currentScroll = Math.floor((pagesRef.current as HTMLDivElement).scrollLeft / imageWidth) + 1;
    setCurrentPage(currentScroll);
  };
  useEffect(() => {
    if (props.isMobile && pagesRef.current) {
      pagesRef.current.addEventListener('scroll', handleScroll, detectIt.passiveEvents ? { passive: true } : false);
    } else {
      initBook();
      updateHeight();
      window.addEventListener('resize', debouncedSetup, detectIt.passiveEvents ? { passive: true } : false);
    }
    return () => {
      if (props.isMobile) {
        window.removeEventListener('scroll', handleScroll);
      } else {
        pagesRef.current = null;
        window.removeEventListener('resize', debouncedSetup);
      }
    };
  }, []);

  const rerenderBookPages = (currentHeight: number) => {
    setShowBook(() => false);
    setTimeout(() => {
      setShowBook(() => true);
      setupBook(currentHeight);
    }, 500);
  };

  /**
   * Handle book on window resize
   */
  useEffect(() => {
    if (!height) return;
    rerenderBookPages(height);
  }, [height]);

  /**
   * Handle book when languange changes
   */
  const isFirstRun = useRef(true);
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    rerenderBookPages(height);
  }, [i18n.language]);

  // const updatePageInfo = () => {
  //   setPageInfo({ ...pageInfo, firstPage: (book as any).isFirstPage(), lastPage: (book as any).isLastPage() });
  // };
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

  /**
   * Compute book pages
   */
  const jointPages = useMemo(() => {
    let pageByOccupations: any = {};
    if (props.bookPages.length > 0) {
      pageByOccupations = groupby(props.bookPages, page => page.occupation_id);
      pageByOccupations = sortby(pageByOccupations, ([group]) => props.bookPages.indexOf(group));
    }
    const bookPages: any[] = [];
    Object.keys(pageByOccupations).forEach((occupation: any) => {
      bookPages[occupation] = groupby(pageByOccupations[occupation], page => page.page_number);
    });
    let result: any[] = [];
    bookPages.forEach((jobs: any, index: number) => {
      if (index === bookPages.length - 1 && jobs[1] && jobs[2]) {
        result = [...result, jobs[1], jobs[2]];
        return;
      }
      Object.keys(jobs).forEach(pageNumber => {
        result = [...result, jobs[pageNumber]];
      });
    });
    return result;
  }, [props.bookPages]);

  const getImage = (job: string, pageNumber: number) => {
    const { Gender, Age, Skin, Hair } = props.selected;
    const pagePath = props.isMobile ? 'pages-sm' : 'pages';
    let jobPath = `${job}/page-${pageNumber}`;
    if (job.includes('Cover')) {
      jobPath = job.includes('Front') ? 'cover/front/' : 'cover/back/';
      jobPath += props.cover || 'blue';
    }
    const imagePath = `/static/images/${pagePath}/${jobPath}/${Gender}/${Age}/${Hair}/${Skin}.jpg`;
    return imagePath.toLowerCase();
  };

  // const pageClass = index => {
  //   // if (index === 0) return 'first-page';
  //   // if (index === jointPages.length - 1) return 'last-page';
  //   return '';
  // };

  /**
   * Mobile only
   */
  const bookHeight = '(100vh - 69px - 257px) * 0.7';
  const bookRatio = '700 / 495';

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
      {props.isMobile ? (
        <Fragment>
          <div className="c-book-preview__pages" ref={pagesRef}>
            {jointPages.map((page: any[], index: number) => {
              const [firstPage] = page;
              return (
                <BookPage
                  key={index}
                  isLast={index === jointPages.length - 1}
                  style={{
                    height: `calc(80vw / (${bookRatio}))`,
                    minWidth: '80vw',
                    width: '80vw',
                  }}
                  image={getImage(firstPage.occupation.name, firstPage.page_number)}
                  name={props.selected.Name}
                  language={props.selected.Language}
                  // language="indo"
                  gender={props.selected.Gender}
                  dedication={props.selected.Dedication}
                  contents={page}
                  isMobile={props.isMobile}
                  isWhiteCover={props.cover === 'white' && firstPage.occupation.name.includes('Cover')}
                  mustLoad={true}
                  height={bookHeight}
                  // enableLazy={props.enableLazy}
                />
              );
            })}
          </div>
          <Pagination current={currentPage} pages={jointPages} />
        </Fragment>
      ) : (
        <Fragment>
          {!bookClicked && (
            <div className="c-book-preview__try">
              <img src="/static/images/try-me.png" alt="try me" />
            </div>
          )}
          <div className="c-book-preview__container" ref={pagesRef}>
            {showBook && (
              <div className="c-flipbook" id="FlipBook">
                {jointPages.map((page: any[], index: number) => {
                  const [firstPage] = page;
                  return (
                    <BookPage
                      key={index}
                      id={index + 1}
                      isLast={index === jointPages.length - 1}
                      className="c-flipbook__page"
                      // className={`c-flipbook__page ${pageClass(index)}`}
                      image={getImage(firstPage.occupation.name, firstPage.page_number)}
                      name={props.selected.Name}
                      language={props.selected.Language}
                      // language="indo"
                      gender={props.selected.Gender}
                      dedication={props.selected.Dedication}
                      contents={page}
                      isMobile={props.isMobile}
                      isWhiteCover={props.cover === 'white' && firstPage.occupation.name.includes('Cover')}
                      mustLoad={index + 1 < currentPage + 7 || index === jointPages.length - 1}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </Fragment>
      )}
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
          @apply flex items-center bg-light-grey h-full relative flex-col justify-center;
          @screen md {
            @apply mt-4 bg-white;
            flex-direction: unset;
            justify-content: unset;
            padding: 0;
            overflow: unset;
            height: unset;
          }
          &__try {
            @apply absolute;
            right: 10%;
          }
          &__pages {
            @apply flex overflow-x-auto w-full;
            padding: 15px 36px 0;
          }
          &__left {
            @apply w-2/12 flex justify-end;
            padding-right: 30px;
            z-index: 2;
          }
          &__container {
            @apply flex flex-row;
            @screen md {
              @apply w-full relative;
              height: ${height}px;
              transition: height 0.5s;
              z-index: 1;
              display: unset;
              flex-direction: unset;
            }
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
        .c-flipbook {
          -webkit-perspective: 2200px;
          perspective: 2200px;
          -webkit-transform-style: preserve-3d;
          transform-style: preserve-3d;
          position: absolute;
          left: 0;
          -webkit-transition: left 0.7s;
          -o-transition: left 0.7s;
          transition: left 0.7s;
          top: 0;

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

          &[data-useragent*='MSIE 10.0'] .c-flipbook__page {
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

          &.at-front-cover {
            left: -25%;
          }

          &.at-rear-cover {
            left: 25%;
          }
        }

        .is-calling {
          -webkit-transform: rotateY(-15deg) !important;
          transform: rotateY(-15deg) !important;
        }

        .c-flipbook__page {
          cursor: pointer;
          overflow: hidden;
          position: absolute;
          width: 50%;
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

              ~ .c-flipbook__page {
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

              ~ .c-flipbook__page.is-animating {
                z-index: 3;
              }
            }

            + .c-flipbook__page:not(.is-animating):nth-child(odd) {
              z-index: 1;
            }
          }
        }

        .no-csstransforms3d .c-flipbook__page {
          display: none;

          &.is-active {
            display: block;
            position: relative;
            float: left;
          }
        }

        @supports (transition: transform 0.9s ease) and (not (-ms-ime-align: auto)) {
          .c-flipbook__page {
            -webkit-transition: -webkit-transform 0.9s ease;
            transition: -webkit-transform 0.9s ease;
            -o-transition: transform 0.9s ease;
            transition: transform 0.9s ease;
            transition: transform 0.9s ease, -webkit-transform 0.9s ease;
          }
        }

        .c-flipbook__page {
          &:before {
            content: '';
            position: absolute;
            z-index: 3;
            right: 0;
            width: 100%;
            height: 100%;
            background-size: 100% 100%;
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

        /* .c-flipbook-image {
          position: relative;
          z-index: 2;
          height: auto;
          width: 100%;
          display: block;
          pointer-events: none;
        } */

        .c-flipbook__page .ss-loading {
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
