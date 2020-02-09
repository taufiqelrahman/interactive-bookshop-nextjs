import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from 'lib/with-redux-store';
import { withTranslation } from 'i18n';
import DefaultLayout from 'components/layouts/Default';
import Stepper from 'components/atoms/Stepper';
import CartItem from 'components/organisms/CartItem';
import Card from 'components/atoms/Card';
import dummyCart from '_mocks/cart';

const Cart = (props: any): any => {
  return (
    <DefaultLayout {...props}>
      <div className="bg-light-grey h-min-screen">
        <div className="u-container u-container__page">
          <Stepper title={props.t('cart-title')} />
          <div className="flex w-full">
            <div className="c-section__left">
              {dummyCart && dummyCart.map(item => <CartItem key={item.id} {...item} style={{ marginBottom: 12 }} />)}
            </div>
            <div className="c-section__right">
              <Card variant="border">
                <div className="c-cart__summary"></div>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .c-section {
          &__left {
            @apply w-3/5;
            padding: 31px 0;
          }
          &__right {
            @apply w-2/5;
          }
        }
        .c-cart {
          &__summary {
            padding: 20px 24px;
          }
        }
      `}</style>
    </DefaultLayout>
  );
};

export default withTranslation('common')(connect(mapStateToProps, mapDispatchToProps)(Cart));
