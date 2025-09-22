import { useRouter } from 'next/router';
import React, { useEffect, useState, ReactNode, CSSProperties } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';

import Floating from 'components/atoms/Floating';
import Footer from 'components/organisms/Footer';
import NavBar from 'components/organisms/NavBar/desktop';
import SideNav from 'components/organisms/SideNav';
import actions from 'store/actions';
import { CartState } from 'store/cart/types';
import { State } from 'store/types';
import { UsersState } from 'store/users/types';

interface DefaultLayoutProps {
  children: ReactNode;
  navbar?: ReactNode;
  isMobile?: boolean;
  style?: CSSProperties;
}

const DefaultLayout = ({ children, navbar, isMobile, style }: DefaultLayoutProps) => {
  const [navbarHeight, setNavbarHeight] = useState(60);
  const router = useRouter();
  const isIndexPage = router.pathname === '/';
  const showWhatsapp = ['/', '/login', '/register', '/help', '/account'].includes(router.pathname);

  const dispatch = useDispatch();
  const users = useSelector((state: { users: UsersState }) => state.users);
  const cart = useSelector((state: { cart: CartState }) => state.cart);
  const { isSideNavOpen, errorMessage } = useSelector((state: { common: State }) => state.common);

  const hideSideNav = () => {
    dispatch(actions.setSideNav(false));
  };

  const hideOverlay = () => {
    if (!isMobile) return;
    if (isSideNavOpen) hideSideNav();
  };

  useEffect(() => {
    // reset overlay
    hideSideNav();
    // set top margin for fixed navbar
    const navbarDiv = document.querySelector('.c-nav-bar') as HTMLElement | null;
    if (navbarDiv) setNavbarHeight(navbarDiv.clientHeight);

    if (!window.fbq) return;
    window.fbq('track', 'ViewContent', {
      cartItems: cart.cart && cart.cart.lineItems.length,
      isLoggedIn: users.isLoggedIn,
      path: router.pathname,
    });
  }, []);

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
      setTimeout(() => {
        dispatch(actions.setErrorMessage(''));
      }, 5000);
    }
  }, [errorMessage]);

  return (
    <div>
      {navbar || <NavBar />}

      {isMobile && <SideNav isOpen={isSideNavOpen} hide={hideSideNav} users={users} />}

      <div className={`c-layout ${isMobile || isIndexPage ? '' : 'h-min-screen bg-light-grey'}`} style={style}>
        <ToastContainer
          className="c-toast__container"
          toastClassName="c-toast__toast"
          position={toast.POSITION.TOP_CENTER}
          hideProgressBar={true}
        />
        {children}
      </div>

      {!isMobile && <Footer />}
      <div className="c-overlay" onClick={hideOverlay}></div>

      {showWhatsapp && (
        <a
          href="https://wa.me/6287777717119?text=Saya%20tertarik%20mengenai%20buku%20When%20I%20Grow%20Up"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Floating color="green">
            <span className="icon-whatsapp" />
          </Floating>
        </a>
      )}

      <style jsx>{`
        .c-overlay {
          @apply opacity-0;
        }
        .c-layout {
          @apply relative overflow-hidden;
          margin-top: ${navbarHeight}px;
          @screen md {
            margin-top: ${isIndexPage ? 0 : '80px'};
          }
        }
      `}</style>
      <style jsx global>{`
        .c-overlay {
          .overlay-active & {
            @apply fixed left-0 top-0 z-40 h-full w-full;
            background-color: rgba(51, 51, 51, 0.8);
            opacity: 1 !important;
            transition: opacity 0.3s ease-in;
            @screen md {
              background-color: rgba(51, 51, 51, 0.5);
            }
          }
        }
        .c-toast {
          &__container,
          &__toast {
            min-height: 44px !important;
            @screen md {
              min-width: 480px !important;
            }
          }
          &__container {
            top: 64px !important;
            padding: 0 4px !important;
            @screen md {
              margin: 0 !important;
              top: 105px !important;
              transform: translateX(-50%) !important;
            }
          }
          &__toast {
            line-height: 24px;
            margin-bottom: 8px;
            @apply text-center font-poppins;
            box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.32);
            border-radius: 6px;
            &.Toastify__toast--success {
              background: #4aa8c6 !important;
            }
            &.Toastify__toast--error {
              background: #de3636 !important;
            }
          }
        }
      `}</style>
    </div>
  );
};

export default DefaultLayout;
