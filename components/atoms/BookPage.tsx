import { withTranslation } from 'i18n';
import LazyLoad, { forceVisible } from 'react-lazyload';
import { useEffect } from 'react';
import DOMPurify from 'dompurify';
import 'styles/fonts.min.css';

const BookPage = (props: any) => {
  const styleGenerator = (string: any): any => {
    let style: any = {
      width: '37%',
      fontSize: props.isMobile ? '2vw' : '0.8vw',
      lineHeight: props.isMobile ? '2.5vw' : '1vw',
      fontFamily: 'Jost',
      textAlign: 'center',
      fontWeight: 300,
    };
    if (string) style = { ...style, ...JSON.parse(string) };
    if (props.isMobile && style.fontSizeMobile) style = { ...style, fontSize: style.fontSizeMobile };
    if (props.isMobile && style.lineHeightMobile) style = { ...style, lineHeight: style.lineHeightMobile };
    if (props.isMobile && style.widthMobile) style = { ...style, width: style.widthMobile };
    if (props.isWhiteCover) style = { ...style, color: 'black' };
    const [firstContent] = props.contents;
    if (firstContent.occupation.name === 'Front Cover') {
      style = {
        ...style,
        fontSize: props.isMobile ? '9vw' : '3.5vw',
        lineHeight: props.isMobile ? '7.5vw' : '3vw',
      };
      if (props.name && props.name.length > 4) {
        style = {
          ...style,
          width: '90%',
          left: '15%',
          marginLeft: '-10%',
          marginRight: '-10%',
        };
      }
    }
    return style;
  };
  const processContent = (content, language) => {
    const isEnglish = language === 'english';
    let processed = isEnglish ? content.english : content.indonesia;
    const {
      contents: [firstContent],
      name,
      gender,
      dedication,
    } = props;
    if (!name) return processed;
    if (firstContent.occupation.name === 'Front Cover') {
      processed = processed.split('[name]').join((name || '').toUpperCase());
    } else {
      processed = processed.split('[name]').join(name.replace(/^./, name[0].toUpperCase()));
    }
    if (isEnglish) {
      const isBoy = gender === 'boy';
      processed = processed.split('[child]').join(isBoy ? 'boy' : 'girl');
      processed = processed.split('[child:1]').join(isBoy ? 'he' : 'she');
      processed = processed.split('[child:2]').join(isBoy ? 'his' : 'her');
      processed = processed.split('[child:3]').join(isBoy ? 'him' : 'her');
    }
    if (firstContent.occupation.name === 'Back Cover') {
      processed = dedication;
    }
    return processed;
  };
  // useEffect(() => {
  //   if (!props.enableLazy) forceVisible();
  // }, [props.enableLazy]);
  useEffect(() => {
    if (!props.isMobile) forceVisible();
  }, []);
  return (
    <div id={props.id} className={`c-book-page ${props.className || ''}`} style={props.style}>
      <LazyLoad overflow>
        <svg data-testid="bookPage-svg" className="c-book-page__svg" xmlns="http://www.w3.org/2000/svg">
          <foreignObject x="0" y="0" width="100%" height="100%" style={{ overflow: 'visible' }}>
            <img className="c-book-page__image" src={props.mustLoad ? props.image : ''} alt="book page" />
            {props.isLast ? (
              <div className="c-book-page__limit">{props.t('book-limit')}</div>
            ) : (
              props.contents.map((content, key) => {
                const value = processContent(content, props.language);
                return (
                  <div
                    key={key}
                    data-testid="bookPage-content"
                    className="c-book-page__content"
                    style={styleGenerator(content.style)}
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
            @apply absolute h-full w-full flex items-center justify-center top-0 p-8 text-center font-semibold text-xl;
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

export default withTranslation('common')(BookPage);
