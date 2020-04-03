import { useState, useEffect } from 'react';
import { withTranslation } from 'i18n';
import Testimonial from 'components/molecules/Testimonial';

const TestimonialSlider = (props: any) => {
  const [navRightClass, setNavRightClass] = useState(0);
  const [translationX, setTranslationX] = useState(0);

  const calculateRightBound = () => {
    const lastChild = (window as any).document.querySelector('.c-testi-slider__slide:last-child');
    return lastChild && lastChild.getBoundingClientRect().right;
  };

  const decideNavRightClass = (): any => {
    return calculateRightBound() < window.innerWidth ? 'c-testi-slider__nav--inactive' : '';
  };

  useEffect(() => {
    const setNavTimeout = setTimeout(() => setNavRightClass(decideNavRightClass()), 500);
    return () => {
      clearTimeout(setNavTimeout);
    };
  }, [translationX]);

  const onNavRight = () => {
    if (!!navRightClass) return;
    setTranslationX(translationX - 418);
  };
  const onNavLeft = () => {
    if (!translationX) return;
    setTranslationX(translationX + 418);
  };

  return (
    <div className="w-full">
      <div className="c-testi-slider">
        <div className="c-testi-slider__header">
          <div className="c-testi-slider__title">
            <h2>{props.t('testi-header')}</h2>
          </div>
          {!props.isMobile && (
            <div className="c-testi-slider__nav">
              <div
                className={`c-testi-slider__nav--left ${translationX === 0 ? 'c-testi-slider__nav--inactive' : ''}`}
                onClick={onNavLeft}
              >
                <span className="icon-chevron_left" />
              </div>
              <div className={`c-testi-slider__nav--right ${navRightClass}`} onClick={onNavRight}>
                <span className="icon-chevron_right" />
              </div>
            </div>
          )}
        </div>
        <div className="c-testi-slider__slides">
          {props.testimonials.map(testi => (
            <div key={testi.id} className="c-testi-slider__slide">
              <Testimonial testi={testi} />
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        .c-testi-slider {
          &__header {
            @apply flex justify-between;
            margin-bottom: 24px;
            @screen md {
              margin-bottom: 60px;
            }
            h2 {
              @apply font-semibold text-white;
              font-size: 20px;
              line-height: 30px;
              @screen md {
                font-size: 48px;
                line-height: 55px;
              }
            }
          }
          &__title {
            @apply w-2/3 text-center mx-auto;
            @screen md {
              @apply mx-0 text-left;
              width: 550px;
            }
          }
          &__nav {
            @apply flex;
            &--left,
            &--right {
              @apply bg-white text-lg flex justify-center items-center cursor-pointer;
              width: 44px;
              height: 44px;
              border-radius: 50%;
            }
            &--left {
              @apply mr-4;
            }
            &--inactive {
              @apply cursor-auto;
              opacity: 0.2;
            }
          }
          &__slides {
            @apply flex overflow-x-scroll overflow-visible;
            @screen md {
              @apply inline-flex;
              transform: translateX(${translationX}px);
              transition: transform 0.5s ease-in;
            }
          }
          &__slide {
            margin-right: 16px;
            @screen md {
              @apply mr-12;
            }
          }
        }
      `}</style>
    </div>
  );
};

export default withTranslation('page-index')(TestimonialSlider);
