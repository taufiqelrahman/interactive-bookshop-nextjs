import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from 'lib/with-redux-store';
import OrderDetailMobile from 'components/organisms/OrderDetail/mobile';
import OrderDetailDesktop from 'components/organisms/OrderDetail/desktop';
import actions from 'store/actions';
import api from 'services/api';
import { formatPayment } from 'lib/format-payment';

const OrderDetail = (props: any): any => {
  if (props.isMobile) {
    return <OrderDetailMobile {...props} />;
  } else {
    return <OrderDetailDesktop {...props} />;
  }
};

OrderDetail.getInitialProps = async (ctx: any): Promise<any> => {
  try {
    ctx.reduxStore.dispatch(actions.loadOrder(true));
    const userCookie = ctx.req.headers.cookie.split(';').filter(cookie => cookie.includes('user='));
    let orderData;
    if (userCookie.length > 0) {
      ({ data: orderData } = await api(ctx.req).orders.loadOrder(ctx.query.id));
    } else {
      ({ data: orderData } = await api().orders.loadOrderGuest(ctx.query.id));
    }
    const { order, state, payment } = orderData.data;
    order.state = state.name;
    order.payment = formatPayment(payment);
    ctx.reduxStore.dispatch(actions.loadOrder(false, order));
  } catch (err) {
    console.log(err.message);
    ctx.res.writeHead(302, {
      Location: '/login?from=orders',
    });
    ctx.res.end();
  }
  return { namespacesRequired: ['page-orders'] };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetail);
