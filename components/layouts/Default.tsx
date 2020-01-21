import NavBar from 'components/organisms/NavBar';
import Footer from 'components/organisms/Footer';

const DefaultLayout = (props) => (
  <div>
    <div style={{ height: 1 }}></div>
    <NavBar />
    <div style={{ minHeight: 1000 }}>
      {props.children}
    </div>
    <Footer />
  </div>
)

export default DefaultLayout;