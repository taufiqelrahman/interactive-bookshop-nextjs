const BookPage = (props: any) => {
  const styleGenerator = (string: any): any => {
    let style = {
      width: '35%',
      fontSize: props.isMobile ? '1.5vh' : '1vh',
      lineHeight: props.isMobile ? '3.3vw' : '0.9vw',
      fontFamily: 'Kameron',
      textAlign: 'center',
    };
    if (string) style = { ...style, ...JSON.parse(string) };
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
          font-size: ${props.isMobile ? '2vh' : '1.5vh'};
        }
      `}</style>
    </div>
  );
};

export default BookPage;
