import { useTranslation } from 'next-i18next';
import { useState, useEffect, useCallback } from 'react';

import Card from 'components/atoms/Card';
import TestimonialComponent from 'components/molecules/Testimonial';
import * as gtag from 'lib/gtag';
import { Testimonial } from 'store/master/types';

// Configuration constants for slider behavior
const SLIDE_WIDTH = 418; // Width of each slide including margin for desktop navigation
const NAVIGATION_DELAY = 500; // Delay in ms before enabling navigation after slide transition

/**
 * Props interface for the TestimonialSlider component
 */
interface TestimonialSliderProps {
  /** Array of testimonial data to display in the slider */
  testimonials: Testimonial[];
  /** Whether the component is being rendered on a mobile device */
  isMobile?: boolean;
}

/**
 * TestimonialSlider Component
 *
 * A responsive slider component that displays customer testimonials.
 * On desktop: Uses navigation arrows with smooth translation animations
 * On mobile: Uses native horizontal scrolling
 */
const TestimonialSlider: React.FC<TestimonialSliderProps> = (props): JSX.Element => {
  const { t } = useTranslation('page-index');

  // Navigation state management
  /** CSS class for right navigation button (empty when active, 'inactive' when disabled) */
  const [navRightClass, setNavRightClass] = useState('');

  /** Current horizontal translation offset in pixels for desktop slider */
  const [translationX, setTranslationX] = useState(0);

  /** Flag to prevent rapid navigation clicks during slide transitions */
  const [isNavigating, setIsNavigating] = useState(false);

  /**
   * Calculate the right boundary position of the last slide
   * Used to determine if right navigation should be disabled
   *
   * @returns The right edge position of the last slide, or undefined if not found
   */
  const calculateRightBound = useCallback((): number | undefined => {
    const lastChild = document.querySelector('.c-testi-slider__slide:last-child');
    return lastChild?.getBoundingClientRect().right;
  }, []);

  /**
   * Determine the CSS class for the right navigation button
   * Disables navigation when the last slide is fully visible
   *
   * @returns CSS class string ('c-testi-slider__nav--inactive' or empty string)
   */
  const decideNavRightClass = useCallback((): string => {
    const rightBound = calculateRightBound();
    return rightBound && rightBound <= window.innerWidth ? 'c-testi-slider__nav--inactive' : '';
  }, [calculateRightBound]);

  /**
   * Update navigation state after slide transitions
   * Delays the update to allow smooth animation completion
   */
  useEffect(() => {
    const navigationTimeout = setTimeout(() => {
      setNavRightClass(decideNavRightClass());
      setIsNavigating(false);
    }, NAVIGATION_DELAY);

    return () => {
      clearTimeout(navigationTimeout);
    };
  }, [translationX, decideNavRightClass]);

  /**
   * Handle right navigation click
   * Slides testimonials to the left to show next items
   * Prevents navigation if already navigating or at the end
   */
  const onNavRight = useCallback(() => {
    // Prevent navigation if currently animating or right navigation is disabled
    if (isNavigating || navRightClass) return;

    setIsNavigating(true);

    // Track user engagement with testimonial navigation
    gtag.event({
      action: 'testimonials',
      category: 'engagement',
      label: 'desktop',
    });

    // Move slider left by one slide width
    setTranslationX((prevTranslation) => prevTranslation - SLIDE_WIDTH);
  }, [isNavigating, navRightClass]);

  /**
   * Handle left navigation click
   * Slides testimonials to the right to show previous items
   * Prevents navigation if already at the beginning
   */
  const onNavLeft = useCallback(() => {
    // Prevent navigation if already at the beginning
    if (translationX === 0) return;

    // Move slider right by one slide width
    setTranslationX((prevTranslation) => prevTranslation + SLIDE_WIDTH);
  }, [translationX]);

  /**
   * Handle keyboard navigation for accessibility
   * Supports Enter and Space keys for navigation buttons
   */
  const handleKeyPress = useCallback(
    (event: React.KeyboardEvent, action: 'left' | 'right') => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        if (action === 'left') {
          onNavLeft();
        } else {
          onNavRight();
        }
      }
    },
    [onNavLeft, onNavRight],
  );

  return (
    <div>
      <div className="c-testi-slider">
        {/* Header section with title and navigation controls */}
        <div className={`c-testi-slider__header ${props.isMobile ? '' : 'u-container'}`}>
          {/* Testimonial section title */}
          <div className="c-testi-slider__title">
            <h2>{t('testi-header')}</h2>
          </div>

          {/* Desktop navigation arrows - hidden on mobile where native scrolling is used */}
          {!props.isMobile && (
            <div className="c-testi-slider__nav">
              {/* Left navigation button - disabled when at the beginning */}
              <div
                className={`c-testi-slider__nav--left ${translationX === 0 ? 'c-testi-slider__nav--inactive' : ''}`}
                onClick={onNavLeft}
                onKeyDown={(event) => handleKeyPress(event, 'left')}
                role="button"
                tabIndex={0}
                aria-label="Previous testimonials"
              >
                <span className="icon-chevron_left" />
              </div>

              {/* Right navigation button - disabled when at the end */}
              <div
                className={`c-testi-slider__nav--right ${navRightClass}`}
                onClick={onNavRight}
                onKeyDown={(event) => handleKeyPress(event, 'right')}
                role="button"
                tabIndex={0}
                aria-label="Next testimonials"
              >
                <span className="icon-chevron_right" />
              </div>
            </div>
          )}
        </div>

        {/* Testimonials container with responsive behavior */}
        <div className="c-testi-slider__slides">
          {props.testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="c-testi-slider__slide">
              <TestimonialComponent data={testimonial} />
            </Card>
          ))}
        </div>
      </div>

      {/* Component-scoped styles using styled-jsx */}
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
