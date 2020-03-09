import Card from 'components/atoms/Card';

const Testimonial = (props: any) => {
  const data = props.testi;
  return (
    <div>
      <div className="c-testimonial">
        <Card>
          <div className="c-testimonial__container">
            <div className="c-testimonial__content">{data.message}</div>
            <div className="flex items-center">
              <img alt="photo" className="c-testimonial__photo" width="44" height="44" src={data.image_url} />
              <div>
                <div className="c-testimonial__name">{data.name}</div>
                <div className="c-testimonial__instance">{data.company}</div>
              </div>
            </div>
          </div>
        </Card>
      </div>
      <style jsx>{`
        .c-testimonial {
          width: 297px;
          height: 216px;
          @screen md {
            width: 370px;
            height: 346px;
          }
          &__container {
            padding: 20px;
            @screen md {
              padding: 40px;
            }
          }
          &__content {
            @apply italic text-sm flex items-center w-full text-dark-grey font-opensans;
            line-height: 19px;
            height: 120px;
            opacity: 0.8;
            margin-bottom: 12px;
            @screen md {
              @apply text-lg mb-8;
              height: 174px;
              line-height: 25px;
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
    </div>
  );
};

export default Testimonial;
