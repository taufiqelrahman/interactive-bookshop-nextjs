import dynamic from 'next/dynamic';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { useSelector } from 'react-redux';

import DefaultLayout from 'components/layouts/Default';
import NavBar from 'components/organisms/NavBar/mobile';
import api from 'services/api';
import { wrapper, RootState } from 'store';
import { loadOrders } from 'store/orders/reducers';
import { Order } from 'store/orders/types';

const Stepper = dynamic(() => import('components/atoms/Stepper'));
const OrderItem = dynamic(() => import('components/molecules/OrderItem'));
const Button = dynamic(() => import('components/atoms/Button'));
const Footer = dynamic(() => import('components/organisms/Footer'));

interface OrdersProps {
  isMobile?: boolean;
  setSideNav?: (open: boolean) => void;
  [key: string]: unknown;
}

const Orders: React.FC<OrdersProps> = (props) => {
  const { t } = useTranslation('page-orders');
  const orders = useSelector((state: RootState) => state.orders);
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
              orderList.map((item: any) => (
                <Link key={item.id || item} href={item.id ? `/orders/${item.name.replace('#', '')}` : ''}>
                  <a>
                    <OrderItem {...item} style={{ marginBottom: 12 }} isSkeleton={orders.isFetching} />
                  </a>
                </Link>
              ))
            ) : (
              <div className="c-order-list__empty">
                <Image
                  src={`/static/images/empty-asset${props.isMobile ? '-sm' : ''}.png`}
                  alt="empty"
                  width={props.isMobile ? 250 : 400}
                  height={props.isMobile ? 250 : 400}
                />
                <div className="c-order-list__empty__title">{t('order-empty-title')}</div>
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
    store.dispatch(loadOrders({ isFetching: true, payload: [] }));
    const { data: orderData } = await api().orders.loadOrders();
    const { order_states: orderStates, orders: rawOrders } = orderData.data;
    const statesDict = orderStates.reduce((acc: any, cur: any) => {
      acc[cur.shopify_order_id] = cur.state.name;
      return acc;
    }, {});
    const orders: Order[] = rawOrders.map((order) => ({ ...order, state: statesDict[order.id] }));
    store.dispatch(loadOrders({ isFetching: false, payload: orders }));
  } catch (err: unknown) {
    console.log((err as { message: string }).message);
  }

  return {
    props: {},
  };
});

export default Orders;
