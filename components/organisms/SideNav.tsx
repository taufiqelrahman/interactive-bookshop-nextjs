import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from 'components/atoms/Button';
import TranslationToggle from 'components/molecules/TranslationToggle';
import actions from 'store/actions';
import { setSideNav } from 'store/reducers';
import { State } from 'store/types';
import { UsersState } from 'store/users/types';

const SideNav: React.FC = () => {
  const { t } = useTranslation('common');
  const users = useSelector((state: { users: UsersState }) => state.users);
  const { isSideNavOpen } = useSelector((state: { common: State }) => state.common);
  const dispatch = useDispatch();
  const signOut = () => {
    dispatch(actions.thunkLogout());
    hideSideNav();
  };
  const hideSideNav = () => {
    dispatch(setSideNav(false));
  };
  useEffect(() => {
    if (isSideNavOpen) {
      document.body.classList.add('overlay-active');
    } else {
      document.body.classList.remove('overlay-active');
    }
  }, [isSideNavOpen]);
  return (
    <div className="c-side-nav">
      <div className="c-side-nav__container">
        <div>
          <div className="c-side-nav__header">
            <button aria-label="close button" className="c-side-nav__button--close" onClick={hideSideNav}>
              <span className="icon-ui_cross" />
            </button>
            {users.isLoggedIn ? (
              <div className="c-side-nav__header__user">
                <div className="c-side-nav__header__user--top">{t('signed-in-as')}</div>
                <div>{users.user && users.user.email}</div>
              </div>
            ) : (
              <div className="c-side-nav__header__guest">
                <Link href="/login">
                  <a>
                    <Button width="76px" variant="outline,rectangle">
                      {t('login')}
                    </Button>
                  </a>
                </Link>
                <div className="c-side-nav__header__separator">{t('or')}</div>
                <Link href="/register">
                  <a className="c-side-nav__header__link">{t('register')}</a>
                </Link>
              </div>
            )}
          </div>
          <div className="c-side-nav__menu">
            <Link href="/">
              <a className="c-side-nav__menu__link">{t('home')}</a>
            </Link>
            <Link href="/cart">
              <a className="c-side-nav__menu__link">{t('cart')}</a>
            </Link>
            {users.isLoggedIn && (
              <Link href="/orders">
                <a className="c-side-nav__menu__link">{t('my-orders')}</a>
              </Link>
            )}
            {users.isLoggedIn && (
              <Link href="/account">
                <a className="c-side-nav__menu__link">{t('account')}</a>
              </Link>
            )}
            <Link href="/help">
              <a className="c-side-nav__menu__link">{t('help-title')}</a>
            </Link>
          </div>
        </div>

        <div className="c-side-nav__footer">
          {t('site-language')}
          <TranslationToggle white={true} style={{ marginTop: 6 }} />
          {users.isLoggedIn && (
            <div className="c-side-nav__footer__sign-out" onClick={signOut}>
              {t('sign-out')}
            </div>
          )}
        </div>
      </div>
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
    </div>
  );
};

export default SideNav;
