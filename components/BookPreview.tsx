import detectIt from 'detect-it';
import debounce from 'lodash.debounce';
import groupby from 'lodash.groupby';
import sortby from 'lodash.sortby';
import dynamic from 'next/dynamic';
import { useEffect, useState, useCallback, useRef, Fragment } from 'react';
import { twMerge } from 'tailwind-merge';

import initBook from 'assets/flipbook.js';
import BookPage from 'components/atoms/BookPage';
import { i18n } from 'i18n';
import * as gtag from 'lib/gtag';

// import dummyPages from '_mocks/bookPages';
// import CircleType from 'circletype';
import styles from './BookPreview.module.scss';

const Pagination = dynamic(() => import('components/atoms/Pagination'));

const BookPreview = (props: any) => {
  const [, setBook] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [bookClicked, setBookClicked] = useState(false);
  const [state, setState] = useState({
    height: 0,
    loaded: false,
  });
  // const [pageInfo, setPageInfo] = useState({
  //   firstPage: true,
  //   lastPage: false,
  // });

  const calcHeight = () => {
    // const image: any = document.querySelector('.c-flipbook__page img');
    const containerWidth = window.innerWidth > 1023 ? window.innerWidth * 0.75 : (window.innerWidth * 11) / 12;
    // const containerMargin = (window.innerWidth - containerWidth) / 2;
    const padding = 60;
    const bookRatio = 495 / 700;
    return ((containerWidth - padding) / 2) * bookRatio;
  };
  const updateHeight = () => {
    const height = calcHeight();
    setState({ ...state, height, loaded: true });
    return Promise.resolve();
  };

  // const updatePageInfo = () => {
  //   setPageInfo({ ...pageInfo, firstPage: (book as any).isFirstPage(), lastPage: (book as any).isLastPage() });
  // };

  const setupBook = async () => {
    setState({ ...state, loaded: false });
    await updateHeight();
    const flipBookInstance = new (window as any).FlipBook('FlipBook', {
      canClose: true,
      arrowKeys: true,
      concurrentAnimations: 5,
      height: `${calcHeight()}px`,
      initialCall: true,
      onPageTurn: (_, els) => {
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
    setBook(flipBookInstance);
  };

  let debouncedFunctionRef: any = useRef(() => setupBook());
  const debouncedSetup = useCallback(
    debounce(() => debouncedFunctionRef && (debouncedFunctionRef.current as any)(), 300),
    [],
  );

  const ref = useRef<HTMLInputElement>(null);
  const handleScroll = () => {
    const svgPages = document.getElementsByClassName('c-book-page__svg');
    if (!svgPages.length) return;
    const imageWidth = document.getElementsByClassName('c-book-page__svg')[0].getBoundingClientRect().width;
    const currentScroll = Math.floor((ref as any).current.scrollLeft / imageWidth) + 1;
    setCurrentPage(currentScroll);
  };
  useEffect(() => {
    if (props.isMobile) {
      if (ref && ref.current) {
        ref.current.addEventListener('scroll', handleScroll, detectIt.passiveEvents ? { passive: true } : false);
      }
      return;
    }
    initBook();
    setupBook();
    window.addEventListener('resize', debouncedSetup, detectIt.passiveEvents ? { passive: true } : false);
    return () => {
      window.removeEventListener('resize', () => debouncedSetup);
      debouncedFunctionRef = null;
    };
  }, []);

  const isFirstRun = useRef(true);
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    setTimeout(() => {
      setupBook();
    }, 500);
  }, [i18n.language]);

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

  let pageByOccupations = {};
  if (props.bookPages.length > 0) {
    pageByOccupations = groupby(props.bookPages, (page) => page.occupation_id);
    pageByOccupations = sortby(pageByOccupations, (group) => props.bookPages.indexOf(group[0]));
  }
  // console.log(pageByOccupations);
  const bookPages = [];
  Object.keys(pageByOccupations).forEach((occupation) => {
    bookPages[occupation] = groupby(pageByOccupations[occupation], (page) => page.page_number);
  });
  let jointPages: any = [];
  bookPages.forEach((jobs: Array<any>, index) => {
    if (index === bookPages.length - 1 && jobs[1] && jobs[2]) {
      jointPages = [...jointPages, jobs[1], jobs[2]];
      return;
    }
    Object.keys(jobs).forEach((pageNumber) => {
      jointPages = [...jointPages, jobs[pageNumber]];
    });
  });

  const getImage = (job, pageNumber) => {
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

  // for mobile
  const bookHeight = '(100vh - 69px - 257px) * 0.7';
  const bookRatio = '700 / 495';

  return (
    <div className={styles['c-book-preview']}>
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
          <div className="c-book-preview__pages" ref={ref}>
            {jointPages.map((page, index) => {
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
          <div
            className="c-book-preview__container md:h-[var(--dynamic-height)]"
            style={{ '--dynamic-height': `${state.height}px` } as React.CSSProperties}
          >
            <div className={twMerge(styles['c-flipbook'], state.loaded ? 'opacity-100' : 'opacity-0')} id="FlipBook">
              {jointPages.map((page, index) => {
                const [firstPage] = page;
                return (
                  <BookPage
                    key={index}
                    id={index + 1}
                    isLast={index === jointPages.length - 1}
                    className={styles['c-flipbook__page']}
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
