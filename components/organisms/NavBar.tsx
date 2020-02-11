import { useRouter } from 'next/router';
// import { ShoppingCart } from 'react-feather';
import { useState, useRef, useEffect } from 'react';
import { withTranslation, Link } from 'i18n';
import TranslationToggle from 'components/molecules/TranslationToggle';
import CartDropdown from 'components/molecules/CartDropdown';
import AccountDropdown from 'components/molecules/AccountDropdown';
import Dot from 'components/atoms/Dot';

const NavBar = (props: any) => {
  const router = useRouter();
  const isIndexPage = router.pathname === '/';
  const [isSticky, setSticky] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showAccount, setShowAccount] = useState(false);
  const guestMenu = [
    { text: props.t('login'), path: '/login' },
    { text: props.t('register'), path: '/register', className: 'text-brand' },
  ];
  const ref = useRef<HTMLInputElement>(null);
  const handleScroll = () => {
    if (ref && ref.current) {
      setSticky(ref.current.getBoundingClientRect().top <= 0);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', () => handleScroll);
    };
  }, []);

  const stickyClassName = () => {
    return isSticky ? 'c-nav-bar--sticky' : '';
  };

  const cartNotEmpty = !!props.cart.cart && props.cart.cart.length > 0;

  const toggleShow = (state, action) => {
    action(state);
    if (state) {
      document.body.classList.add('overlay-active');
    } else {
      document.body.classList.remove('overlay-active');
    }
  };

  const logout = () => {
    props.thunkLogout();
    toggleShow(false, setShowAccount);
  };

  return (
    <div className={`relative z-50 ${showCart || showAccount ? 'bg-white' : ''}`}>
      <div className={stickyClassName()} ref={ref}>
        <div className="c-nav-bar">
          <div className="u-container u-container__spread">
            <Link href="/">
              <a className="c-nav-bar__logo">
                <img src={`/static/images/logo${isSticky || !isIndexPage ? '' : '-black'}.png`} alt="logo" />
              </a>
            </Link>
            <div className="c-nav-bar__menu">
              {(isSticky || !isIndexPage) && <TranslationToggle />}
              <Link href={props.isLoggedIn ? '/cart' : '/login?from=cart'}>
                <div
                  className="c-nav-bar__menu__cart"
                  onMouseEnter={() => toggleShow(true, setShowCart)}
                  onMouseLeave={() => toggleShow(false, setShowCart)}
                >
                  <a>
                    <div className="c-nav-bar__menu__item c-nav-bar__menu__cart__button">
                      <span className="c-nav-bar__menu__icon icon-cart"></span>
                      {props.t('cart')}
                      {cartNotEmpty && <Dot color="red" />}
                    </div>
                  </a>
                  {showCart && <CartDropdown cart={props.cart.cart} />}
                </div>
              </Link>
              {props.isLoggedIn ? (
                <Link href="/account">
                  <div
                    className="c-nav-bar__menu__account"
                    onMouseEnter={() => toggleShow(true, setShowAccount)}
                    onMouseLeave={() => toggleShow(false, setShowAccount)}
                  >
                    <a>
                      <div className="c-nav-bar__menu__item c-nav-bar__menu__button">
                        <span className="c-nav-bar__menu__icon icon-account"></span>
                        {props.t('account')}
                      </div>
                    </a>
                    {showAccount && <AccountDropdown logout={logout} />}
                  </div>
                </Link>
              ) : (
                (guestMenu as any).map((menu, i): any => {
                  return (
                    <Link key={i} href={menu.path}>
                      <a className={`c-nav-bar__menu__item ${menu.className || ''}`}>{menu.text}</a>
                    </Link>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .c-nav-bar {
            ${isIndexPage ? 'position: absolute; width: 100%;' : ''}
            @apply flex z-50;
            height: 80px;
            box-shadow: ${isIndexPage ? 'none' : '0px 2px 8px rgba(0, 0, 0, 0.08)'};

            .c-nav-bar--sticky & {
              @apply fixed top-0 inset-x-0 bg-white;
            }

            &__logo {
              img {
                width: 53.67px;
              }
            }

            &__menu {
              @apply flex items-center text-dark-grey text-xs h-full;
              &__item {
                @apply px-6 py-3 font-semibold;
                @apply flex items-center;
              }
              &__icon {
                @apply mr-3;
                font-size: 16px;
              }
              &__cart,
              &__account {
                @apply relative h-full flex items-center;

                &__button {
                  @apply mx-6 justify-center cursor-pointer;
                  width: 120px;
                }
                &:hover .c-nav-bar__menu__cart__button,
                &:hover .c-nav-bar__menu__button {
                  background: #f5f5f5;
                  border-radius: 6px;
                }
              }
            }

            &--sticky {
              @apply sticky top-0;
            }
          }
        `}
      </style>
    </div>
  );
};

export default withTranslation('common')(NavBar);
