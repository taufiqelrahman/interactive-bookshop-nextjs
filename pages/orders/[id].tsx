import cookies from 'next-cookies';

import OrderDetailDesktop from 'components/organisms/OrderDetail/desktop';
import OrderDetailMobile from 'components/organisms/OrderDetail/mobile';
import { formatPayment } from 'lib/format-payment';
import api from 'services/api';
import { OrderResponse } from 'services/api/orders';
import { wrapper } from 'store';
import { loadOrder } from 'store/orders/reducers';

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
    store.dispatch(loadOrder({ isFetching: true, payload: null }));
    let orderData: OrderResponse;
    if (cookies(ctx).user) {
      const data = await api(ctx.req).orders.loadOrder(ctx.query.id as string);
      orderData = data.data;
    } else {
      const data = await api().orders.loadOrderGuest(ctx.query.id);
      orderData = data.data;
    }
    const { order, state, payment } = orderData.data;
    order.state = state?.name;
    order.payment = payment ? formatPayment(payment) : undefined;
    store.dispatch(loadOrder({ isFetching: false, payload: order }));
  } catch (err: unknown) {
    if (err && typeof err === 'object' && 'message' in err) {
      console.log((err as { message: string }).message);
    } else {
      console.log(err);
    }
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
