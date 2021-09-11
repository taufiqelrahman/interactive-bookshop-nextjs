import DOMPurify from 'dompurify';

const Testimonial = (props: any) => {
  const data = props.testi;
  return (
    <div className="c-testimonial" data-testid="testimonial">
      {/* <div className="c-testimonial__container"> */}
      <div className="c-testimonial__content" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.message) }} />
      <div className="flex items-center">
        <img
          data-testid="testimonial-photo"
          alt="photo"
          className="c-testimonial__photo"
          width="60"
          height="60"
          src={data.image_url}
        />
        <div>
          <div className="c-testimonial__name">{data.name}</div>
          <div
            className="c-testimonial__instance"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.company) }}
          />
        </div>
      </div>
      {/* </div> */}
      <style jsx>{`
        .c-testimonial {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          &__content {
            @apply italic text-sm w-full text-dark-grey font-opensans;
            line-height: 22px;
            opacity: 0.8;
            margin-top: 16px;
            margin-bottom: 34px;
            @screen md {
              @apply text-lg;
              margin-bottom: 48px;
              line-height: 28px;
            }
          }
          &__photo {
            @apply mr-3 text-xs;
            width: 44px;
            height: 44px;
            @screen md {
              width: 60px;
              height: 60px;
            }
            border-radius: 50%;
            background: #efeef4;
          }
          &__name {
            @apply text-xs font-semibold;
            line-height: 21px;
          }
          &__instance {
            @apply text-xs;
            line-height: 21px;
            color: #898699;
          }
        }
      `}</style>
      <style jsx global>{`
        strong,
        a {
          @apply font-semibold;
        }
      `}</style>
    </div>
  );
};

export default Testimonial;
