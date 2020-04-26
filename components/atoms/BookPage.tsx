const BookPage = (props: any) => {
  const styleGenerator = (string: any): any => {
    let style: any = {
      width: '37%',
      fontSize: props.isMobile ? '2.3vw' : '0.7vw',
      lineHeight: props.isMobile ? '3.2vw' : '0.9vw',
      fontFamily: 'Kameron',
      textAlign: 'center',
    };
    if (string) style = { ...style, ...JSON.parse(string) };
    if (props.isWhiteCover) style = { ...style, color: 'black' };
    if (props.contents[0].occupation.name === 'Front Cover') {
      style = {
        ...style,
        fontSize: props.isMobile ? '9vw' : '3.5vw',
        lineHeight: props.isMobile ? '9vw' : '3vw',
      };
    }
    return style;
  };
  const processContent = (content, language) => {
    const isEnglish = language === 'english';
    let processed = isEnglish ? content.english : content.indonesia;
    processed = processed.split('[name]').join(props.name);
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
  return (
    <div className={`c-book-page ${props.className || ''}`} style={props.style}>
      <svg className="c-book-page__svg">
        <foreignObject x="0" y="0" width="100%" height="100%">
          <img className="c-book-page__image" src={props.image} />
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
      <style jsx>{`
        .c-book-page {
          &:first-child svg {
            border-radius: 6px 0 0 6px;
          }
          &:last-child svg {
            border-radius: 0 6px 6px 0;
          }
          &__svg {
            @apply w-full h-full;
            @screen md {
              border-radius: 0;
            }
          }
          &__image {
            @apply w-full;
          }
          &__content {
            position: absolute;
          }
        }
      `}</style>
      <style jsx global>{`
        strong {
          @apply font-bold;
          font-size: ${props.isMobile ? '3.9vw' : '1vw'};
        }
      `}</style>
    </div>
  );
};

export default BookPage;
