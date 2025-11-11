import Image from 'next/image';
import { useRouter } from 'next/router';
import { useMemo, useCallback, CSSProperties } from 'react';

import Stepper from 'components/atoms/Stepper';

/**
 * Props interface for Mobile NavBar component
 */
interface MobileNavBarProps {
  /** Function to control side navigation visibility */
  setSideNav?: (isOpen: boolean) => void;
  /** Whether to show menu icon instead of back arrow */
  menuAction?: boolean;
  /** Custom back button handler function */
  onBack?: () => void;
  /** Whether the current view shows step progression */
  isSteps?: boolean;
  /** Current step number (when isSteps is true) */
  step?: number;
  /** Total number of steps (when isSteps is true) */
  totalSteps?: number;
  /** Title text to display in navbar */
  title?: string;
  /** Custom inline styles for the navbar */
  style?: CSSProperties;
}

/**
 * Mobile Navigation Bar Component
 *
 * A mobile-optimized navigation bar that adapts its layout and functionality
 * based on the current page context. Features dynamic styling for different
 * page types and supports step progression display.
 *
 * Key features:
 * - Dynamic layout based on page type (index, error, or regular pages)
 * - Side navigation menu trigger
 * - Step progression display for multi-step flows
 * - Back navigation with custom handler support
 * - Responsive design optimized for mobile devices
 *
 * @param props - Component props containing navigation controls and display options
 * @returns JSX element representing the mobile navigation bar
 */
const NavBar = (props: MobileNavBarProps): JSX.Element => {
  // Router hook for navigation and pathname detection
  const router = useRouter();

  // Memoized page type detection for performance optimization
  const isIndexPage = useMemo(() => router.pathname === '/', [router.pathname]);
  const isErrorPage = useMemo(() => router.pathname === '/_error', [router.pathname]);

  /**
   * Determines if current page is either index or error page
   * Used for conditional styling and layout adjustments
   */
  const indexOrError = useMemo(() => isIndexPage || isErrorPage, [isIndexPage, isErrorPage]);

  /**
   * Handles side navigation menu toggle
   * Opens the side navigation drawer when menu icon is clicked
   */
  const handleShowSideNav = useCallback(() => {
    props.setSideNav(true);
  }, [props]);

  /**
   * Handles back navigation action
   * Uses custom onBack handler if provided, otherwise defaults to router.back()
   */
  const handleBackNavigation = useCallback(() => {
    if (props.onBack) {
      props.onBack();
    } else {
      router.back();
    }
  }, [props, router]);

  /**
   * Renders the appropriate navigation action icon
   * Shows menu icon for menu action, back arrow for navigation
   */
  const renderActionButton = useMemo(
    () => (
      <div className={`c-nav-bar__action ${indexOrError ? 'c-nav-bar__action--index' : ''}`}>
        {props.menuAction ? (
          <span className="icon-menu" onClick={handleShowSideNav} />
        ) : (
          <span className="icon-arrow_left" onClick={handleBackNavigation} />
        )}
      </div>
    ),
    [indexOrError, props.menuAction, handleShowSideNav, handleBackNavigation],
  );

  /**
   * Renders the title content based on page context
   * Shows logo for index/error pages, stepper for multi-step flows, or text title
   */
  const renderTitleContent = useMemo(() => {
    if (indexOrError) {
      return <Image src="/static/images/logo.png" alt="Interactive Bookshop Logo" width={33} height={33} priority />;
    }

    if (props.isSteps) {
      return (
        <Stepper
          step={props.step}
          totalSteps={props.totalSteps}
          title={props.title}
          backButton={false}
          isMobile={true}
        />
      );
    }

    return <div className="c-nav-bar__title__text">{props.title}</div>;
  }, [indexOrError, props.isSteps, props.step, props.totalSteps, props.title]);
  return (
    <div className="c-nav-bar" style={props.style}>
      {/* Navigation action button - menu or back arrow */}
      {renderActionButton}

      {/* Title section - logo, stepper, or text based on context */}
      <div className={`c-nav-bar__title ${indexOrError ? 'c-nav-bar__title--index' : ''}`}>{renderTitleContent}</div>
      <style jsx>{`
        /* ==============================================
         * MOBILE NAVIGATION BAR STYLES
         * Responsive mobile navbar with adaptive layout
         * ============================================== */

        .c-nav-bar {
          /* Fixed positioning with responsive padding and borders */
          @apply fixed top-0 z-30 flex w-full items-center bg-white;
          padding: ${indexOrError ? '14px' : '16px'};
          border-bottom: ${indexOrError ? 'none' : '1px solid #efeef4'};

          /* Navigation action button (menu/back) */
          &__action {
            @apply flex cursor-pointer items-center justify-center;
            width: 22px;
            font-size: 20px;
            margin-right: ${indexOrError ? 0 : '16px'};
            transition: color 0.2s ease-in-out;

            /* Special styling for index page */
            &--index {
              @apply text-brand;
            }

            /* Hover effects for better interaction feedback */
            &:hover {
              opacity: 0.8;
            }

            /* Touch target optimization for mobile */
            &:active {
              transform: scale(0.95);
            }
          }

          /* Title section with adaptive content */
          &__title {
            /* Index page specific layout - centered logo */
            &--index {
              @apply flex w-full items-center justify-center;
            }

            /* Text title styling for regular pages */
            &__text {
              @apply font-semibold;
              font-size: 18px;
              line-height: 26px;
              color: #1a202c;
            }
          }
        }
      `}</style>
    </div>
  );
};

export default NavBar;
