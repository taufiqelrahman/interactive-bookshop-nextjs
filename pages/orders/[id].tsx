import { connect } from 'react-redux';
import { Router } from 'i18n';
import { mapStateToProps, mapDispatchToProps } from 'lib/with-redux-store';
import OrderDetailMobile from 'components/organisms/OrderDetail/mobile';
import OrderDetailDesktop from 'components/organisms/OrderDetail/desktop';
import actions from 'store/actions';
import api from 'services/api';
import { formatPayment } from 'lib/format-payment';
import cookies from 'next-cookies';

const OrderDetail = (props: any) => {
  if (props.isMobile) {
    return <OrderDetailMobile {...props} />;
  } else {
    return <OrderDetailDesktop {...props} />;
  }
};

OrderDetail.getInitialProps = async (ctx: any): Promise<any> => {
  try {
    ctx.reduxStore.dispatch(actions.loadOrder(true));
    let orderData;
    if (cookies(ctx).user) {
      ({ data: orderData } = await api(ctx.req).orders.loadOrder(ctx.query.id));
    } else {
      ({ data: orderData } = await api().orders.loadOrderGuest(ctx.query.id));
    }
    const { order, state, payment } = orderData.data;
    order.state = state.name;
    order.payment = payment ? formatPayment(payment) : null;
    ctx.reduxStore.dispatch(actions.loadOrder(false, order));
  } catch (err) {
    console.log(err.message);
    if (ctx.res) {
      // server side
      ctx.res.writeHead(302, {
        Location: '/login?from=orders',
      });
      ctx.res.end();
    } else {
      // client side
      Router.push('/login?from=orders');
    }
  }
  return { namespacesRequired: ['page-orders'] };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetail);
