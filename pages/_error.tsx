import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';

import DefaultLayout from 'components/layouts/Default';
import NavBar from 'components/organisms/NavBar/mobile';
import { withTranslation, Link } from 'i18n';
import { mapStateToProps, mapDispatchToProps } from 'lib/with-redux-store';

const Button = dynamic(() => import('components/atoms/Button'));
const Footer = dynamic(() => import('components/organisms/Footer'));

const Error: NextPage<any> = (props: any) => {
  const router = useRouter();
  const isIndexPage = router.pathname === '/';
  const title = () => {
    if (!props.statusCode) return props.t('whoops');
    return props.statusCode;
  };
  const message = () => {
    switch (props.statusCode) {
      case 404:
        return props.t('error-message-404');
      case 500:
        return props.t('error-message-500');
      default:
        return props.t('error-message-general');
    }
  };
  return (
    <DefaultLayout
      {...props}
      navbar={props.isMobile && <NavBar setSideNav={props.setSideNav} menuAction={true} />}
      style={{ display: 'flex' }}
    >
      <Head>
        <title>When I Grow Up | {title()}</title>
      </Head>
      <div className="w-full">
        <div className="relative">
          <div className="c-error">
            <div className="c-error__title">{title()}</div>
            <div className="c-error__message">{message()}</div>
            <Link href="/">
              <a style={props.isMobile ? { width: '100%' } : {}}>
                <Button width={props.isMobile ? '100%' : null}>{props.t('back-to-home')}</Button>
              </a>
            </Link>
          </div>
          <img
            alt="blue planet"
            src="/static/images/blue-planet.png"
            className="c-error__planet c-error__planet--blue"
          />
          <img alt="red planet" src="/static/images/red-planet.png" className="c-error__planet c-error__planet--red" />
        </div>
        {props.isMobile && <Footer isMobile={props.isMobile} />}
      </div>
      <style jsx>{`
        .c-error {
          @apply flex flex-grow flex-col items-center justify-center overflow-hidden bg-cover px-4 text-white;
          background:
            url('/static/images/stars-bg.png') no-repeat center center fixed,
            linear-gradient(180deg, #0b094e 0%, #171763 100%);
          min-height: calc(100vh - 59px);
          @screen md {
            min-height: ${isIndexPage ? '100vh' : 'calc(100vh - 80px)'};
          }
          &__title {
            @apply font-semibold;
            font-size: 80px;
            line-height: 120px;
            @screen md {
              font-size: 150px;
              line-height: 225px;
            }
          }
          &__message {
            @apply mb-4 text-center text-sm;
            line-height: 1.3rem;
            @screen md {
              @apply mb-6 text-lg;
            }
          }
          &__planet {
            @apply absolute;
            &--blue {
              width: 199px;
              left: -100px;
              top: 10%;
              @screen md {
                width: 270px;
                left: 5%;
              }
            }
            &--red {
              width: 121px;
              right: -60px;
              bottom: 10%;
              @screen md {
                width: 159px;
                right: 5%;
                bottom: 5%;
              }
            }
          }
        }
      `}</style>
    </DefaultLayout>
  );
};

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return {
    statusCode,
    namespacesRequired: [],
  };
};

export default withTranslation('common')(connect(mapStateToProps, mapDispatchToProps)(Error));
