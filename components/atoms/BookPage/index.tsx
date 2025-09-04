import DOMPurify from 'dompurify';
import { useTranslation } from 'next-i18next';
import React, { useCallback, useEffect } from 'react';
import LazyLoad, { forceVisible } from 'react-lazyload';

import type { BookPage as BookPageType } from 'store/master/types';

import { getBookPageStyle, processBookPageContent } from './helpers';

// import 'styles/fonts.min.css'; // @todo change to module

interface BookPageProps {
  isMobile?: boolean;
  isWhiteCover?: boolean;
  name?: string;
  gender?: string;
  dedication?: string;
  contents: BookPageType[];
  image?: string;
  style?: React.CSSProperties;
  className?: string;
  mustLoad?: boolean;
  height?: string | number;
  language?: string;
  id?: string;
  [key: string]: unknown;
}

const BookPage = (props: BookPageProps) => {
  const { t } = useTranslation('common');

  const generateStyle = useCallback(
    (styleString: string | undefined) =>
      getBookPageStyle({
        styleString,
        isMobile: props.isMobile,
        isWhiteCover: props.isWhiteCover,
        name: props.name,
        contents: props.contents,
      }),
    [props.isMobile, props.isWhiteCover, props.name, props.contents],
  );

  const processContent = useCallback(
    (content, language) =>
      processBookPageContent({
        currentContent: content,
        language,
        contents: props.contents,
        name: props.name,
        gender: props.gender,
        dedication: props.dedication,
      }),
    [props.contents, props.name, props.gender, props.dedication],
  );

  // useEffect(() => {
  //   if (!props.enableLazy) forceVisible();
  // }, [props.enableLazy]);

  useEffect(() => {
    if (!props.isMobile) forceVisible();
  }, [props.isMobile]);

  return (
    <div id={props.id} className={`c-book-page ${props.className || ''}`} style={props.style}>
      <LazyLoad overflow>
        <svg className="c-book-page__svg" xmlns="http://www.w3.org/2000/svg">
          <foreignObject x="0" y="0" width="100%" height="100%" style={{ overflow: 'visible' }}>
            <img className="c-book-page__image" src={props.mustLoad ? props.image : ''} alt="book page" />
            {props.isLast ? (
              <div className="c-book-page__limit">{t('book-limit')}</div>
            ) : (
              props.contents.map((content, key) => {
                const value = processContent(content, props.language);
                return (
                  <div
                    key={key}
                    className="c-book-page__content"
                    style={generateStyle(content.style)}
                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(value) }}
                  />
                );
              })
            )}
          </foreignObject>
        </svg>
      </LazyLoad>
      <style jsx>{`
        .c-book-page {
          @apply relative overflow-visible;
          margin-right: 10px;
          @screen md {
            position: inherit;
            margin-right: 0;
          }
          &:first-child svg {
            border-radius: 6px 0 0 6px;
          }
          &:last-child svg {
            border-radius: 0 6px 6px 0;
          }
          &__svg {
            @apply h-full w-full;
            margin-right: 10px;
            @screen md {
              border-radius: 0;
              margin-right: 0;
            }
          }
          &__image {
            @apply object-contain;
            background: url('/static/images/loading.gif') 50% no-repeat;
          }
          &__content {
            @apply absolute;
          }
          &__limit {
            @apply absolute top-0 flex h-full w-full items-center justify-center p-8 text-center text-xl font-semibold;
            background: rgba(255, 255, 255, 0.8);
            line-height: 28px;
            font-family: Jost;
          }
        }
      `}</style>
      <style jsx global>{`
        strong {
          @apply font-bold;
          font-size: ${props.isMobile ? '2.5vw' : '1vw'};
        }
        .c-book-page__sub {
          @apply mt-2;
          font-size: ${props.isMobile ? '9.5vw' : '4vw'};
        }
      `}</style>
    </div>
  );
};

export default BookPage;
