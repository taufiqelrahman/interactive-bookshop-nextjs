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

const Orders = (props: any): any => {
  const screenHeight = '100vh - 59px';
  const { orders } = props.state;
  const orderList = orders.isFetching ? [1, 2] : orders.orders;
  // const orderList = dummyOrders;
  return (
    <DefaultLayout
      {...props}
      navbar={props.isMobile && <NavBar setSideNav={props.setSideNav} menuAction={true} title={props.t('my-orders')} />}
    >
      <div className={`u-container ${props.isMobile ? 'bg-light-grey' : 'u-container__page'}`}>
        {!props.isMobile && <Stepper title={props.t('my-orders')} />}
        <div className="c-orders-section" style={props.isMobile ? { height: `calc(${screenHeight})` } : {}}>
          <div className="c-orders-section__left">
            {orderList.map(item => (
              <Link key={item.id || item} href={item.id ? `/orders/${item.id}` : ''}>
                <a>
                  {props.isMobile ? (
                    <OrderItemMobile {...item} style={{ marginBottom: 12 }} isSkeleton={orders.isFetching} />
                  ) : (
                    <OrderItem {...item} style={{ marginBottom: 12 }} isSkeleton={orders.isFetching} />
                  )}
                </a>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <style jsx>{`
        .c-orders-section {
          @apply flex w-full;
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
      `}</style>
    </DefaultLayout>
  );
};

Orders.getInitialProps = async (ctx: any): Promise<any> => {
  try {
    ctx.reduxStore.dispatch(actions.loadOrders(true));
    const { data: orders } = await api(ctx.req).orders.loadOrders();
    ctx.reduxStore.dispatch(actions.loadOrders(false, [...orders.data.orders, ...orders.data.checkouts]));
  } catch (err) {
    console.log(err.message);
  }
  return { namespacesRequired: ['page-orders'] };
};

export default withTranslation('page-orders')(connect(mapStateToProps, mapDispatchToProps)(Orders));
