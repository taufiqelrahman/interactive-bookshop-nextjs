import Link from 'next/link';

const Features = (props) => {
  return (
    <div>
      <div className="c-features">
        <div className="u-container">
          { props.features.map((item, i) => {
            return (
              <Link key={i} href={'/books/' + item.slug}>
                <a
                  className="c-features__item"
                  style={{
                    background: `url(\'${item.imageUrl}\')`,
                  }}>
                  { item.title }
                </a>
              </Link>
            )
          })}
        </div>
      </div>
      <style jsx>{`
        .c-features {
          @apply py-6;

          &__item {
            @apply mr-3 bg-cover bg-center text-white text-center p-5 text-xl !important;
            height: 370px;
            &:last-child {
              @apply mr-0;
            }
          }
        }
      `}</style>
    </div>
  )
};

export default Features;