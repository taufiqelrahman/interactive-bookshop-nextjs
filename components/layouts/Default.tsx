import NavBar from 'components/organisms/NavBar';
import Footer from 'components/organisms/Footer';

const Default = (Page) => {
  const DefaultLayout = (props) => (
    <div>
      <div style={{ height: 1 }}></div>
      <NavBar />
      <div style={{ minHeight: 1000 }}>
        <Page {...props} />
      </div>
      <Footer />
    </div>
  )
  return DefaultLayout;
};

export default Default;