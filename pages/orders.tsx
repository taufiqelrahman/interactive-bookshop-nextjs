import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from 'lib/with-redux-store';
import { withTranslation, Link } from 'i18n';
import DefaultLayout from 'components/layouts/Default';
import Stepper from 'components/atoms/Stepper';
import OrderItem from 'components/molecules/OrderItem/desktop';
import OrderItemMobile from 'components/molecules/OrderItem/mobile';
// import dummyOrders from '_mocks/orders';
import NavBar from 'components/organisms/NavBar/mobile';
import actions from 'store/actions';
import api from 'services/api';
import Head from 'next/head';
import Button from 'components/atoms/Button';
import Footer from 'components/organisms/Footer';

const Orders = (props: any): any => {
  const { orders } = props.state;
  const orderList = orders.isFetching ? [1, 2] : orders.orders;
  // const orderList = dummyOrders;
  return (
    <DefaultLayout
      {...props}
      navbar={props.isMobile && <NavBar setSideNav={props.setSideNav} menuAction={true} title={props.t('my-orders')} />}
    >
      <Head>
        <title>When I Grow Up | {props.t('my-orders')}</title>
      </Head>
      <div className={`u-container ${props.isMobile ? 'bg-light-grey' : 'u-container__page'}`}>
        {!props.isMobile && <Stepper title={props.t('my-orders')} />}
        <div className="c-orders-section">
          <div className="c-orders-section__left">
            {orderList.length > 0 ? (
              orderList.map(item => (
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
                <div className="c-orders__empty__title">{props.t('orders-empty-title')}</div>
                <div className="c-orders__empty__subtitle">{props.t('orders-empty-subtitle')}</div>
                <Link href="/create">
                  <a>
                    <Button className={props.isMobile ? 'w-full' : ''}>{props.t('orders-empty-cta')}</Button>
                  </a>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      {props.isMobile && <Footer isMobile={props.isMobile} />}
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
            @apply m-auto text-center pb-12 flex flex-col justify-center items-center;
            width: 85vw;
            @screen md {
              width: 35vw;
            }
            &__title {
              @apply text-xl font-semibold mt-2 mb-5;
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

Orders.getInitialProps = async (ctx: any): Promise<any> => {
  try {
    ctx.reduxStore.dispatch(actions.loadOrders(true));
    const { data: orderData } = await api(ctx.req).orders.loadOrders();
    const { order_states: orderStates, orders: rawOrders } = orderData.data;
    const states = orderStates.reduce((acc, cur) => {
      acc[cur.shopify_order_id] = cur.state.name;
      return acc;
    }, {});
    const orders = rawOrders.map(order => ({ ...order, state: states[order.id] }));
    ctx.reduxStore.dispatch(actions.loadOrders(false, orders));
  } catch (err) {
    console.log(err.message);
  }
  return { namespacesRequired: ['page-orders'] };
};

export default withTranslation('page-orders')(connect(mapStateToProps, mapDispatchToProps)(Orders));
