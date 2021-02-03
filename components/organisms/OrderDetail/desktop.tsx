import { withTranslation } from 'i18n';
import dynamic from 'next/dynamic';
import appConfig from 'config';
import { Fragment } from 'react';
import { fullDate } from 'lib/format-date';
import { retrieveInfo, previewImg, calculateDays } from './helper';
import Skeleton from 'react-loading-skeleton';
import Head from 'next/head';
import DefaultLayout from 'components/layouts/Default';
// import dummyOrder from '_mocks/orderDetail';

const Stepper = dynamic(() => import('components/atoms/Stepper'));
const Card = dynamic(() => import('components/atoms/Card'));
const NumberFormat = dynamic(() => import('react-number-format'));
const Divider = dynamic(() => import('components/atoms/Divider'));
const Popover = dynamic(() => import('components/atoms/Popover'));
const Capsule = dynamic(() => import('components/atoms/Capsule'));
const Button = dynamic(() => import('components/atoms/Button'));

const OrderDetailDesktop = (props: any): any => {
  const { isFetching, currentOrder: order } = props.state.orders;
  const {
    currentOrder,
    shippingAddress,
    shippingDate,
    trackingNumber,
    shippingLine,
    shippingName,
    shippingCost,
    orderNumber,
    lineItems,
    hasDedication,
    discounts,
    totalDiscounts,
    payment,
    whatsappUrl,
  } = retrieveInfo(order || {});
  return (
    <DefaultLayout {...props}>
      <Head>
        <title>
          When I Grow Up | {props.t('order-title')}: {orderNumber}
        </title>
      </Head>
      <div className={props.isMobile ? 'bg-dark-grey' : 'u-container u-container__page'}>
        <Stepper
          title={
            <div className="flex items-center">
              {isFetching ? (
                <Skeleton height={42} width={500} />
              ) : (
                <Fragment>
                  {props.t('order-title')}: {orderNumber}
                  {currentOrder && (
                    <Capsule color={appConfig.stateColor[currentOrder.state]} style={{ height: 30, marginLeft: 18 }}>
                      {props.t(currentOrder.state)}
                      {props.state === 'received' && <span className="icon-cross_check" />}
                    </Capsule>
                  )}
                </Fragment>
              )}
            </div>
          }
        />
        <div className="c-detail-section">
          <div className="c-detail-section__left">
            <Card variant="border" style={{ marginBottom: 12 }}>
              <div className="c-detail__container">
                <h2>{props.t('book-details')}</h2>
                <div className="flex">
                  <div className="c-detail__book__left">
                    {isFetching ? (
                      <Skeleton height={136} width={136} />
                    ) : (
                      <div className="c-detail__book__image">
                        <img src={previewImg(lineItems[0].customAttributes)} alt="item preview" />
                      </div>
                    )}
                  </div>
                  <div className="c-detail__book__middle">
                    <div className="c-detail__label">{props.t('form:nickname-label')}</div>
                    <div className="c-detail__value">
                      {isFetching ? (
                        <Skeleton height={22} width={250} />
                      ) : (
                        lineItems.map(item => item.customAttributes.Name).join(', ') || '-'
                      )}
                    </div>
                    <div className="c-detail__label" style={{ marginTop: 30 }}>
                      {props.t('common:dedication-note')}
                    </div>
                    {isFetching ? (
                      <Skeleton height={24} width={115} />
                    ) : hasDedication ? (
                      <Popover
                        content={lineItems.map(item => (
                          <Fragment key={item.id}>
                            <h5>{item.customAttributes.Name}</h5>
                            <div>{item.customAttributes.Dedication}</div>
                          </Fragment>
                        ))}
                      >
                        <div className="c-detail__link">{props.t('common:preview-note')}</div>
                      </Popover>
                    ) : (
                      '-'
                    )}
                  </div>
                  <div className="c-detail__book__right">
                    <div className="c-detail__label">{props.t('common:quantity')}</div>
                    <div className="c-detail__value">
                      {isFetching ? <Skeleton height={22} width={60} /> : `${lineItems.length} ${props.t('books')}`}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
            <Card variant="border" style={{ marginBottom: 12 }}>
              <div className="c-detail__container">
                <h2>{props.t('order-state')}</h2>
                <div className="flex">
                  <div className="c-detail__order__left">
                    <div className="c-detail__label">{props.t('order-date')}</div>
                    <div className="c-detail__value">
                      {isFetching ? <Skeleton height={22} width={170} /> : fullDate(currentOrder.created_at)}
                    </div>
                    <div className="c-detail__label">{props.t('order-state')}</div>
                    <div className="c-detail__value capitalize">
                      {isFetching ? <Skeleton height={22} width={170} /> : props.t(currentOrder.state)}
                    </div>
                    {currentOrder && !currentOrder.fulfillment_status && (
                      <>
                        <div className="c-detail__label">{props.t('order-estimation')}</div>
                        <div className="c-detail__value">
                          {isFetching ? (
                            <Skeleton height={22} width={170} />
                          ) : (
                            `${calculateDays(currentOrder.processed_at)} ${props.t('day')}`
                          )}
                        </div>
                      </>
                    )}
                  </div>
                  <div className="c-detail__order__right">
                    <div className="c-detail__label">{props.t('shipping-date')}</div>
                    <div className="c-detail__value">
                      {isFetching ? <Skeleton height={22} width={170} /> : fullDate(shippingDate) || '-'}
                    </div>
                    <div className="c-detail__label">{props.t('tracking-number')}</div>
                    <div className="c-detail__value">
                      {isFetching ? <Skeleton height={22} width={170} /> : trackingNumber}
                    </div>
                  </div>
                </div>
                <div className="c-detail__order__info">
                  <div className="c-detail__order__info__item">{props.t('common:manufacturing-time')}</div>
                </div>
              </div>
            </Card>
            <Card variant="border" style={{ marginBottom: 12 }}>
              <div className="c-detail__container">
                <h2>{props.t('shipping-address')}</h2>
                <div className="flex">
                  <div className="c-detail__address__left">
                    <div className="c-detail__label">{props.t('street-address')}</div>
                    <div className="c-detail__value">
                      {isFetching ? <Skeleton height={22} width={170} /> : shippingAddress.address1}
                    </div>
                    <div className="c-detail__label">{props.t('province')}</div>
                    <div className="c-detail__value">
                      {isFetching ? <Skeleton height={22} width={170} /> : shippingAddress.province}
                    </div>
                  </div>
                  <div className="c-detail__address__right">
                    <div className="c-detail__label">{props.t('postal-code')}</div>
                    <div className="c-detail__value">
                      {isFetching ? <Skeleton height={22} width={170} /> : shippingAddress.zip}
                    </div>
                    <div className="c-detail__label">{props.t('city')}</div>
                    <div className="c-detail__value">
                      {isFetching ? <Skeleton height={22} width={170} /> : shippingAddress.city}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
          <div className="c-detail-section__right">
            <Card variant="border">
              <div className="c-detail__container">
                <h2>{props.t('common:order-summary')}</h2>
                <div className="flex justify-between items-baseline overflow-hidden">
                  <div>
                    <div className="c-detail__summary__title">
                      {isFetching ? <Skeleton height={24} width={190} /> : 'When I Grow Up'}
                    </div>
                    <div className="c-detail__summary__label">
                      {isFetching ? (
                        <Skeleton height={18} width={72} />
                      ) : (
                        `${props.t('common:quantity')}: ${lineItems.length}`
                      )}
                    </div>
                  </div>
                  <div className="c-detail__summary__total">
                    {isFetching ? (
                      <Skeleton height={24} width={120} />
                    ) : (
                      <NumberFormat
                        value={currentOrder.total_line_items_price}
                        thousandSeparator={true}
                        prefix={'Rp'}
                        displayType="text"
                      />
                    )}
                  </div>
                </div>
                {shippingLine && (
                  <div className="flex justify-between items-baseline" style={{ marginTop: 16 }}>
                    <div>
                      <div className="c-detail__summary__title">{props.t('shipping-cost')}</div>
                      <div className="c-detail__summary__label">{shippingName}</div>
                    </div>
                    <div className="c-detail__summary__total">
                      <NumberFormat value={shippingCost} thousandSeparator={true} prefix={'Rp'} displayType="text" />
                    </div>
                  </div>
                )}
                {discounts &&
                  discounts.map(discount => (
                    <div key={discount.code} className="flex justify-between items-baseline" style={{ marginTop: 18 }}>
                      <div>
                        <div className="c-detail__summary__title">{props.t('common:discount-code')}</div>
                        <div className="c-detail__summary__label">{discount.code}</div>
                      </div>
                      <div className="c-detail__summary__total">
                        <NumberFormat
                          value={-totalDiscounts}
                          thousandSeparator={true}
                          prefix={'Rp'}
                          displayType="text"
                        />
                      </div>
                    </div>
                  ))}
                <Divider style={{ borderColor: '#EDEDED', margin: '24px 0 24px' }} />
                <div className="c-detail__summary__subtotal">
                  <div>Subtotal</div>
                  {isFetching ? (
                    <Skeleton height={24} width={120} />
                  ) : (
                    <NumberFormat
                      value={currentOrder.total_price}
                      thousandSeparator={true}
                      prefix={'Rp'}
                      displayType="text"
                    />
                  )}
                </div>
                {currentOrder && currentOrder.financial_status !== 'paid' && (
                  <div className="c-detail__summary__info">
                    {payment.type ? (
                      <Fragment>
                        <div className="c-detail__summary__info__item">
                          {isFetching ? (
                            <Skeleton height={24} width={120} />
                          ) : (
                            `${props.t('awaiting-payment')} ${payment.type}`
                          )}
                        </div>
                        {payment.instance ? (
                          <div className="flex justify-between">
                            {isFetching ? (
                              <Skeleton height={24} width={120} />
                            ) : (
                              <Fragment>
                                <div className="c-detail__summary__info__payment">{payment.instance}</div>
                                <div className="c-detail__summary__info__payment">{payment.number}</div>
                              </Fragment>
                            )}
                          </div>
                        ) : payment.url ? (
                          <div className="c-detail__summary__info__link">
                            {isFetching ? (
                              <Skeleton height={24} width={120} />
                            ) : (
                              <a href={payment.url} target="_blank" rel="noopener noreferrer">
                                {props.t('continue-payment')}
                              </a>
                            )}
                          </div>
                        ) : (
                          <Fragment>
                            {props.t('processing-payment')}
                            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                              <Button className="mt-3" variant="whatsapp" width="100%">
                                WhatsApp
                              </Button>
                            </a>
                          </Fragment>
                        )}
                      </Fragment>
                    ) : (
                      <Fragment>
                        <div>{props.t('payment-failure')}</div>
                        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                          <Button className="mt-3" variant="whatsapp" width="100%">
                            WhatsApp
                          </Button>
                        </a>
                      </Fragment>
                    )}
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
      <style jsx>{`
        .c-detail {
          &-section {
            @apply flex w-full flex-col;
            @screen lg {
              @apply flex-row;
            }
            padding: 31px 0;
            &__left {
              @apply w-full;
              @screen lg {
                @apply w-3/5;
                margin-right: 30px;
              }
            }
            &__right {
              @apply w-full;
              @screen lg {
                @apply w-2/5;
              }
            }
          }
          &__container {
            padding: 20px 24px;
            h2 {
              @apply font-semibold;
              font-size: 20px;
              line-height: 30px;
              margin-bottom: 24px;
            }
          }
          &__book {
            &__left {
              @apply w-3/12 opacity-100;
              margin-right: 12px;
              @screen md {
                @apply w-0 opacity-0;
                margin-right: 0;
              }
              @screen lg {
                @apply w-4/12 opacity-100;
                margin-right: 12px;
              }
            }
            &__middle {
              @apply w-4/12;
              margin-right: 12px;
              @screen md {
                @apply w-6/12;
              }
              @screen lg {
                @apply w-4/12;
              }
              @apply w-4/12;
            }
            &__right {
              @apply w-5/12;
              @screen md {
                @apply w-6/12;
              }
              @screen lg {
                @apply w-3/12;
              }
              @apply w-5/12;
            }
            &__image {
              @apply overflow-hidden;
              padding: 4px;
              background: #f3bf45;
              border-radius: 12px;
              height: 136px;
              max-width: 136px;
              border: 2px solid #ededed;
            }
          }
          &__order {
            &__left {
              @apply w-7/12;
            }
            &__right {
              @apply w-5/12;
            }
            &__info {
              @apply text-sm;
              line-height: 22px;
              background: #f6f5f8;
              border-radius: 12px;
              padding: 18px;
              &__item {
                line-height: 20px;
              }
            }
          }
          &__address {
            &__left {
              @apply w-7/12;
            }
            &__right {
              @apply w-5/12;
            }
          }
          &__summary {
            &__label {
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
              @apply text-sm;
              margin-top: 24px;
              line-height: 22px;
              background: #f6f5f8;
              border-radius: 12px;
              padding: 18px;
              &__item {
                @apply flex items-center;
                line-height: 20px;
                margin-bottom: 18px;
              }
              &__payment {
                @apply font-semibold text-base;
                line-height: 24px;
              }
              &__link {
                @apply font-semibold;
                color: #445ca4;
              }
            }
          }
          &__label {
            @apply text-xs font-semibold;
            line-height: 18px;
            margin-bottom: 3px;
            color: #999;
          }
          &__value {
            @apply font-opensans overflow-hidden;
            line-height: 22px;
            margin-bottom: 13px;
          }
          &__link {
            @apply font-semibold cursor-pointer;
            color: #445ca4;
            line-height: 24px;
          }
        }
      `}</style>
    </DefaultLayout>
  );
};

export default withTranslation(['page-orders', 'form', 'common'])(OrderDetailDesktop);
