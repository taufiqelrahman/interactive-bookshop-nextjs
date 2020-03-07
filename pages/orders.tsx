import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from 'lib/with-redux-store';
import { withTranslation, Link } from 'i18n';
import DefaultLayout from 'components/layouts/Default';
import Stepper from 'components/atoms/Stepper';
import OrderItem from 'components/molecules/OrderItem/desktop';
import OrderItemMobile from 'components/molecules/OrderItem/mobile';
import dummyOrders from '_mocks/orders';
import NavBar from 'components/organisms/NavBar/mobile';

const Orders = (props: any): any => {
  const screenHeight = '100vh - 59px';
  return (
    <DefaultLayout
      {...props}
      navbar={props.isMobile && <NavBar setSideNav={props.setSideNav} menuAction={true} title={props.t('my-orders')} />}
    >
      <div className={`u-container ${props.isMobile ? 'bg-light-grey' : 'u-container__page'}`}>
        {!props.isMobile && <Stepper title={props.t('my-orders')} />}
        <div className="c-orders-section" style={props.isMobile ? { height: `calc(${screenHeight})` } : {}}>
          <div className="c-orders-section__left">
            {dummyOrders &&
              dummyOrders.map(item => (
                <Link key={item.id} href={`/orders/${item.id}`}>
                  <a>
                    {props.isMobile ? (
                      <OrderItemMobile key={item.id} {...item} style={{ marginBottom: 12 }} />
                    ) : (
                      <OrderItem key={item.id} {...item} style={{ marginBottom: 12 }} />
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

export default withTranslation('page-orders')(connect(mapStateToProps, mapDispatchToProps)(Orders));
