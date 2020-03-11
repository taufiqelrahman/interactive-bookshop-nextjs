const BookPage = (props: any) => {
  const styleGenerator = (string: any) => {
    let style = {
      width: '40%',
      fontSize: '0.6vw',
      lineHeight: '0.9vw',
    };
    if (string) style = { ...style, ...JSON.parse(string) };
    return style;
  };
  return (
    <div className={`c-book-page ${props.className || ''}`} style={props.style}>
      <svg className="c-book-page__svg">
        <foreignObject x="0" y="0" width="100%" height="100%">
          <img className="c-book-page__image" src={props.image} />
          {props.contents.map((content, key) => {
            const value = props.languange === 'english' ? content.english : content.indonesia;
            return (
              <div
                key={key}
                className="c-book-page__content"
                style={styleGenerator(content.style)}
                dangerouslySetInnerHTML={{ __html: value.split('[name]').join(props.name) }}
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
        }
      `}</style>
    </div>
  );
};

export default BookPage;
