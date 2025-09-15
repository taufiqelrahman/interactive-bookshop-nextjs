import cookies from 'next-cookies';

import OrderDetailDesktop from 'components/organisms/OrderDetail/desktop';
import OrderDetailMobile from 'components/organisms/OrderDetail/mobile';
import { formatPayment } from 'lib/format-payment';
import api from 'services/api';
import { wrapper } from 'store';
import actions from 'store/actions';

interface OrderDetailProps {
  isMobile?: boolean;
  [key: string]: unknown;
}

const OrderDetail: React.FC<OrderDetailProps> = (props) => {
  if (props.isMobile) {
    return <OrderDetailMobile {...props} />;
  } else {
    return <OrderDetailDesktop {...props} />;
  }
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {
  try {
    store.dispatch(actions.loadOrder(true));
    let orderData;
    if (cookies(ctx).user) {
      ({ data: orderData } = await api(ctx.req).orders.loadOrder(ctx.query.id));
    } else {
      ({ data: orderData } = await api().orders.loadOrderGuest(ctx.query.id));
    }
    const { order, state, payment } = orderData.data;
    order.state = state.name;
    order.payment = payment ? formatPayment(payment) : null;
    store.dispatch(actions.loadOrder(false, order));
  } catch (err: unknown) {
    if (err && typeof err === 'object' && 'message' in err) {
      console.log((err as { message: string }).message);
    } else {
      console.log(err);
    }
    if (!ctx.res) return;
    return {
      redirect: {
        destination: '/login?from=orders',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
});

export default OrderDetail;
