import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from 'lib/with-redux-store';
import { withTranslation } from 'i18n';
import DefaultLayout from 'components/layouts/Default';
import Stepper from 'components/atoms/Stepper';
import CartItem from 'components/molecules/CartItem/desktop';
import CartItemMobile from 'components/molecules/CartItem/mobile';
import Card from 'components/atoms/Card';
import dummyCart from '_mocks/cart';
import Dot from 'components/atoms/Dot';
import Divider from 'components/atoms/Divider';
import Button from 'components/atoms/Button';
import NumberFormat from 'react-number-format';
import NavBar from 'components/organisms/NavBar/mobile';
import { Fragment } from 'react';
import { checkUser } from 'lib/page-middleware';

const Cart = (props: any): any => {
  const continuePayment = () => {
    console.log('continuePayment');
  };
  const screenHeight = '100vh - 59px';
  const Wrapper: any = props.isMobile ? 'div' : Card;
  return (
    <DefaultLayout
      {...props}
      navbar={
        props.isMobile && <NavBar setSideNav={props.setSideNav} menuAction={true} title={props.t('cart-title')} />
      }
    >
      <div className={props.isMobile ? 'bg-light-grey' : 'u-container u-container__page'}>
        {!props.isMobile && <Stepper title={props.t('cart-title')} />}
        <div className="c-cart-section" style={props.isMobile ? { height: `calc(${screenHeight})` } : {}}>
          <div className="c-cart-section__items">
            {dummyCart &&
              dummyCart.items.map(item => {
                return props.isMobile ? (
                  <CartItemMobile key={item.id} {...item} style={{ marginBottom: 12 }} />
                ) : (
                  <CartItem key={item.id} {...item} style={{ marginBottom: 12 }} />
                );
              })}
          </div>
          <div className="c-cart-section__summary">
            <Wrapper variant="border">
              <div className="c-cart__summary">
                {!props.isMobile && (
                  <Fragment>
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
                        <NumberFormat
                          value={dummyCart.price}
                          thousandSeparator={true}
                          prefix={'Rp'}
                          displayType="text"
                        />
                      </div>
                    </div>
                    <Divider style={{ borderColor: '#EDEDED', margin: '24px 0 24px' }} />
                  </Fragment>
                )}
                <div className="c-cart__summary__subtotal">
                  <div className="c-cart__summary__subtotal__label">
                    Subtotal
                    {props.isMobile && <span className="icon-info" />}
                  </div>
                  <NumberFormat value={dummyCart.price} thousandSeparator={true} prefix={'Rp'} displayType="text" />
                </div>
                {!props.isMobile && (
                  <div className="c-cart__summary__info">
                    <span className="icon-info" />
                    {props.t('shipping-not-included')}
                  </div>
                )}
                <Button
                  width="100%"
                  color="black"
                  style={{ marginTop: props.isMobile ? 12 : 30 }}
                  onClick={continuePayment}
                >
                  {props.t('continue-payment')}
                </Button>
              </div>
            </Wrapper>
          </div>
        </div>
      </div>
      <style jsx>{`
        .c-cart-section {
          @apply flex w-full flex-col justify-between;
          @screen md {
            padding: 31px 0;
          }
          @screen xl {
            @apply flex-row;
          }
          &__items {
            @apply w-full overflow-y-auto;
            margin-right: 30px;
            padding-top: 12px;
            @screen md {
              padding-top: 0;
              overflow: unset;
            }
            @screen xl {
              @apply w-3/5;
            }
          }
          &__summary {
            @apply w-full;
            border-top: 1px solid #efeef4;
            @screen md {
              border: 0;
            }
            @screen xl {
              @apply w-2/5;
            }
          }
        }
        .c-cart {
          &__summary {
            padding: 12px 16px;
            @screen md {
              padding: 20px 24px;
            }
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
              &__label {
                @apply flex;
                span {
                  margin-left: 6px;
                }
              }
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

Cart.getInitialProps = ctx => {
  checkUser(ctx);
  return { namespacesRequired: ['common'] };
};

export default withTranslation('common')(connect(mapStateToProps, mapDispatchToProps)(Cart));
