import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import Footer from 'components/organisms/Footer';
import NavBar from 'components/organisms/NavBar/desktop';
import SideNav from 'components/organisms/SideNav';

const DefaultLayout = (props: any) => {
  const [navbarHeight, setNavbarHeight] = useState(60);
  const router = useRouter();
  const isIndexPage = router.pathname === '/';
  const hideSideNav = () => {
    if (!props.isMobile) return;
    props.setSideNav(false);
    document.body.classList.remove('overlay-active');
  };
  useEffect(() => {
    // reset sidenav
    props.setSideNav(false);
    document.body.classList.remove('overlay-active');
    // set top margin for fixed navbar
    const navbarDiv: any = document.querySelector('.c-nav-bar');
    setNavbarHeight(navbarDiv.clientHeight);
  }, []);
  useEffect(() => {
    // show toast for errors
    const { errorMessage } = props.state.default;
    if (errorMessage) {
      toast.error(errorMessage);
    }
  }, [props.state.default.errorMessage]);

  return (
    <div>
      {props.navbar || (
        <NavBar isLoggedIn={props.state.users.isLoggedIn} cart={props.state.cart} thunkLogout={props.thunkLogout} />
      )}
      {props.isMobile && (
        <SideNav
          isOpen={props.state.default.isSideNavOpen}
          hide={hideSideNav}
          users={props.state.users}
          thunkLogout={props.thunkLogout}
        />
      )}
      <div className={`c-layout ${props.isMobile || isIndexPage ? '' : 'h-min-screen bg-light-grey'}`}>
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
      <div className="c-overlay" onClick={hideSideNav}></div>
      <style jsx>{`
        .c-overlay {
          @apply hidden;
        }
        .c-layout {
          @apply relative;
          margin-top: ${navbarHeight}px;
          @screen md {
            margin-top: ${isIndexPage ? 0 : '80px'};
          }
        }
      `}</style>
      <style jsx global>{`
        .c-overlay {
          .overlay-active & {
            @apply fixed top-0 left-0 block w-full h-full z-40;
            background-color: rgba(51, 51, 51, 0.8);
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
            @apply text-center font-poppins;
            box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.32);
            border-radius: 6px;
            background: #de3636 !important;
          }
        }
      `}</style>
    </div>
  );
};

export default DefaultLayout;
