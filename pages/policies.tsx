import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from 'lib/with-redux-store';
import { withTranslation } from 'i18n';
import DefaultLayout from 'components/layouts/Default';
import Stepper from 'components/atoms/Stepper';
import NavBar from 'components/organisms/NavBar/mobile';
import Head from 'next/head';
import Footer from 'components/organisms/Footer';

const Policies = (props: any): any => {
  return (
    <DefaultLayout
      {...props}
      navbar={props.isMobile && <NavBar setSideNav={props.setSideNav} menuAction={true} title={props.t('policies')} />}
    >
      <Head>
        <title>When I Grow Up | {props.t('policies')}</title>
      </Head>
      <div className={`u-container__page ${props.isMobile ? 'pt-0' : 'u-container pb-0'}`}>
        {!props.isMobile && <Stepper title={props.t('policies')} />}
        <div className="c-policies">policies</div>
      </div>
      {props.isMobile && <Footer isMobile={props.isMobile} />}
      <style jsx>{`
        .c-policies {
          @apply mb-5 p-6;
          @screen md {
            @apply mb-10 p-0;
          }
        }
      `}</style>
    </DefaultLayout>
  );
};

export default withTranslation('common')(connect(mapStateToProps, mapDispatchToProps)(Policies));
