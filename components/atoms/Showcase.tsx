import { useState } from 'react';
import LazyLoad from 'react-lazyload';
import { Swipeable } from 'react-swipeable';

const Showcase = (props: any) => {
  const [isActive, setIsActive] = useState(0);
  const images = ['first-attempt.jpg', 'bian-deva.jpeg', 'bian-shadow.jpeg', 'hook.jpeg'];
  const onClickLeft = () => {
    if (isActive === 0) return;
    setIsActive(isActive - 1);
  };
  const onClickRight = () => {
    if (isActive === images.length - 1) return;
    setIsActive(isActive + 1);
  };
  return (
    <div className="c-showcase">
      <Swipeable onSwipedLeft={onClickLeft} onSwipedRight={onClickRight}>
        <div className="c-showcase__container">
          {images.map((img, index) => (
            <LazyLoad key={index}>
              {index === isActive && (
                <img
                  src={`/static/images/showcase${props.isMobile ? '-sm' : ''}/${img}`}
                  alt={`showcase-${index + 1}`}
                />
              )}
            </LazyLoad>
          ))}
        </div>
      </Swipeable>
      {props.isMobile ? (
        <div className="c-showcase__controls">
          {images.map((_, index) => (
            <span
              key={index}
              className={`c-showcase__dot ${index === isActive ? 'c-showcase__dot--active' : ''}`}
              onClick={() => setIsActive(index)}
            ></span>
          ))}
        </div>
      ) : (
        <div className="c-showcase__controls">
          <div
            className={`c-showcase__controls--left ${isActive === 0 ? 'c-showcase__controls--inactive' : ''}`}
            onClick={onClickLeft}
          >
            <span className="icon-chevron_left" />
          </div>
          {images.map((img, index) => (
            <div key={index} className={`c-showcase__thumb ${index === isActive ? 'c-showcase__thumb--active' : ''}`}>
              <LazyLoad>
                <img
                  src={`/static/images/showcase-xs/${img}`}
                  alt={`thumb-${index + 1}`}
                  onClick={() => setIsActive(index)}
                />
              </LazyLoad>
            </div>
          ))}
          <div
            className={`c-showcase__controls--right ${
              isActive === images.length - 1 ? 'c-showcase__controls--inactive' : ''
            }`}
            onClick={onClickRight}
          >
            <span className="icon-chevron_right" />
          </div>
        </div>
      )}
      <style jsx>{`
        .c-showcase {
          @apply w-full;
          &__container {
            @apply bg-white p-10;
            border-radius: 36px;
            height: 80vw;
            @screen md {
              height: 28vw;
            }
            img {
              @apply h-full w-full object-contain;
            }
          }
          &__controls {
            @apply flex cursor-pointer justify-center items-center mb-6;
            margin-top: 8px;
            @screen md {
              @apply mb-0;
              margin-top: 27px;
            }
            &--left,
            &--right {
              @apply text-lg flex justify-center items-center cursor-pointer text-white;
              width: 44px;
              min-width: 44px;
              height: 44px;
              border-radius: 50%;
              border: 2px solid #ffffff;
            }
            &--left {
              @apply mr-4;
            }
            &--right {
              @apply ml-4;
            }
            &--inactive {
              @apply cursor-auto;
              opacity: 0.2;
            }
          }
          &__thumb {
            @apply mr-2 bg-white flex items-center justify-center p-3;
            width: 72px;
            height: 54px;
            border-radius: 4px;
            &:last-child {
              @apply mr-0;
            }
            &--active {
              border: 3px solid #243f8e;
            }
          }
          &__dot {
            @apply mr-2;
            width: 8px;
            height: 8px;
            background: #ced2d9;
            border-radius: 50%;
            &:last-child {
              @apply mr-0;
            }
            &--active {
              width: 12px;
              height: 12px;
              background: #4589dc;
              border: 2px solid #ffffff;
              box-shadow: 0px 2px 4px rgba(66, 69, 77, 0.1);
            }
          }
        }
      `}</style>
    </div>
  );
};

export default Showcase;
