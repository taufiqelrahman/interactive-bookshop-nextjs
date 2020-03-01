import { withTranslation, Link } from 'i18n';
import { useEffect } from 'react';
import TranslationToggle from 'components/molecules/TranslationToggle';
import Button from 'components/atoms/Button';

const SideNav = (props: any) => {
  const signOut = () => {
    props.thunkLogout();
    props.hide();
  };
  useEffect(() => {
    if (props.isOpen) {
      document.body.classList.add('overlay-active');
    } else {
      document.body.classList.remove('overlay-active');
    }
  }, [props.isOpen]);
  return (
    <div className="c-side-nav">
      <div className="c-side-nav__container">
        <div>
          <div className="c-side-nav__header">
            <button className="c-side-nav__button--close" onClick={props.hide}>
              <span className="icon-info" />
            </button>
            {props.users.isLoggedIn ? (
              <div className="c-side-nav__header__user">
                <div className="c-side-nav__header__user--top">{props.t('signed-in-as')}</div>
                <div>{props.users.user && props.users.user.email}</div>
              </div>
            ) : (
              <div className="c-side-nav__header__guest">
                <Link href="/login">
                  <a>
                    <Button width="76px" variant="outline,rectangle">
                      {props.t('login')}
                    </Button>
                  </a>
                </Link>
                <div className="c-side-nav__header__separator">{props.t('or')}</div>
                <Link href="/register">
                  <a className="c-side-nav__header__link">{props.t('register')}</a>
                </Link>
              </div>
            )}
          </div>
          <div className="c-side-nav__menu">
            <Link href="/">
              <a className="c-side-nav__menu__link">{props.t('home')}</a>
            </Link>
            <Link href="/">
              <a className="c-side-nav__menu__link">{props.t('cart-title')}</a>
            </Link>
            {props.users.isLoggedIn && (
              <Link href="/orders">
                <a className="c-side-nav__menu__link">{props.t('my-orders')}</a>
              </Link>
            )}
            <Link href="/help">
              <a className="c-side-nav__menu__link">{props.t('help-title')}</a>
            </Link>
          </div>
        </div>

        <div className="c-side-nav__footer">
          {props.t('site-language')}
          <TranslationToggle white={true} style={{ marginTop: 6 }} />
          {props.users.isLoggedIn && (
            <div className="c-side-nav__footer__sign-out" onClick={signOut}>
              {props.t('sign-out')}
            </div>
          )}
        </div>
      </div>
      <style jsx>{`
        .c-side-nav {
          @apply h-screen fixed z-50 top-0 left-0 overflow-x-hidden text-white;
          width: ${props.isOpen ? '90vw' : 0};
          background-color: #de6236;
          transition: width 0.3s ease-in;
          &__container {
            opacity: ${props.isOpen ? 1 : 0};
            transition: opacity 0.3s ease-in;
            @apply flex flex-col justify-between h-full;
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
              transform: translateY(${props.users.isLoggedIn ? '45%' : '75%'});
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
            @apply text-white font-opensans text-sm;
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

export default withTranslation('common')(SideNav);
