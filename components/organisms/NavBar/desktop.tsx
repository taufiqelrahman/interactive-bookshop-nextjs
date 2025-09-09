import detectIt from 'detect-it';
import Link from 'next/link';
import { useRouter } from 'next/router';
// import { ShoppingCart } from 'react-feather';
import { useTranslation } from 'next-i18next';
import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Dot from 'components/atoms/Dot';
import AccountDropdown from 'components/molecules/AccountDropdown';
import CartDropdown from 'components/molecules/CartDropdown';
import TranslationToggle from 'components/molecules/TranslationToggle';
import actions from 'store/actions';
import { CartState } from 'store/cart/types';
import { UsersState } from 'store/users/types';

const NavBar = () => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const dispatch = useDispatch();
  const users = useSelector((state: { users: UsersState }) => state.users);
  const cartItems = useSelector((state: { cart: CartState }) => state.cart.cart?.lineItems);
  const isIndexPage = router.pathname === '/';
  const [isSticky, setSticky] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showAccount, setShowAccount] = useState(false);
  const guestMenu = [
    { text: t('login'), path: '/login' },
    { text: t('register'), path: '/register', className: 'text-brand' },
  ];
  const ref = useRef<HTMLInputElement>(null);
  const handleScroll = () => {
    if (ref && ref.current) {
      setSticky(ref.current.getBoundingClientRect().top < -80);
    }
  };
  useEffect(() => {
    const { user } = users;
    if (user && user.cart) {
      dispatch(actions.thunkLoadCart(user.cart.checkout_id));
    } else if (!user && localStorage.getItem('cart')) {
      dispatch(actions.thunkLoadCart(JSON.parse(localStorage.getItem('cart') as any).id, true));
    }
    document.body.classList.remove('overlay-active');

    if (!isIndexPage) return;
    window.addEventListener('scroll', handleScroll, detectIt.passiveEvents ? { passive: true } : false);
    return () => {
      window.removeEventListener('scroll', () => handleScroll);
    };
  }, []);

  const stickyClassName = () => {
    return isSticky ? 'c-nav-bar--sticky' : '';
  };

  const cartNotEmpty = !!cartItems && cartItems.length > 0;

  const toggleShow = (state, action) => {
    action(state);
    if (state) {
      document.body.classList.add('overlay-active');
    } else {
      document.body.classList.remove('overlay-active');
    }
  };

  const logout = () => {
    dispatch(actions.thunkLogout());
    toggleShow(false, setShowAccount);
  };

  const userFullName = users?.user?.name;
  const userName = userFullName ? userFullName.split(' ')[0] : t('account');

  return (
    <div className={`relative z-50 ${showCart || showAccount ? 'bg-white' : ''}`}>
      <div className={stickyClassName()} ref={ref}>
        <div className="c-nav-bar">
          <div className="u-container u-container__spread">
            <Link href="/">
              <a className="c-nav-bar__logo">
                {/* <img src={`/static/images/logo${isSticky || !isIndexPage ? '' : '-black'}.png`} alt="logo" /> */}
                <img src={`/static/images/logo.png`} alt="logo" />
              </a>
            </Link>
            <div className="c-nav-bar__menu">
              <TranslationToggle isSticky={isSticky} />
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
              {users.isLoggedIn ? (
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
            ${isIndexPage ? '' : 'background: white; top: 0;'}
            @apply flex z-50 w-full;
            height: 80px;
            position: ${isIndexPage ? 'absolute' : 'fixed'};
            box-shadow: ${isIndexPage ? 'none' : '0px 2px 8px rgba(0, 0, 0, 0.08)'};

            .c-nav-bar--sticky & {
              @apply fixed inset-x-0 top-0 bg-white;
            }

            &__logo {
              img {
                width: 53.67px;
              }
            }

            &__menu {
              @apply flex h-full items-center text-xs text-dark-grey;
              &__item {
                @apply flex cursor-pointer items-center px-6 py-3 font-semibold;
              }
              &__icon {
                @apply mr-3;
                font-size: 16px;
              }
              &__cart,
              &__account {
                @apply relative flex h-full items-center;

                &__button {
                  @apply mx-6 cursor-pointer justify-center;
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

export default NavBar;
