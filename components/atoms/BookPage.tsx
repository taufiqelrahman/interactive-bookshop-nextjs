import LazyLoad from 'react-lazyload';
// import { useEffect } from 'react';

const BookPage = (props: any) => {
  const styleGenerator = (string: any): any => {
    let style: any = {
      width: '37%',
      fontSize: props.isMobile ? '1.7vw' : '0.7vw',
      lineHeight: props.isMobile ? '2.2vw' : '0.9vw',
      fontFamily: 'Kameron',
      textAlign: 'center',
    };
    if (string) style = { ...style, ...JSON.parse(string) };
    if (props.isWhiteCover) style = { ...style, color: 'black' };
    if (props.contents[0].occupation.name === 'Front Cover') {
      style = {
        ...style,
        fontSize: props.isMobile ? '9vw' : '3.5vw',
        lineHeight: props.isMobile ? '7.5vw' : '3vw',
      };
    }
    return style;
  };
  const processContent = (content, language) => {
    const isEnglish = language === 'english';
    let processed = isEnglish ? content.english : content.indonesia;
    if (props.contents[0].occupation.name === 'Front Cover') {
      processed = processed.split('[name]').join((props.name || '').toUpperCase());
    } else {
      processed = processed.split('[name]').join(props.name);
    }
    if (isEnglish) {
      const isBoy = props.gender === 'boy';
      processed = processed.split('[child]').join(isBoy ? 'boy' : 'girl');
      processed = processed.split('[child:1]').join(isBoy ? 'he' : 'she');
      processed = processed.split('[child:2]').join(isBoy ? 'his' : 'her');
      processed = processed.split('[child:3]').join(isBoy ? 'him' : 'her');
    }
    if (props.contents[0].occupation.name === 'Back Cover') {
      processed = props.dedication;
    }
    return processed;
  };
  // useEffect(() => {
  //   if (!props.enableLazy) forceVisible();
  // }, [props.enableLazy]);
  return (
    <div id={props.id} className={`c-book-page ${props.className || ''}`} style={props.style}>
      <LazyLoad overflow>
        <svg className="c-book-page__svg">
          <foreignObject x="0" y="0" width="100%" height="100%">
            <img
              className="c-book-page__image"
              src={props.mustLoad ? props.image : ''}
              alt="book page"
              style={props.isMobile ? { height: `calc((${props.height}))` } : {}}
            />
            {props.contents.map((content, key) => {
              const value = processContent(content, props.language);
              return (
                <div
                  key={key}
                  className="c-book-page__content"
                  style={styleGenerator(content.style)}
                  dangerouslySetInnerHTML={{ __html: value }}
                />
              );
            })}
          </foreignObject>
        </svg>
      </LazyLoad>
      <style jsx>{`
        .c-book-page {
          @apply relative overflow-hidden;
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
            @apply w-full h-full object-fill;
            background: url('/static/images/loading.gif') 50% no-repeat;
          }
          &__content {
            @apply absolute;
          }
        }
      `}</style>
      <style jsx global>{`
        strong {
          @apply font-bold;
          font-size: ${props.isMobile ? '2.5vw' : '1vw'};
        }
      `}</style>
    </div>
  );
};

export default BookPage;
