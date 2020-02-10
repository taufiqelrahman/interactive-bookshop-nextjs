import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from 'lib/with-redux-store';
import { withTranslation } from 'i18n';
import DefaultLayout from 'components/layouts/Default';
import Stepper from 'components/atoms/Stepper';
import CartItem from 'components/organisms/CartItem';
import Card from 'components/atoms/Card';
import dummyCart from '_mocks/cart';
import Dot from 'components/atoms/Dot';
import Divider from 'components/atoms/Divider';
import Button from 'components/atoms/Button';
import NumberFormat from 'react-number-format';

const Cart = (props: any): any => {
  const continuePayment = () => {
    console.log('continuePayment');
  };
  return (
    <DefaultLayout {...props}>
      <div className="bg-light-grey h-min-screen">
        <div className="u-container u-container__page">
          <Stepper title={props.t('cart-title')} />
          <div className="c-cart-section">
            <div className="c-cart-section__left">
              {dummyCart &&
                dummyCart.items.map(item => <CartItem key={item.id} {...item} style={{ marginBottom: 12 }} />)}
            </div>
            <div className="c-cart-section__right">
              <Card variant="border">
                <div className="c-cart__summary">
                  <div className="c-cart__summary__header">
                    <h1>{props.t('order-summary')}</h1>
                    <Dot width="12px" color="red" />
                  </div>
                  <div className="flex justify-between">
                    <div>
                      <div className="c-cart__summary__title">When I Grow Up</div>
                      <div className="c-cart__summary__quantity">
                        {props.t('quantity')}: {dummyCart.quantity}
                      </div>
                    </div>
                    <div className="c-cart__summary__total">
                      <NumberFormat value={dummyCart.price} thousandSeparator={true} prefix={'Rp'} displayType="text" />
                    </div>
                  </div>
                  <Divider style={{ borderColor: '#EDEDED', margin: '24px 0 24px' }} />
                  <div className="c-cart__summary__subtotal">
                    <div>Subtotal</div>
                    <NumberFormat value={dummyCart.price} thousandSeparator={true} prefix={'Rp'} displayType="text" />
                  </div>
                  <div className="c-cart__summary__info">
                    <span className="icon-info" />
                    {props.t('shipping-not-included')}
                  </div>
                  <Button width="100%" color="black" style={{ marginTop: 30 }} onClick={continuePayment}>
                    {props.t('continue-payment')}
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .c-cart-section {
          @apply flex w-full;
          padding: 31px 0;
          &__left {
            @apply w-3/5;
            margin-right: 30px;
          }
          &__right {
            @apply w-2/5;
          }
        }
        .c-cart {
          &__summary {
            padding: 20px 24px;
            &__header {
              @apply flex items-center;
              margin-bottom: 24px;
              h1 {
                @apply font-semibold;
                font-size: 20px;
                line-height: 30px;
                margin-right: 8px;
              }
            }
            &__quantity {
              @apply text-xs;
              color: #8c89a6;
            }
            &__subtotal {
              @apply flex justify-between font-semibold;
            }
            &__title {
              @apply mb-1;
              line-height: 24px;
            }
            &__info {
              @apply text-sm flex items-center;
              margin-top: 12px;
              padding: 12px;
              line-height: 18px;
              background: #f6f5f8;
              border-radius: 12px;
              span {
                font-size: 20px;
                margin-right: 8px;
              }
            }
          }
        }
      `}</style>
    </DefaultLayout>
  );
};

export default withTranslation('common')(connect(mapStateToProps, mapDispatchToProps)(Cart));
