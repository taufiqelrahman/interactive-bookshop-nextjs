import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { twMerge } from 'tailwind-merge';

import Floating from 'components/atoms/Floating';
import Footer from 'components/organisms/Footer';
import NavBar from 'components/organisms/NavBar/desktop';
import SideNav from 'components/organisms/SideNav';

import styles from './Default.module.scss';

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
    const { users, cart } = props.state;
    if (!window.fbq) return;
    window.fbq('track', 'ViewContent', {
      cartItems: cart.cart && cart.cart.lineItems.length,
      isLoggedIn: users.isLoggedIn,
      path: router.pathname,
    });
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        className={twMerge(
          `${styles['c-layout']} mt-[var(--dynamic-margin-top)]`,
          props.isMobile || isIndexPage ? '' : 'h-min-screen bg-light-grey',
          isIndexPage ? 'md:mt-0' : 'md:mt-[80px]',
        )}
        style={{ ...props.style, marginTop: `${navbarHeight}px` } as React.CSSProperties}
      >
        <ToastContainer
          className={styles['c-toast__container']}
          toastClassName={styles['c-toast__toast']}
          position={toast.POSITION.TOP_CENTER}
          hideProgressBar={true}
          // autoClose={false}
        />
        {props.children}
      </div>
      {!props.isMobile && <Footer />}
      <div className={styles['c-overlay']} onClick={hideOverlay}></div>
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
    </div>
  );
};

export default DefaultLayout;
