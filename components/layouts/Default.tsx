import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Footer from 'components/organisms/Footer';
import NavBar from 'components/organisms/NavBar/desktop';
import SideNav from 'components/organisms/SideNav';
import Floating from 'components/atoms/Floating';

const DefaultLayout = (props: any) => {
  const [navbarHeight, setNavbarHeight] = useState(60);
  const router = useRouter();
  const isIndexPage = router.pathname === '/';
  const showWhatsapp = ['/', '/login', '/register', '/help', '/account'].includes(router.pathname);
  const hideSideNav = () => {
    props.setSideNav(false);
  };
  const hideOverlay = () => {
    if (!props.isMobile) return;
    if (props.state.default.isSideNavOpen) hideSideNav();
  };
  useEffect(() => {
    // reset overlay
    hideSideNav();
    // set top margin for fixed navbar
    const navbarDiv: any = document.querySelector('.c-nav-bar');
    setNavbarHeight(navbarDiv.clientHeight);
  }, []);
  useEffect(() => {
    // show toast for errors
    const { errorMessage } = props.state.default;
    if (errorMessage) {
      toast.error(errorMessage);
      setTimeout(() => {
        props.setErrorMessage('');
      }, 5000);
    }
  }, [props.state.default.errorMessage]);

  return (
    <div>
      {props.navbar || (
        <NavBar
          users={props.state.users}
          cartItems={props.state.cart.cart && props.state.cart.cart.lineItems}
          thunkLogout={props.thunkLogout}
          thunkLoadCart={props.thunkLoadCart}
        />
      )}
      {props.isMobile && (
        <SideNav
          isOpen={props.state.default.isSideNavOpen}
          hide={hideSideNav}
          users={props.state.users}
          thunkLogout={props.thunkLogout}
        />
      )}
      <div
        className={`c-layout ${props.isMobile || isIndexPage ? '' : 'h-min-screen bg-light-grey'}`}
        style={props.style}
      >
        <ToastContainer
          className="c-toast__container"
          toastClassName="c-toast__toast"
          position={toast.POSITION.TOP_CENTER}
          hideProgressBar={true}
          // autoClose={false}
        />
        {props.children}
      </div>
      {!props.isMobile && <Footer />}
      <div className="c-overlay" onClick={hideOverlay}></div>
      {showWhatsapp && (
        <a
          href="https://wa.me/6285747977740?text=Saya%20tertarik%20mengenai%20buku%20When%20I%20Grow%20Up"
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
            @apply fixed top-0 left-0 w-full h-full z-40;
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
