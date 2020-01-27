import { useRouter } from 'next/router';
// import { ShoppingCart } from 'react-feather';
import { useState, useRef, useEffect } from 'react';
import { withTranslation, Link } from 'i18n';
import TranslationToggle from 'components/molecules/TranslationToggle';
import CartDropdown from 'components/molecules/CartDropdown';
import Dot from 'components/atoms/Dot';

const NavBar = (props: any) => {
  const router = useRouter();
  const [isSticky, setSticky] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const guestMenu = [
    { text: props.t('login'), path: '/login' },
    { text: props.t('register'), path: '/register', className: 'text-brand' },
  ];
  const userMenu = [{ text: props.t('account'), path: '/account', icon: 'account' }];
  const menu = props.isLoggedIn ? userMenu : guestMenu;
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

  return (
    <div className="relative z-50">
      <div className={stickyClassName()} ref={ref}>
        <div className="c-nav-bar">
          <div className="u-container">
            <Link href="/">
              <a className="c-nav-bar__logo">
                <img src={`/static/images/logo${isSticky ? '' : '-black'}.png`} alt="logo" />
              </a>
            </Link>
            <div className="c-nav-bar__menu">
              {isSticky && <TranslationToggle />}
              <Link href="/cart">
                <a
                  className="c-nav-bar__menu__cart"
                  onMouseEnter={() => setShowCart(true)}
                  onMouseLeave={() => setShowCart(false)}
                >
                  <div className="c-nav-bar__menu__item c-nav-bar__menu__cart__button">
                    <span className="c-nav-bar__menu__icon icon-cart"></span>
                    {props.t('cart')}
                    {cartNotEmpty && <Dot color="red" />}
                  </div>
                  {showCart && <CartDropdown cart={props.cart.cart} />}
                </a>
              </Link>
              {(menu as any).map((menu, i): any => {
                return (
                  <Link key={i} href={menu.path}>
                    <a className={`c-nav-bar__menu__item ${menu.className || ''}`}>
                      {menu.icon && <span className={`c-nav-bar__menu__icon icon-${menu.icon}`}></span>}
                      {menu.text}
                    </a>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .c-nav-bar {
            ${router.pathname === '/' ? 'position: absolute; width: 100%;' : ''}
            @apply flex z-50;
            height: 80px;

            .c-nav-bar--sticky & {
              @apply fixed top-0 inset-x-0 bg-white;
            }

            &__logo {
              @apply font-bold text-lg text-red-600;
              img {
                width: 53.67px;
              }
            }

            &__menu {
              @apply flex items-center text-dark-grey text-xs h-full;
              &__item {
                @apply px-6 py-3 font-bold;
                @apply flex items-center;
              }
              &__icon {
                @apply mr-3;
                font-size: 16px;
              }
              &__cart {
                @apply relative h-full flex items-center;

                &__button {
                  @apply mx-6 justify-center;
                  width: 120px;
                }
                &:hover .c-nav-bar__menu__cart__button {
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
