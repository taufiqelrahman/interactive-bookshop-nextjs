import NavBar from 'components/organisms/NavBar';
import Footer from 'components/organisms/Footer';

const DefaultLayout = (props: any) => (
  <div>
    <div style={{ height: 1 }}></div>
    <NavBar isLoggedIn={props.isLoggedIn} cart={props.cart} />
    <div style={{ minHeight: 1000 }}>{props.children}</div>
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
    `}</style>
  </div>
);

export default DefaultLayout;
