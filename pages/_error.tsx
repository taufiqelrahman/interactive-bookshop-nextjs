import { NextPage } from 'next';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from 'lib/with-redux-store';
import { withTranslation, Link } from 'i18n';
import DefaultLayout from 'components/layouts/Default';
import NavBar from 'components/organisms/NavBar/mobile';
import Button from 'components/atoms/Button';

const Error: NextPage<any> = (props: any) => {
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
      <div className="c-error">
        <div className="c-error__title">{title()}</div>
        <div className="c-error__message">{message()}</div>
        <Link href="/">
          <Button style={props.isMobile ? { width: '100%' } : {}} width={props.isMobile ? '100%' : null}>
            {props.t('back-to-home')}
          </Button>
        </Link>
      </div>
      <img src="/static/images/blue-planet.png" className="c-error__planet c-error__planet--blue" />
      <img src="/static/images/red-planet.png" className="c-error__planet c-error__planet--red" />
      <style jsx>{`
        .c-error {
          @apply flex items-center justify-center flex-grow flex-col text-white bg-cover px-4 overflow-hidden;
          background: url('/static/images/stars-bg.png') no-repeat center center fixed,
            linear-gradient(180deg, #0b094e 0%, #171763 100%);
          min-height: calc(100vh - 59px);
          @screen md {
            min-height: calc(100vh - 80px);
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
            @apply text-sm mb-4;
            @screen md {
              @apply text-lg mb-6;
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
                top: 5%;
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
