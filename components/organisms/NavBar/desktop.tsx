import detectIt from 'detect-it';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Dot from 'components/atoms/Dot';
import AccountDropdown from 'components/molecules/AccountDropdown';
import CartDropdown from 'components/molecules/CartDropdown';
import TranslationToggle from 'components/molecules/TranslationToggle';
import actions from 'store/actions';
import { CartState } from 'store/cart/types';
import { UsersState } from 'store/users/types';

/**
 * Navigation menu item interface
 */
interface MenuItem {
  /** Display text for the menu item */
  text: string;
  /** Navigation path/route */
  path: string;
  /** Optional CSS class names */
  className?: string;
}

/**
 * Redux state interface for navbar selectors
 */
interface NavBarState {
  /** User authentication and profile state */
  users: UsersState;
  /** Shopping cart state */
  cart: CartState;
}

/**
 * Desktop Navigation Bar Component
 *
 * A responsive desktop navigation bar with cart dropdown, user account management,
 * language translation toggle, and sticky scroll behavior. Features mouse hover
 * interactions and dynamic styling based on page context.
 *
 * Key features:
 * - Sticky header with scroll detection
 * - Cart dropdown with item count indicator
 * - User authentication state handling
 * - Language translation toggle
 * - Responsive hover interactions
 * - Dynamic styling based on page location
 *
 * @returns JSX element representing the desktop navigation bar
 */
