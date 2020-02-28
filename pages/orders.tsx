import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from 'lib/with-redux-store';
import { withTranslation, Link } from 'i18n';
import DefaultLayout from 'components/layouts/Default';
import Stepper from 'components/atoms/Stepper';
import OrderItem from 'components/molecules/OrderItem';
import dummyOrders from '_mocks/orders';

const Orders = (props: any): any => {
  return (
    <DefaultLayout {...props}>
      <div className="u-container u-container__page">
        <Stepper title={props.t('my-orders')} />
        <div className="c-orders-section">
          <div className="c-orders-section__left">
            {dummyOrders &&
              dummyOrders.map(item => (
                <Link key={item.id} href={`/orders/${item.id}`}>
                  <a>
                    <OrderItem key={item.id} {...item} style={{ marginBottom: 12 }} />
                  </a>
                </Link>
              ))}
          </div>
        </div>
      </div>
      <style jsx>{`
        .c-orders-section {
          @apply flex w-full;
          padding: 31px 0;
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

export default withTranslation('page-orders')(connect(mapStateToProps, mapDispatchToProps)(Orders));
