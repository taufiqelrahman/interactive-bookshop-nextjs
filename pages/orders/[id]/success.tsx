import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from 'lib/with-redux-store';
import { withTranslation, Link } from 'i18n';
import Card from 'components/atoms/Card';
import DefaultLayout from 'components/layouts/Default';
import Button from 'components/atoms/Button';
import NavBar from 'components/organisms/NavBar/mobile';
import Head from 'next/head';
import { useRouter } from 'next/router';
import actions from 'store/actions';
import api from 'services/api';
import { formatPayment } from 'lib/format-payment';

const OrderSuccess = (props: any): any => {
  const router = useRouter();
  const { id } = router.query;
  const screenHeight = '100vh - 59px';
  const Wrapper: any = props.isMobile ? 'div' : Card;
  const { isLoggedIn } = props.state.users;
  return (
    <DefaultLayout {...props} navbar={props.isMobile && <NavBar title={props.t('checkout')} />}>
      <Head>
        <title>When I Grow Up | {props.t('checkout')}</title>
      </Head>
      <div className="u-container" style={props.isMobile ? {} : { padding: '61px 0 ' }}>
        <div className="c-success">
          <Wrapper variant="border">
            <div className="c-success__container" style={props.isMobile ? { height: `calc(${screenHeight})` } : {}}>
              <div>
                <img alt="success" className="c-success__image" src="/static/images/success.png" />
                <h1 className="c-success__title">
                  {props.paymentProblem ? props.t('payment-problem') : props.t('order-success')}
                </h1>
                <div className="c-success__subtitle">
                  {props.paymentProblem
                    ? props.t('payment-problem-content')
                    : isLoggedIn
                    ? props.t('order-success-content')
                    : props.t('order-success-content-guest')}
                </div>
              </div>
              <div className="c-success__actions">
                <Link href={props.paymentProblem ? '/create' : `/orders/${id}`}>
                  <a>
                    <Button type="submit" width="397px" style={{ margin: '18px 0' }}>
                      {props.paymentProblem ? props.t('create-another') : props.t('go-to-orders')}
                    </Button>
                  </a>
                </Link>
                <Link href="/">
                  <a className="c-success__link">{props.t('back-to-home')}</a>
                </Link>
              </div>
            </div>
          </Wrapper>
        </div>
      </div>
      <style jsx>{`
        .c-success {
          @apply mx-auto w-full;
          &__container {
            @apply text-center flex flex-col justify-between;
            padding: 29px 0 14px;
            @screen md {
              padding: 42px;
            }
          }
          &__image {
            @apply mx-auto;
            margin-top: 12px;
            margin-bottom: 24px;
          }
          &__title {
            @apply font-semibold;
            font-size: 20px;
            line-height: 30px;
            margin: 12px 0;
            @screen md {
              @apply font-bold;
              font-size: 28px;
              line-height: 42px;
            }
          }
          &__subtitle {
            @apply font-opensans mx-auto text-sm;
            line-height: 20px;
            max-width: 540px;
            @screen md {
              @apply text-base;
              line-height: 22px;
            }
          }
          &__link {
            @apply font-semibold cursor-pointer;
            color: #445ca4;
            span {
              @apply font-normal;
            }
          }
        }
      `}</style>
    </DefaultLayout>
  );
};

OrderSuccess.getInitialProps = async (ctx: any): Promise<any> => {
  let paymentProblem = false;
  try {
    ctx.reduxStore.dispatch(actions.loadOrder(true));
    if (!ctx.req) return;
    const userCookie = ctx.req.headers.cookie.split(';').filter(cookie => cookie.includes('user='));
    let orderData;
    if (userCookie.length > 0) {
      ({ data: orderData } = await api(ctx.req).orders.loadOrder(ctx.query.id));
    } else {
      ({ data: orderData } = await api().orders.loadOrderGuest(ctx.query.id));
    }
    const { order, state, payment } = orderData.data;
    order.state = state.name;
    order.payment = payment ? formatPayment(payment) : null;
    ctx.reduxStore.dispatch(actions.loadOrder(false, order));
    if (!payment) paymentProblem = true;
  } catch (err) {
    console.log(err.message);
    if (!ctx.res) return;
    ctx.res.writeHead(302, {
      Location: '/',
    });
    ctx.res.end();
  }
  return { namespacesRequired: ['common'], paymentProblem };
};

export default withTranslation('common')(connect(mapStateToProps, mapDispatchToProps)(OrderSuccess));
