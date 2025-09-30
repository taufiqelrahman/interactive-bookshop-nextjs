import Link from 'next/link';

interface Feature {
  slug: string;
  name: string;
  images: { filepath: string }[];
}

interface FeaturesProps {
  features: Feature[];
}

const Features: React.FC<FeaturesProps> = (props) => {
  return (
    <div>
      <div className="c-features">
        <div className="u-container">
          {props.features.map((item, i) => {
            return (
              <Link key={i} href={'/books/' + item.slug}>
                <a
                  className="c-features__item"
                  style={{
                    background: `url(\'${item.images[0].filepath}\')`,
                  }}
                >
                  {item.name}
                </a>
              </Link>
            );
          })}
        </div>
      </div>
      <style jsx>{`
        .c-features {
          @apply py-6;

          &__item {
            @apply mr-3 w-1/3 bg-cover bg-center p-5 text-center text-xl text-white !important;
            height: 370px;
            &:last-child {
              @apply mr-0;
            }
          }
        }
      `}</style>
    </div>
  );
};

export default Features;
