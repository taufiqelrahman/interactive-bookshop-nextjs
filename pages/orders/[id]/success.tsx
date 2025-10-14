import dynamic from 'next/dynamic';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import cookies from 'next-cookies';
import { useTranslation } from 'next-i18next';
import { useSelector } from 'react-redux';

import DefaultLayout from 'components/layouts/Default';
import NavBar from 'components/organisms/NavBar/mobile';
import { formatPayment } from 'lib/format-payment';
import api from 'services/api';
import { RootState, wrapper } from 'store';
import { loadOrder, setPaymentProblem } from 'store/orders/reducers';

const Card = dynamic(() => import('components/atoms/Card'));
const Button = dynamic(() => import('components/atoms/Button'));

interface OrderSuccessProps {
  isMobile?: boolean;
  [key: string]: unknown;
}

const OrderSuccess: React.FC<OrderSuccessProps> = (props) => {
  const { t } = useTranslation('common');
  const users = useSelector((state: RootState) => state.users);
  const { isLoggedIn } = users;
  const orders = useSelector((state: RootState) => state.orders);
  const { paymentProblem } = orders;
  const router = useRouter();
  const { id } = router.query;
  const screenHeight = '100vh - 59px';
  const Wrapper: any = props.isMobile ? 'div' : Card;
  return (
    <DefaultLayout {...props} navbar={props.isMobile && <NavBar title={t('checkout')} />}>
      <Head>
        <title>Interactive Bookshop Next.js | {t('checkout')}</title>
      </Head>
      <div className="u-container" style={props.isMobile ? {} : { padding: '61px 0 ' }}>
        <div className="c-success">
          <Wrapper variant="border">
            <div className="c-success__container" style={props.isMobile ? { height: `calc(${screenHeight})` } : {}}>
              <div>
                {/* <img alt="success" className="c-success__image" src="/static/images/success.png" /> */}
                <img alt="success" className="c-success__image" src="/static/images/old_man.gif" />
                <h1 className="c-success__title">{paymentProblem ? t('payment-problem') : t('order-success')}</h1>
                <div className="c-success__subtitle">
                  {paymentProblem
                    ? t('payment-problem-content')
                    : isLoggedIn
                      ? t('order-success-content')
                      : t('order-success-content-guest')}
                </div>
              </div>
              <div className="c-success__actions">
                <Link href={paymentProblem ? '/create' : `/orders/${id}`}>
                  <a>
                    <Button type="submit" width="397px" style={{ margin: '18px 0' }}>
                      {paymentProblem ? t('create-another') : t('go-to-orders')}
                    </Button>
                  </a>
                </Link>
                <Link href="/">
                  <a className="c-success__link">{t('back-to-home')}</a>
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
            @apply flex flex-col justify-between text-center;
            padding: 29px 0 14px;
            @screen md {
              padding: 42px;
            }
          }
          &__image {
            @apply mx-auto;
            width: 160px;
            margin-top: 12px;
            margin-bottom: 24px;
            @screen md {
              width: 220px;
            }
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
            @apply mx-auto font-opensans text-sm;
            line-height: 20px;
            max-width: 540px;
            @screen md {
              @apply text-base;
              line-height: 22px;
            }
          }
          &__link {
            @apply cursor-pointer font-semibold;
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

export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {
  try {
    store.dispatch(loadOrder({ isFetching: true, payload: null }));
    let orderData;
    if (cookies(ctx).user) {
      ({ data: orderData } = await api(ctx.req).orders.loadOrder(ctx.query.id as string));
    } else {
      ({ data: orderData } = await api().orders.loadOrderGuest(ctx.query.id));
    }
    const { order, state, payment } = orderData.data;
    order.state = state.name;
    order.payment = payment ? formatPayment(payment) : null;
    store.dispatch(loadOrder({ isFetching: false, payload: order }));
    let paymentProblem = false;
    if (!payment) paymentProblem = true;
    store.dispatch(setPaymentProblem(paymentProblem));
  } catch (err: any) {
    console.log(err.message);
    if (!ctx.res) return;

    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
});

export default OrderSuccess;
