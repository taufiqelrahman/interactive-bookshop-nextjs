import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps, PropsFromRedux } from 'lib/with-redux-store';
import { withTranslation, Link } from 'i18n';
import dynamic from 'next/dynamic';
import NumberFormat from 'react-number-format';
import { Fragment, useEffect, useState } from 'react';
import Head from 'next/head';
import * as gtag from 'lib/gtag';
import DefaultLayout from 'components/layouts/Default';
import NavBar from 'components/organisms/NavBar/mobile';
import { CartItem as ICartItem } from 'store/cart/types';
import { WithTranslation } from 'next-i18next';

const Stepper = dynamic(() => import('components/atoms/Stepper'));
const CartItem = dynamic(() => import('components/molecules/CartItem/desktop'));
const CartItemMobile = dynamic(() => import('components/molecules/CartItem/mobile'));
const Card = dynamic(() => import('components/atoms/Card'));
const Dot = dynamic(() => import('components/atoms/Dot'));
const Divider = dynamic(() => import('components/atoms/Divider'));
const Button = dynamic(() => import('components/atoms/Button'));
const MaintenanceModal = dynamic(() => import('components/molecules/MaintenanceModal'));

interface CartProps extends PropsFromRedux, WithTranslation {
  isMobile: boolean;
}
const Cart = (props: CartProps) => {
  const [showModal, setShowModal] = useState(false);
  const { users, cart } = props.state;
  const items = cart.isFetching ? ([{}, {}] as ICartItem[]) : cart.cart?.lineItems || [];
  const itemsAmount = cart.cart ? cart.cart?.lineItemsSubtotalPrice?.amount : 0;
  const hasShippingLine = cart.cart?.shippingLine;
  const discounts = cart.cart ? cart.cart.discountApplications : [];
  useEffect(() => {
    const { user } = users;
    if (user && user.cart) {
      props.thunkLoadCart(user.cart.checkout_id);
    } else if (!user && localStorage.getItem('cart')) {
      props.thunkLoadCart(JSON.parse(localStorage.getItem('cart') as any).id, true);
    }
  }, []);
  const continuePayment = () => {
    if (props.state.default.maintenanceMode) {
      setShowModal(true);
      return;
    }
    (window as any).location.href = cart.cart ? cart.cart.webUrl : '';
    gtag.event({
      action: 'checkout',
      category: 'ecommerce',
      label: props.isMobile ? 'mobile' : 'desktop',
      value: cart.cart && cart.cart.totalPrice,
    });
    const { isLoggedIn } = props.state.users;
    (window as any).fbq('track', 'InitiateCheckout', {
      price: (cart.cart && cart.cart.totalPrice) || 0,
      cartItems: (cart.cart && cart.cart.lineItems?.length) || 0,
      isLoggedIn,
    });
    if (!isLoggedIn) localStorage.removeItem('cart');
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
      <Head>
        <title>When I Grow Up | {props.t('cart-title')}</title>
      </Head>
      <div className={props.isMobile ? 'bg-light-grey' : 'u-container u-container__page'}>
        {!props.isMobile && <Stepper title={props.t('cart-title')} />}
        {items?.length ? (
          <div className="c-cart-section" style={props.isMobile ? { height: `calc(${screenHeight})` } : {}}>
            <div className="c-cart-section__items">
              {items.map((item, index) => {
                return props.isMobile ? (
                  <CartItemMobile
                    key={index}
                    {...item}
                    style={{ marginBottom: 12 }}
                    isSkeleton={cart.isFetching}
                    cartId={cart.cart?.id}
                    removeFromCart={props.thunkRemoveFromCart}
                    saveSelected={props.saveSelected}
                    updateCart={props.thunkUpdateCart}
                  />
                ) : (
                  <CartItem
                    key={index}
                    {...item}
                    style={{ marginBottom: 12 }}
                    isSkeleton={cart.isFetching}
                    cartId={cart.cart?.id}
                    removeFromCart={props.thunkRemoveFromCart}
                    saveSelected={props.saveSelected}
                    updateCart={props.thunkUpdateCart}
                  />
                );
              })}
              <div className="c-cart-section__more">
                <Link href="/create">
                  <a>{props.t('add-more')}</a>
                </Link>
              </div>
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
                      <div className="flex justify-between items-baseline">
                        <div>
                          <div className="c-cart__summary__title">When I Grow Up</div>
                          <div className="c-cart__summary__quantity">
                            {props.t('quantity')}: {items.length}
                          </div>
                        </div>
                        <div className="c-cart__summary__total">
                          <NumberFormat value={itemsAmount} thousandSeparator={true} prefix={'Rp'} displayType="text" />
                        </div>
                      </div>
                      {hasShippingLine && (
                        <div className="flex justify-between items-baseline" style={{ marginTop: 18 }}>
                          <div>
                            <div className="c-cart__summary__title">{props.t('standard-shipping')}</div>
                          </div>
                          <div className="c-cart__summary__total">
                            <NumberFormat
                              value={cart.cart?.shippingLine?.price}
                              thousandSeparator={true}
                              prefix={'Rp'}
                              displayType="text"
                            />
                          </div>
                        </div>
                      )}
                      {discounts?.map(discount => (
                        <div
                          key={discount.code}
                          className="flex justify-between items-baseline"
                          style={{ marginTop: 18 }}
                        >
                          <div>
                            <div className="c-cart__summary__title">{props.t('discount-code')}</div>
                            <div className="c-cart__summary__quantity">{discount.code}</div>
                          </div>
                          <div className="c-cart__summary__total">
                            <NumberFormat
                              value={-((itemsAmount || 0) * (discount.value.percentage / 100))}
                              thousandSeparator={true}
                              prefix={'Rp'}
                              displayType="text"
                            />
                          </div>
                        </div>
                      ))}
                      <Divider style={{ borderColor: '#EDEDED', margin: '24px 0 24px' }} />
                    </Fragment>
                  )}
                  <div className="c-cart__summary__subtotal">
                    <div className="c-cart__summary__subtotal__label">
                      Subtotal
                      {props.isMobile && <span className="icon-info" />}
                    </div>
                    <NumberFormat
                      value={cart.cart?.totalPrice}
                      thousandSeparator={true}
                      prefix={'Rp'}
                      displayType="text"
                    />
                  </div>
                  {!props.isMobile && (
                    <div className="c-cart__summary__info">
                      {!hasShippingLine && (
                        <div className="c-cart__summary__info__item" style={{ marginBottom: 8 }}>
                          <span className="icon-info" />
                          {props.t('shipping-not-included')}
                        </div>
                      )}
                      <div className="c-cart__summary__info__item" style={{ marginBottom: 8 }}>
                        <span className="icon-tag_label" />
                        {props.t('discount-next-step')}
                      </div>
                      <div className="c-cart__summary__info__item">
                        <span className="icon-gift" />
                        {props.t('manufacturing-time')}
                      </div>
                    </div>
                  )}
                  {/* <Button onClick={() => props.thunkAddDiscount('NEWMEMBER')}>add discount</Button>
                  <Button onClick={() => props.thunkRemoveDiscount('NEWMEMBER')}>remove discount</Button> */}
                  <Button
                    width="100%"
                    color="black"
                    style={props.isMobile ? { marginTop: 12 } : { marginTop: 30 }}
                    onClick={continuePayment}
                  >
                    {props.t('continue-payment')}
                  </Button>
                </div>
              </Wrapper>
            </div>
          </div>
        ) : (
          <div className="c-cart__empty" style={props.isMobile ? { height: `calc(${screenHeight})` } : {}}>
            <img src={`/static/images/empty-asset${props.isMobile ? '-sm' : ''}.png`} alt="empty" />
            <div className="c-cart__empty__title">{props.t('cart-empty-title')}</div>
            <div className="c-cart__empty__subtitle">{props.t('cart-empty-subtitle')}</div>
            <Link href="/create">
              <a>
                <Button className={props.isMobile ? 'w-full' : ''}>{props.t('cart-empty-cta')}</Button>
              </a>
            </Link>
          </div>
        )}
        {showModal && <MaintenanceModal show={showModal} setShow={setShowModal} isMobile={props.isMobile} />}
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
          &__more {
            @apply flex justify-center text-brand font-semibold text-sm;
            line-height: 1.8rem;
            margin: 12px 0;
            @screen md {
              padding: 24px 0;
            }
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
              @apply text-sm;
              margin-top: 12px;
              padding: 12px;
              line-height: 18px;
              background: #f6f5f8;
              border-radius: 12px;
              &__item {
                @apply flex items-center;
                span {
                  font-size: 20px;
                  margin-right: 8px;
                }
              }
            }
          }
          &__empty {
            @apply m-auto text-center pb-12 flex flex-col justify-center items-center;
            width: 85vw;
            @screen md {
              width: 35vw;
            }
            &__title {
              @apply text-xl font-semibold mt-2 mb-5;
            }
            &__subtitle {
              @apply mb-5 text-sm;
              line-height: 1.25rem;
              @screen md {
                @apply text-base;
                width: 35vw;
              }
            }
          }
        }
      `}</style>
    </DefaultLayout>
  );
};

Cart.getInitialProps = () => ({ namespacesRequired: ['common'] });

export default withTranslation('common')(connect(mapStateToProps, mapDispatchToProps)(Cart));
