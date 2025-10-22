import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from 'components/atoms/Button';
import TranslationToggle from 'components/molecules/TranslationToggle';
import actions from 'store/actions';
import { setSideNav } from 'store/reducers';
import { State } from 'store/types';
import { UsersState } from 'store/users/types';

/**
 * SideNav Component
 *
 * A responsive side navigation drawer that provides access to main application routes
 * and user authentication controls. Features smooth slide-in animation and responsive design.
 *
 * Key Features:
 * - User authentication state display
 * - Navigation links to main sections
 * - Language toggle functionality
 * - Sign out functionality for authenticated users
 * - Responsive width and smooth animations
 */

const SideNav: React.FC = (): JSX.Element => {
  /** Translation function for internationalization */
  const { t } = useTranslation('common');

  /** Next.js router for programmatic navigation */
  const router = useRouter();

  /** User authentication state from Redux store */
  const users = useSelector((state: { users: UsersState }) => state.users);

  /** Side navigation visibility state from Redux store */
  const { isSideNavOpen } = useSelector((state: { common: State }) => state.common);

  /** Redux dispatch function for state updates */
  const dispatch = useDispatch();

  /**
   * Close the side navigation drawer
   * Updates the Redux state to hide the side navigation
   */
  const hideSideNav = useCallback((): void => {
    dispatch(setSideNav(false));
  }, [dispatch]);

  /**
   * Handle user sign out process
   * Logs out the user, closes the side nav, and redirects to home page
   */
  const signOut = useCallback(async (): Promise<void> => {
    await dispatch(actions.thunkLogout());
    hideSideNav();
    router.push('/');
  }, [dispatch, hideSideNav, router]);
  /**
   * Manage body class for overlay state
   * Adds/removes CSS class to prevent body scrolling when side nav is open
   */
  useEffect(() => {
    if (isSideNavOpen) {
      document.body.classList.add('overlay-active');
    } else {
      document.body.classList.remove('overlay-active');
    }
  }, [isSideNavOpen]);

  return (
    <nav className="c-side-nav" role="navigation" aria-label="Main navigation">
      <div className="c-side-nav__container">
        <div>
          {/* Header section with user authentication controls */}
          <header className="c-side-nav__header">
            {/* Close button for side navigation */}
            <button
              aria-label="Close navigation menu"
              className="c-side-nav__button--close"
              onClick={hideSideNav}
              type="button"
            >
              <span className="icon-ui_cross" aria-hidden="true" />
            </button>

            {/* Conditional rendering based on user authentication state */}
            {users.isLoggedIn ? (
              // Authenticated user display
              <div className="c-side-nav__header__user">
                <div className="c-side-nav__header__user--top">{t('signed-in-as')}</div>
                <div title={users.user?.email}>{users.user?.email}</div>
              </div>
            ) : (
              // Guest user authentication options
              <div className="c-side-nav__header__guest">
                <Link href="/login">
                  <a aria-label="Go to login page">
                    <Button width="76px" variant="outline,rectangle">
                      {t('login')}
                    </Button>
                  </a>
                </Link>
                <div className="c-side-nav__header__separator" aria-hidden="true">
                  {t('or')}
                </div>
                <Link href="/register">
                  <a className="c-side-nav__header__link" aria-label="Go to registration page">
                    {t('register')}
                  </a>
                </Link>
              </div>
            )}
          </header>

          {/* Main navigation menu with contextual links */}
          <nav className="c-side-nav__menu" role="menu">
            {/* Primary navigation links available to all users */}
            <Link href="/">
              <a className="c-side-nav__menu__link" role="menuitem" aria-label="Go to home page">
                {t('home')}
              </a>
            </Link>

            <Link href="/cart">
              <a className="c-side-nav__menu__link" role="menuitem" aria-label="View shopping cart">
                {t('cart')}
              </a>
            </Link>

            {/* Authenticated user only - Order history */}
            {users.isLoggedIn && (
              <Link href="/orders">
                <a className="c-side-nav__menu__link" role="menuitem" aria-label="View order history">
                  {t('my-orders')}
                </a>
              </Link>
            )}

            {/* Authenticated user only - Account management */}
            {users.isLoggedIn && (
              <Link href="/account">
                <a className="c-side-nav__menu__link" role="menuitem" aria-label="Manage account settings">
                  {t('account')}
                </a>
              </Link>
            )}

            {/* Help section available to all users */}
            <Link href="/help">
              <a className="c-side-nav__menu__link" role="menuitem" aria-label="Get help and support">
                {t('help-title')}
              </a>
            </Link>
          </nav>
        </div>

        {/* Footer section with language toggle and sign out */}
        <footer className="c-side-nav__footer">
          {/* Language selection label */}
          <div>{t('site-language')}</div>

          {/* Language toggle component for internationalization */}
          <TranslationToggle white={true} style={{ marginTop: 6 }} />

          {/* Sign out button - only visible for authenticated users */}
          {users.isLoggedIn && (
            <button
              className="c-side-nav__footer__sign-out"
              onClick={signOut}
              type="button"
              aria-label="Sign out of your account"
            >
              {t('sign-out')}
            </button>
          )}
        </footer>
      </div>

      {/* Component-scoped styles using styled-jsx */}
      <style jsx>{`
        .c-side-nav {
          @apply fixed left-0 top-0 z-50 h-screen overflow-x-hidden text-white;
          width: ${isSideNavOpen ? '90vw' : 0};
          background-color: #de6236;
          transition: width 0.3s ease-in;
          &__container {
            opacity: ${isSideNavOpen ? 1 : 0};
            transition: opacity 0.3s ease-in;
            @apply flex h-full flex-col justify-between;
            padding: 32px 58px;
          }
          &__header {
            @apply relative;
            &__guest {
              @apply flex items-center;
            }
            &__separator {
              margin: 0 16px;
            }
            &__user {
              &--top {
                @apply text-xs;
                margin-bottom: 4px;
              }
            }
          }
          &__button {
            &--close {
              @apply absolute;
              left: -38px;
              transform: translateY(${users.isLoggedIn ? '45%' : '75%'});
            }
          }
          &__menu {
            @apply flex flex-col;
            padding-top: 62px;
            &__link {
              @apply font-bold;
              margin-bottom: 24px;
              font-size: 28px;
              line-height: 42px;
              &:first-child {
                @apply underline;
              }
            }
          }
          &__footer {
            @apply font-opensans text-sm text-white;
            &__sign-out {
              @apply cursor-pointer font-semibold;
              margin-top: 24px;
            }
          }
        }
      `}</style>
      <style jsx global>{`
        .c-side-nav__header {
          @apply font-opensans font-semibold;
        }
      `}</style>
    </nav>
  );
};

export default SideNav;
