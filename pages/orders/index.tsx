import dynamic from 'next/dynamic';
import Head from 'next/head';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { useSelector } from 'react-redux';

import DefaultLayout from 'components/layouts/Default';
import NavBar from 'components/organisms/NavBar/mobile';
import api from 'services/api';
import { wrapper } from 'store';
import actions from 'store/actions';
import { Order } from 'store/orders/types';
// import dummyOrders from '_mocks/orders';

const Stepper = dynamic(() => import('components/atoms/Stepper'));
const OrderItem = dynamic(() => import('components/molecules/OrderItem/desktop'));
const OrderItemMobile = dynamic(() => import('components/molecules/OrderItem/mobile'));
const Button = dynamic(() => import('components/atoms/Button'));
const Footer = dynamic(() => import('components/organisms/Footer'));

const Orders = (props: any): any => {
  const { t } = useTranslation('page-orders');
  const orders = useSelector((state: any) => state.orders);
  const orderList = orders.isFetching ? [1, 2] : orders.orders;
  // const orderList = dummyOrders;
  return (
    <DefaultLayout
      {...props}
      navbar={props.isMobile && <NavBar setSideNav={props.setSideNav} menuAction={true} title={t('my-orders')} />}
    >
      <Head>
        <title>Interactive Bookshop Next.js | {t('my-orders')}</title>
      </Head>
      <div className={`u-container ${props.isMobile ? 'bg-light-grey' : 'u-container__page'}`}>
        {!props.isMobile && <Stepper title={t('my-orders')} />}
        <div className="c-orders-section">
          <div className="c-orders-section__left">
            {orderList.length > 0 ? (
              orderList.map((item) => (
                <Link key={item.id || item} href={item.id ? `/orders/${item.name.replace('#', '')}` : ''}>
                  <a>
                    {props.isMobile ? (
                      <OrderItemMobile {...item} style={{ marginBottom: 12 }} isSkeleton={orders.isFetching} />
                    ) : (
                      <OrderItem {...item} style={{ marginBottom: 12 }} isSkeleton={orders.isFetching} />
                    )}
                  </a>
                </Link>
              ))
            ) : (
              <div className="c-orders__empty">
                <img src={`/static/images/empty-asset${props.isMobile ? '-sm' : ''}.png`} alt="empty" />
                <div className="c-orders__empty__title">{t('orders-empty-title')}</div>
                <div className="c-orders__empty__subtitle">{t('orders-empty-subtitle')}</div>
                <Link href="/create">
                  <a>
                    <Button className={props.isMobile ? 'w-full' : ''}>{t('orders-empty-cta')}</Button>
                  </a>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      {props.isMobile && <Footer />}
      <style jsx>{`
        .c-orders-section {
          @apply flex w-full overflow-scroll;
          padding: 16px 0;
          @screen md {
            padding: 31px 0;
          }
          &__left {
            @apply w-full;
            @screen xl {
              @apply w-3/4;
            }
          }
        }
        .c-orders {
          &__empty {
            @apply m-auto flex flex-col items-center justify-center pb-12 text-center;
            width: 85vw;
            @screen md {
              width: 35vw;
            }
            &__title {
              @apply mb-5 mt-2 text-xl font-semibold;
            }
            &__subtitle {
              @apply mb-5 text-sm;
              line-height: 1.25rem;
              @screen md {
                @apply text-base;
                width: 35vw;
              }
            }
          }
        }
      `}</style>
    </DefaultLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
  try {
    store.dispatch(actions.loadOrders(true));
    const { data: orderData } = await api().orders.loadOrders();
    const { order_states: orderStates, orders: rawOrders } = orderData.data;
    const states = orderStates.reduce((acc, cur) => {
      acc[cur.shopify_order_id] = cur.state.name;
      return acc;
    }, {});
    const orders: Order[] = rawOrders.map((order) => ({ ...order, state: states[order.id] }));
    store.dispatch(actions.loadOrders(false, orders));
  } catch (err: any) {
    console.log(err.message);
  }

  return {
    props: {},
  };
});

export default Orders;
