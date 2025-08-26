import { useTranslation } from 'next-i18next';
import { useState, useEffect } from 'react';

import Card from 'components/atoms/Card';
import Testimonial from 'components/molecules/Testimonial';
import * as gtag from 'lib/gtag';

const TestimonialSlider = (props: any) => {
  const { t } = useTranslation('page-index');
  const [navRightClass, setNavRightClass] = useState(0);
  const [translationX, setTranslationX] = useState(0);
  const [isNavigating, setIsNavigating] = useState(false);

  const calculateRightBound = () => {
    const lastChild = (window as any).document.querySelector('.c-testi-slider__slide:last-child');
    return lastChild && lastChild.getBoundingClientRect().right;
  };

  const decideNavRightClass = (): any => {
    return calculateRightBound() < window.innerWidth ? 'c-testi-slider__nav--inactive' : '';
  };

  useEffect(() => {
    const setNavTimeout = setTimeout(() => {
      setNavRightClass(decideNavRightClass());
      setIsNavigating(false);
    }, 500);
    return () => {
      clearTimeout(setNavTimeout);
    };
  }, [translationX]);

  const onNavRight = () => {
    // eslint-disable-next-line no-extra-boolean-cast
    if (isNavigating || !!navRightClass) return;
    setIsNavigating(true);
    gtag.event({
      action: 'testimonials',
      category: 'engagement',
      label: 'desktop',
    });
    setTranslationX(translationX - 418);
  };
  const onNavLeft = () => {
    if (!translationX) return;
    setTranslationX(translationX + 418);
  };

  return (
    <div>
      <div className="c-testi-slider">
        <div className={`c-testi-slider__header ${props.isMobile ? '' : 'u-container'}`}>
          <div className="c-testi-slider__title">
            <h2>{t('testi-header')}</h2>
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
          {props.testimonials.map((testi) => (
            <Card key={testi.id} className="c-testi-slider__slide">
              <Testimonial testi={testi} />
            </Card>
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
            @apply mx-auto w-3/4 text-center;
            @screen md {
              @apply mx-0 text-left;
              width: 550px;
            }
          }
          &__nav {
            @apply flex;
            &--left,
            &--right {
              @apply flex cursor-pointer items-center justify-center bg-white text-lg;
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
            @apply mr-0 flex overflow-x-auto;
            flex: 1;
            @screen md {
              @apply inline-flex;
              overflow-x: unset;
              transform: translateX(${translationX}px);
              transition: transform 0.5s ease-in;
              margin-left: 4%;
            }
            @screen lg {
              margin-left: 12.5%;
            }
          }
        }
      `}</style>
      <style jsx global>{`
        .c-testi-slider__slide {
          @apply flex;
          margin-right: 16px;
          min-width: 297px;
          width: 297px;
          padding: 20px;
          &:first-child {
            margin-left: 16px;
          }
          @screen md {
            @apply mr-12;
            min-width: 370px;
            width: 390px;
            padding: 40px;
            &:first-child {
              @apply ml-0;
            }
            &:last-child {
              @apply mr-0;
            }
          }
        }
      `}</style>
    </div>
  );
};

export default TestimonialSlider;
