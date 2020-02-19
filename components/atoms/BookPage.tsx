const BookPage = (props: any) => {
  return (
    <div className={props.className}>
      <svg className="c-book-page">
        <foreignObject x="0" y="0" width="100%" height="100%">
          <img className="c-book-page__image" src={props.image} />
          <div
            className="c-book-page__content"
            style={{
              color: 'white',
              width: '40%',
              bottom: '5%',
              fontSize: '1vh',
              left: '15%',
              lineHeight: '1.5vh',
            }}
            dangerouslySetInnerHTML={{ __html: props.content.split('[name]').join('Roya') }}
          />
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
