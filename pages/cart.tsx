import dynamic from 'next/dynamic';
import Head from 'next/head';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Fragment, useEffect } from 'react';
import NumberFormat from 'react-number-format';
import { useSelector, useDispatch } from 'react-redux';

import DefaultLayout from 'components/layouts/Default';
import NavBar from 'components/organisms/NavBar/mobile';
import * as gtag from 'lib/gtag';
import { RootState, wrapper } from 'store';
import actions from 'store/actions';

const Stepper = dynamic(() => import('components/atoms/Stepper'));
const CartItem = dynamic(() => import('components/molecules/CartItem'));
const Card = dynamic(() => import('components/atoms/Card'));
const Dot = dynamic(() => import('components/atoms/Dot'));
const Divider = dynamic(() => import('components/atoms/Divider'));
const Button = dynamic(() => import('components/atoms/Button'));

const Cart = ({ isMobile, setSideNav }: { isMobile?: boolean; setSideNav?: (open: boolean) => void }) => {
  const { t } = useTranslation('common');
  const dispatch = useDispatch();
  const users = useSelector((state: any) => state.users);
  const cart = useSelector((state: RootState) => state.cart);

  const items = cart.cart ? cart.cart.lineItems : [];
  const itemsAmount = cart.cart ? cart.cart.lineItemsSubtotalPrice.amount : 0;
  const hasShippingLine = cart.cart && cart.cart.shippingLine;
  // const discounts = cart.cart ? cart.cart.discountApplications : [];

  useEffect(() => {
    if (cart) return;
    if (users.user && users.user.cart) {
      dispatch(actions.thunkLoadCart(users.user.cart.checkout_id));
    } else if (!users.user && localStorage.getItem('cart')) {
      dispatch(actions.thunkLoadCart(JSON.parse(localStorage.getItem('cart') as string).id, true));
    }
  }, [cart, dispatch, users.user]);

  const continuePayment = () => {
    window.location.href = cart.cart ? cart.cart.webUrl : '';
    gtag.event({
      action: 'checkout',
      category: 'ecommerce',
      label: isMobile ? 'mobile' : 'desktop',
      value: cart.cart && cart.cart.totalPrice,
    });
    const { isLoggedIn } = users;
    (window as any).fbq('track', 'InitiateCheckout', {
      price: cart.cart && cart.cart.totalPrice,
      cartItems: cart.cart && cart.cart.lineItems.length,
      isLoggedIn,
    });
    if (!isLoggedIn) localStorage.removeItem('cart');
  };

  const screenHeight = '100vh - 59px';
  const Wrapper: any = isMobile ? 'div' : Card;

  return (
    <DefaultLayout
      isMobile={isMobile}
      navbar={isMobile && <NavBar setSideNav={setSideNav} menuAction title={t('cart-title')} />}
    >
      <Head>
        <title>Interactive Bookshop Next.js | {t('cart-title')}</title>
      </Head>

      <div className={isMobile ? 'bg-light-grey' : 'u-container u-container__page'}>
        {!isMobile && <Stepper title={t('cart-title')} />}

        {items.length > 0 ? (
          <div className="c-cart-section" style={isMobile ? { height: `calc(${screenHeight})` } : {}}>
            <div className="c-cart-section__items">
              {items.map((item) => (
                <CartItem
                  key={item.id}
                  {...item}
                  style={{ marginBottom: 12 }}
                  isSkeleton={cart.isFetching}
                  cartId={cart.cart?.id || ''}
                />
              ))}
            </div>

            <div className="c-cart-section__summary">
              <Wrapper variant="border">
                <div className="c-cart__summary">
                  {!isMobile && (
                    <Fragment>
                      <div className="c-cart__summary__header">
                        <h1>{t('order-summary')}</h1>
                        <Dot width="12px" color="red" />
                      </div>
                      <div className="flex items-baseline justify-between">
                        <div>
                          <div className="c-cart__summary__title">Interactive Bookshop Next.js</div>
                          <div className="c-cart__summary__quantity">
                            {t('quantity')}: {items.length}
                          </div>
                        </div>
                        <div className="c-cart__summary__total">
                          <NumberFormat
                            value={cart.cart && itemsAmount}
                            thousandSeparator
                            prefix="Rp"
                            displayType="text"
                          />
                        </div>
                      </div>
                      {hasShippingLine && (
                        <div className="flex items-baseline justify-between" style={{ marginTop: 18 }}>
                          <div>
                            <div className="c-cart__summary__title">{t('standard-shipping')}</div>
                          </div>
                          <div className="c-cart__summary__total">
                            <NumberFormat
                              value={cart.cart?.shippingLine?.price?.amount || 0}
                              thousandSeparator
                              prefix="Rp"
                              displayType="text"
                            />
                          </div>
                        </div>
                      )}
                      {/* {discounts.map((discount) => (
                        <div
                          key={discount.code}
                          className="flex items-baseline justify-between"
                          style={{ marginTop: 18 }}
                        >
                          <div>
                            <div className="c-cart__summary__title">{t('discount-code')}</div>
                            <div className="c-cart__summary__quantity">{discount.code}</div>
                          </div>
                          <div className="c-cart__summary__total">
                            <NumberFormat
                              value={-(itemsAmount * (discount.value.percentage / 100))}
                              thousandSeparator
                              prefix="Rp"
                              displayType="text"
                            />
                          </div>
                        </div>
                      ))} */}
                      <Divider style={{ borderColor: '#EDEDED', margin: '24px 0 24px' }} />
                    </Fragment>
                  )}
                  <div className="c-cart__summary__subtotal">
                    <div className="c-cart__summary__subtotal__label">
                      Subtotal
                      {isMobile && <span className="icon-info" />}
                    </div>
                    <NumberFormat
                      value={cart.cart && cart.cart.totalPrice.amount}
                      thousandSeparator
                      prefix="Rp"
                      displayType="text"
                    />
                  </div>
                  <Button
                    width="100%"
                    color="black"
                    style={{ marginTop: isMobile ? 12 : 30 }}
                    onClick={continuePayment}
                  >
                    {t('continue-payment')}
                  </Button>
                </div>
              </Wrapper>
            </div>
          </div>
        ) : (
          <div className="c-cart__empty" style={isMobile ? { height: `calc(${screenHeight})` } : {}}>
            <img src={`/static/images/empty-asset${isMobile ? '-sm' : ''}.png`} alt="empty" />
            <div className="c-cart__empty__title">{t('cart-empty-title')}</div>
            <div className="c-cart__empty__subtitle">{t('cart-empty-subtitle')}</div>
            <Link href="/create">
              <a>
                <Button className={isMobile ? 'w-full' : ''}>{t('cart-empty-cta')}</Button>
              </a>
            </Link>
          </div>
        )}
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
            @apply m-auto flex flex-col items-center justify-center pb-12 text-center;
            width: 85vw;
            @screen md {
              width: 35vw;
            }
            &__title {
              @apply mb-5 mt-2 text-xl font-semibold;
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

export const getServerSideProps = wrapper.getServerSideProps(() => async (ctx) => {
  return {
    props: {
      ...(await serverSideTranslations(ctx.locale || 'en', ['common', 'form'])),
    },
  };
});

export default Cart;