const NavBar = (): JSX.Element => {
  // Translation and routing hooks
  const { t } = useTranslation('common');
  const router = useRouter();
  const dispatch = useDispatch();

  // Redux state selectors with proper typing
  const users = useSelector((state: NavBarState) => state.users);
  const cartItems = useSelector((state: NavBarState) => state.cart.cart?.lineItems);

  // Page context and component state
  const isIndexPage = router.pathname === '/';
  const [isSticky, setSticky] = useState<boolean>(false);
  const [showCart, setShowCart] = useState<boolean>(false);
  const [showAccount, setShowAccount] = useState<boolean>(false);

  // Navigation menu configuration for guest users
  const guestMenu: MenuItem[] = useMemo(
    () => [
      { text: t('login'), path: '/login' },
      { text: t('register'), path: '/register', className: 'text-brand' },
    ],
    [t],
  );

  // Ref for scroll detection element
  const navBarRef = useRef<HTMLDivElement>(null);

  /**
   * Handles scroll events to determine sticky navigation state
   * Sets sticky state when navbar scrolls above viewport threshold
   */
  const handleScroll = useCallback(() => {
    if (navBarRef?.current) {
      const isScrolledPastThreshold = navBarRef.current.getBoundingClientRect().top < -80;
      setSticky(isScrolledPastThreshold);
    }
  }, []);
  // Effect for managing scroll listener and cart overlay
  useEffect(() => {
    // Remove overlay when cart is hidden
    if (!showCart) {
      document.body.classList.remove('overlay-active');
    }

    // Only add scroll listener on index page
    if (!isIndexPage) return;

    // Add scroll listener with passive support for better performance
    const scrollOptions = detectIt.passiveEvents ? { passive: true } : false;
    window.addEventListener('scroll', handleScroll, scrollOptions);

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [showCart, isIndexPage, handleScroll]);

  /**
   * Generates CSS class name for sticky navigation state
   * @returns CSS class string for sticky state
   */
  const stickyClassName = useMemo(() => {
    return isSticky ? 'c-nav-bar--sticky' : '';
  }, [isSticky]);

  /**
   * Checks if cart contains any items for notification display
   */
  const cartNotEmpty = useMemo(() => {
    return !!cartItems && cartItems.length > 0;
  }, [cartItems]);

  /**
   * Toggles dropdown visibility and manages body overlay class
   * Handles both cart and account dropdown states
   *
   * @param state - Target visibility state
   * @param action - State setter function
   */
  const toggleShow = useCallback((state: boolean, action: (show: boolean) => void) => {
    action(state);
    if (state) {
      document.body.classList.add('overlay-active');
    } else {
      document.body.classList.remove('overlay-active');
    }
  }, []);

  /**
   * Handles user logout process
   * Dispatches logout action, closes account dropdown, and redirects to home
   */
  const handleLogout = useCallback(async () => {
    await dispatch(actions.thunkLogout());
    toggleShow(false, setShowAccount);
    router.push('/');
  }, [dispatch, toggleShow, router]);

  /**
   * Extracts and formats user display name
   * Shows first name if available, otherwise falls back to 'account' text
   */
  const userName = useMemo(() => {
    const userFullName = users?.user?.name;
    return userFullName ? userFullName.split(' ')[0] : t('account');
  }, [users?.user?.name, t]);

  /**
   * Renders the cart menu item with dropdown and item count indicator
   * Handles mouse enter/leave events for dropdown visibility
   */
  const renderCartMenu = useMemo(
    () => (
      <Link href="/cart">
        <div
          className="c-nav-bar__menu__cart"
          onMouseEnter={() => toggleShow(true, setShowCart)}
          onMouseLeave={() => toggleShow(false, setShowCart)}
        >
          <a>
            <div className="c-nav-bar__menu__item c-nav-bar__menu__cart__button">
              <span className="c-nav-bar__menu__icon icon-cart"></span>
              {t('cart')}
              {cartNotEmpty && <Dot color="red" />}
            </div>
          </a>
          {showCart && <CartDropdown items={cartItems} />}
        </div>
      </Link>
    ),
    [toggleShow, t, cartNotEmpty, showCart, cartItems],
  );

  /**
   * Renders the account menu for authenticated users
   * Shows user name and account dropdown on hover
   */
  const renderAccountMenu = useMemo(
    () => (
      <Link href="/account">
        <div
          className="c-nav-bar__menu__account"
          onMouseEnter={() => toggleShow(true, setShowAccount)}
          onMouseLeave={() => toggleShow(false, setShowAccount)}
        >
          <a>
            <div className="c-nav-bar__menu__item c-nav-bar__menu__button">
              <span className="c-nav-bar__menu__icon icon-account"></span>
              {userName}
            </div>
          </a>
          {showAccount && <AccountDropdown logout={handleLogout} />}
        </div>
      </Link>
    ),
    [toggleShow, userName, showAccount, handleLogout],
  );

  /**
   * Renders guest menu items (login and register links)
   * Only shown when user is not authenticated
   */
  const renderGuestMenu = useMemo(
    () =>
      guestMenu.map((menu, index) => (
        <Link key={index} href={menu.path}>
          <a className={`c-nav-bar__menu__item ${menu.className || ''}`}>{menu.text}</a>
        </Link>
      )),
    [guestMenu],
  );

  return (
    <div className={`relative z-50 ${showCart || showAccount ? 'bg-white' : ''}`}>
      <div className={stickyClassName} ref={navBarRef}>
        <div className="c-nav-bar">
          <div className="u-container u-container__spread">
            <Link href="/">
              <a className="c-nav-bar__logo">
                <Image src="/static/images/logo.png" alt="Interactive Bookshop Logo" width={54} height={40} priority />
              </a>
            </Link>
            <div className="c-nav-bar__menu">
              {/* Language translation toggle */}
              <TranslationToggle isSticky={isSticky} />

              {/* Shopping cart with dropdown */}
              {renderCartMenu}

              {/* User authentication menu - account dropdown or guest links */}
              {users.isLoggedIn ? renderAccountMenu : renderGuestMenu}
            </div>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          /* ==============================================
           * DESKTOP NAVIGATION BAR STYLES
           * Responsive navbar with sticky behavior and hover effects
           * ============================================== */

          .c-nav-bar {
            /* Dynamic background and positioning based on page context */
            ${isIndexPage ? '' : 'background: white; top: 0;'}
            @apply flex z-50 w-full;
            height: 80px;
            position: ${isIndexPage ? 'absolute' : 'fixed'};
            box-shadow: ${isIndexPage ? 'none' : '0px 2px 8px rgba(0, 0, 0, 0.08)'};

            /* Sticky state override styles */
            .c-nav-bar--sticky & {
              @apply fixed inset-x-0 top-0 bg-white;
            }

            /* Logo section styles */
            &__logo {
              @apply flex items-center;

              img {
                width: 53.67px;
                height: auto;
              }
            }

            /* Navigation menu container and items */
            &__menu {
              @apply flex h-full items-center text-xs text-dark-grey;

              /* Base menu item styling */
              &__item {
                @apply flex cursor-pointer items-center px-6 py-3 font-semibold;
                transition: all 0.2s ease-in-out;

                &:hover {
                  @apply text-brand;
                }
              }

              /* Menu icons */
              &__icon {
                @apply mr-3;
                font-size: 16px;
              }

              /* Cart and account dropdown containers */
              &__cart,
              &__account {
                @apply relative flex h-full items-center;

                /* Button styling for dropdowns */
                &__button {
                  @apply mx-6 cursor-pointer justify-center;
                  width: 120px;
                  transition: background-color 0.2s ease-in-out;
                }

                /* Hover effects for dropdown buttons */
                &:hover .c-nav-bar__menu__cart__button,
                &:hover .c-nav-bar__menu__button {
                  background: #f5f5f5;
                  border-radius: 6px;
                }
              }
            }

            /* Sticky navigation state */
            &--sticky {
              @apply sticky top-0;
              box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.12);
            }
          }
        `}
      </style>
    </div>
  );
};

export default NavBar;
