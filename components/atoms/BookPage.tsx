const BookPage = (props: any) => {
  const styleGenerator = string => {
    let style = {
      width: '40%',
      fontSize: '0.6vw',
      lineHeight: '0.9vw',
    };
    if (string) style = { ...style, ...JSON.parse(string) };
    return style;
  };
  return (
    <div className={props.className}>
      <svg className="c-book-page">
        <foreignObject x="0" y="0" width="100%" height="100%">
          <img className="c-book-page__image" src={props.image} />
          {props.contents.map((content, key) => (
            <div
              key={key}
              className="c-book-page__content"
              style={styleGenerator(content.style)}
              dangerouslySetInnerHTML={{ __html: content.value.split('[name]').join(props.name) }}
            />
          ))}
        </foreignObject>
      </svg>
      <style jsx>{`
        .c-book-page {
          @apply w-full h-full;
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
