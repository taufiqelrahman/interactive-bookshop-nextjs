import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from 'lib/with-redux-store';
import OrderDetailMobile from 'components/organisms/OrderDetail/mobile';
import OrderDetailDesktop from 'components/organisms/OrderDetail/desktop';
import actions from 'store/actions';
import api from 'services/api';

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
    const { data: orderData } = await api(ctx.req).orders.loadOrder(ctx.query.id);
    const { order, state } = orderData.data;
    order.state = state.name;
    ctx.reduxStore.dispatch(actions.loadOrder(false, order));
  } catch (err) {
    console.log(err.message);
  }
  return { namespacesRequired: ['page-orders'] };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetail);
