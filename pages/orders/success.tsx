import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from 'lib/with-redux-store';
import { withTranslation, Link } from 'i18n';
import Card from 'components/atoms/Card';
import DefaultLayout from 'components/layouts/Default';
import Button from 'components/atoms/Button';

const OrderSuccess = (props: any): any => {
  return (
    <DefaultLayout {...props}>
      <div className="bg-light-grey h-min-screen" style={{ paddingTop: 61 }}>
        <div className="u-container">
          <div className="c-login">
            <Card variant="border">
              <div className="c-login__container">
                <img className="c-login__image" src="/static/images/welcome.png" />
                <h1 className="c-login__title">{props.t('order-success')}</h1>
                <div className="c-login__subtitle">{props.t('order-success-content')}</div>
                <Link href="/orders">
                  <a>
                    <Button type="submit" width="397px" style={{ margin: '18px 0' }}>
                      {props.t('go-to-orders')}
                    </Button>
                  </a>
                </Link>
                <Link href="/">
                  <a className="c-login__link">{props.t('back-to-home')}</a>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </div>
      <style jsx>{`
        .c-login {
          @apply mx-auto w-full;
          &__container {
            padding: 42px;
            text-align: center;
          }
          &__image {
            @apply mx-auto;
            margin-top: 12px;
            margin-bottom: 24px;
          }
          &__title {
            @apply font-bold;
            font-size: 28px;
            line-height: 42px;
            margin: 12px 0;
          }
          &__subtitle {
            @apply font-opensans mx-auto;
            line-height: 22px;
            max-width: 540px;
          }
        }
      `}</style>
    </DefaultLayout>
  );
};

export default withTranslation('common')(connect(mapStateToProps, mapDispatchToProps)(OrderSuccess));
