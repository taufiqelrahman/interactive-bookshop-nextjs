import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from 'lib/with-redux-store';
import OrderDetailMobile from 'components/organisms/OrderDetail/mobile';
import OrderDetailDesktop from 'components/organisms/OrderDetail/desktop';

const OrderDetail = (props: any): any => {
  if (props.isMobile) {
    return <OrderDetailMobile {...props} />;
  } else {
    return <OrderDetailDesktop {...props} />;
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetail);
