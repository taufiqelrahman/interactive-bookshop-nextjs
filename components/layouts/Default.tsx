import NavBar from 'components/organisms/NavBar';
import Footer from 'components/organisms/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DefaultLayout = (props: any) => (
  <div>
    <div style={{ height: 1 }}></div>
    <NavBar isLoggedIn={props.isLoggedIn} cart={props.cart} />
    <div style={{ minHeight: 1000, position: 'relative' }}>
      <ToastContainer
        className="c-toast__container"
        toastClassName="c-toast__toast"
        position={toast.POSITION.TOP_CENTER}
        hideProgressBar={true}
      />
      {props.children}
    </div>
    <Footer />
    <div className="c-overlay"></div>
    <style jsx>{`
      .c-overlay {
        @apply hidden;
      }
    `}</style>
    <style jsx global>{`
      .overlay-active .c-overlay {
        @apply fixed top-0 left-0 block w-full h-full z-40;
        background-color: rgba(51, 51, 51, 0.5);
      }
      .c-toast {
        &__container,
        &__toast {
          min-height: 44px !important;
          min-width: 480px !important;
        }
        &__container {
          top: 105px !important;
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

export default DefaultLayout;
