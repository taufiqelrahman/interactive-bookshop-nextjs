import dynamic from 'next/dynamic';
import Head from 'next/head';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import React, { Fragment, useMemo } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useSelector } from 'react-redux';

import DefaultLayout from 'components/layouts/Default';
import appConfig from 'config';
import { fullDate } from 'lib/format-date';
import { RootState } from 'store';

import { retrieveInfo, previewImg } from './helper';

// Dynamic imports for better code splitting and performance
const Stepper = dynamic(() => import('components/atoms/Stepper'));
const Card = dynamic(() => import('components/atoms/Card'));
const NumberFormat = dynamic(() => import('react-number-format'));
const Divider = dynamic(() => import('components/atoms/Divider'));
const Popover = dynamic(() => import('components/atoms/Popover'));
const Capsule = dynamic(() => import('components/atoms/Capsule'));
const Button = dynamic(() => import('components/atoms/Button'));

/**
 * Props interface for the OrderDetailDesktop component
 */
interface OrderDetailDesktopProps {
  /** Whether the component is being rendered on mobile device */
  isMobile?: boolean;
  /** Current order state from URL/navigation */
  state?: string;
  /** Additional props passed from layout */
  [key: string]: any;
}

/**
 * Order Detail Desktop Component
 *
 * A comprehensive desktop layout for displaying detailed order information including
 * book details, shipping information, order status, and payment summary. Handles
 * loading states with skeleton placeholders and provides interactive elements for
 * payment continuation and support contact.
 *
 * Key Features:
 * - Responsive desktop layout with left-right column structure
 * - Real-time loading states with skeleton UI
 * - Interactive dedication preview with popover
 * - Payment status handling with action buttons
 * - WhatsApp support integration
 * - Formatted currency display with NumberFormat
 * - Dynamic order state visualization
 */
const OrderDetailDesktop: React.FC<OrderDetailDesktopProps> = (props): JSX.Element => {
  // Internationalization hook for localized text
  const { t } = useTranslation('page-orders');

  // Redux state selector for order data and loading state
  const { isFetching, currentOrder: order } = useSelector((state: RootState) => state.orders);

  // Process raw order data into structured format using helper utility
  const orderInfo = useMemo(() => retrieveInfo(order || {}), [order]);

  // Destructure processed order information for easier access
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
  } = orderInfo;
  /**
   * Renders the book preview image with proper error handling
   */
  const renderBookImage = () => {
    if (isFetching) {
      return <Skeleton height={136} width={136} />;
    }

    if (!lineItems.length || !lineItems[0]?.customAttributes) {
      return <div className="c-detail__book__image c-detail__book__image--placeholder">No Image</div>;
    }

    const imageUrl = previewImg(lineItems[0].customAttributes);

    return (
      <div className="c-detail__book__image">
        <Image
          src={imageUrl}
          alt={`Preview for ${lineItems[0]?.customAttributes?.Name || 'book'}`}
          width={136}
          height={136}
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
      </div>
    );
  };

  /**
   * Renders the dedication preview section with popover functionality
   */
  const renderDedicationPreview = () => {
    if (isFetching) {
      return <Skeleton height={24} width={115} />;
    }

    if (!hasDedication) {
      return '-';
    }

    return (
      <Popover
        content={lineItems.map((item) => (
          <Fragment key={item.id}>
            <h5>{item.customAttributes?.Name}</h5>
            <div>{item.customAttributes?.Dedication}</div>
          </Fragment>
        ))}
      >
        <div className="c-detail__link">{t('common:preview-note')}</div>
      </Popover>
    );
  };

  return (
    <DefaultLayout {...props}>
      <Head>
        <title>
          Interactive Bookshop Next.js | {t('order-title')}: {orderNumber || 'Loading...'}
        </title>
      </Head>
      <main className={props.isMobile ? 'bg-dark-grey' : 'u-container u-container__page'} role="main">
        <Stepper
          title={
            <div className="flex items-center">
              {isFetching ? (
                <Skeleton height={42} width={500} />
              ) : (
                <Fragment>
                  {t('order-title')}: {orderNumber}
                  {currentOrder && (
                    <Capsule
                      color={appConfig.stateColor[currentOrder.state as keyof typeof appConfig.stateColor]}
                      style={{ height: 30, marginLeft: 18 }}
                    >
                      {t(currentOrder.state)}
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
                <h2>{t('book-details')}</h2>
                <div className="flex">
                  <div className="c-detail__book__left">
                    {isFetching ? <Skeleton height={136} width={136} /> : renderBookImage()}
                  </div>
                  <div className="c-detail__book__middle">
                    <div className="c-detail__label">{t('form:nickname-label')}</div>
                    <div className="c-detail__value">
                      {isFetching ? (
                        <Skeleton height={22} width={250} />
                      ) : (
                        lineItems.map((item) => item.customAttributes.Name).join(', ') || '-'
                      )}
                    </div>
                    <div className="c-detail__label" style={{ marginTop: 30 }}>
                      {t('common:dedication-note')}
                    </div>
                    {renderDedicationPreview()}
                  </div>
                  <div className="c-detail__book__right">
                    <div className="c-detail__label">{t('common:quantity')}</div>
                    <div className="c-detail__value">
                      {isFetching ? <Skeleton height={22} width={60} /> : `${lineItems.length} ${t('books')}`}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
            <Card variant="border" style={{ marginBottom: 12 }}>
              <div className="c-detail__container">
                <h2>{t('order-state')}</h2>
                <div className="flex">
                  <div className="c-detail__order__left">
                    <div className="c-detail__label">{t('order-date')}</div>
                    <div className="c-detail__value">
                      {isFetching ? <Skeleton height={22} width={170} /> : fullDate(currentOrder.created_at)}
                    </div>
                    <div className="c-detail__label">{t('order-state')}</div>
                    <div className="c-detail__value capitalize">
                      {isFetching ? <Skeleton height={22} width={170} /> : t(currentOrder.state)}
                    </div>
                  </div>
                  <div className="c-detail__order__right">
                    <div className="c-detail__label">{t('shipping-date')}</div>
                    <div className="c-detail__value">
                      {isFetching ? <Skeleton height={22} width={170} /> : fullDate(shippingDate) || '-'}
                    </div>
                    <div className="c-detail__label">{t('tracking-number')}</div>
                    <div className="c-detail__value">
                      {isFetching ? <Skeleton height={22} width={170} /> : trackingNumber}
                    </div>
                  </div>
                </div>
                <div className="c-detail__order__info">
                  <div className="c-detail__order__info__item">{t('common:manufacturing-time')}</div>
                </div>
              </div>
            </Card>
            <Card variant="border" style={{ marginBottom: 12 }}>
              <div className="c-detail__container">
                <h2>{t('shipping-address')}</h2>
                <div className="flex">
                  <div className="c-detail__address__left">
                    <div className="c-detail__label">{t('street-address')}</div>
                    <div className="c-detail__value">
                      {isFetching ? <Skeleton height={22} width={170} /> : shippingAddress.address1}
                    </div>
                    <div className="c-detail__label">{t('province')}</div>
                    <div className="c-detail__value">
                      {isFetching ? <Skeleton height={22} width={170} /> : shippingAddress.province}
                    </div>
                  </div>
                  <div className="c-detail__address__right">
                    <div className="c-detail__label">{t('postal-code')}</div>
                    <div className="c-detail__value">
                      {isFetching ? <Skeleton height={22} width={170} /> : shippingAddress.zip}
                    </div>
                    <div className="c-detail__label">{t('city')}</div>
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
                <h2>{t('common:order-summary')}</h2>
                <div className="flex items-baseline justify-between overflow-hidden">
                  <div>
                    <div className="c-detail__summary__title">
                      {isFetching ? <Skeleton height={24} width={190} /> : 'Interactive Bookshop Next.js'}
                    </div>
                    <div className="c-detail__summary__label">
                      {isFetching ? (
                        <Skeleton height={18} width={72} />
                      ) : (
                        `${t('common:quantity')}: ${lineItems.length}`
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
                  <div className="flex items-baseline justify-between" style={{ marginTop: 16 }}>
                    <div>
                      <div className="c-detail__summary__title">{t('shipping-cost')}</div>
                      <div className="c-detail__summary__label">{shippingName}</div>
                    </div>
                    <div className="c-detail__summary__total">
                      <NumberFormat value={shippingCost} thousandSeparator={true} prefix={'Rp'} displayType="text" />
                    </div>
                  </div>
                )}
                {discounts &&
                  discounts.map((discount) => (
                    <div key={discount.code} className="flex items-baseline justify-between" style={{ marginTop: 18 }}>
                      <div>
                        <div className="c-detail__summary__title">{t('common:discount-code')}</div>
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
                            `${t('awaiting-payment')} ${payment.type}`
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
                                {t('continue-payment')}
                              </a>
                            )}
                          </div>
                        ) : (
                          <Fragment>
                            {t('processing-payment')}
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
                        <div>{t('payment-failure')}</div>
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
      </main>

      {/* Component-scoped styles using styled-jsx */}
      <style jsx>{`
        .c-detail {
          /* Main section layout - responsive flexbox */
          &-section {
            @apply flex w-full flex-col;
            padding: 31px 0;

            @screen lg {
              @apply flex-row;
            }

            /* Left column - main content (60% on desktop) */
            &__left {
              @apply w-full;

              @screen lg {
                @apply w-3/5;
                margin-right: 30px;
              }
            }

            /* Right column - summary sidebar (40% on desktop) */
            &__right {
              @apply w-full;

              @screen lg {
                @apply w-2/5;
              }
            }
          }
          /* Card container - consistent padding and headers */
          &__container {
            padding: 20px 24px;

            h2 {
              @apply mb-6 text-xl font-semibold leading-8;
            }
          }

          /* Book details section - responsive grid layout */
          &__book {
            /* Image column - responsive visibility */
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

            /* Middle content - character details */
            &__middle {
              @apply w-4/12;
              margin-right: 12px;

              @screen md {
                @apply w-6/12;
              }

              @screen lg {
                @apply w-4/12;
              }
            }

            /* Right content - quantity info */
            &__right {
              @apply w-5/12;

              @screen md {
                @apply w-6/12;
              }

              @screen lg {
                @apply w-3/12;
              }
            }

            /* Book preview image styling */
            &__image {
              @apply overflow-hidden rounded-xl border-2;
              padding: 4px;
              background: #f3bf45;
              height: 136px;
              max-width: 136px;
              border-color: #ededed;

              /* Placeholder state for missing images */
              &--placeholder {
                @apply flex items-center justify-center bg-gray-200 text-sm text-gray-500;
              }
            }
          }
          /* Order status section - two column layout */
          &__order {
            &__left {
              @apply w-7/12;
            }

            &__right {
              @apply w-5/12;
            }

            /* Info panel - highlighted background */
            &__info {
              @apply rounded-xl bg-gray-100 p-4 text-sm leading-6;

              &__item {
                @apply leading-5;
              }
            }
          }

          /* Address section - two column layout */
          &__address {
            &__left {
              @apply w-7/12;
            }

            &__right {
              @apply w-5/12;
            }
          }
          /* Order summary section - pricing and payment */
          &__summary {
            &__label {
              @apply text-xs text-gray-500;
            }

            &__subtotal {
              @apply flex justify-between font-semibold;
            }

            &__title {
              @apply mb-1 leading-6;
            }

            /* Payment info panel */
            &__info {
              @apply mt-6 rounded-xl bg-gray-100 p-4 text-sm leading-6;

              &__item {
                @apply mb-4 flex items-center leading-5;
              }

              &__payment {
                @apply text-base font-semibold leading-6;
              }

              &__link {
                @apply font-semibold text-blue-600 hover:text-blue-800;
                transition: color 0.2s ease;
              }
            }
          }
          /* Common UI elements */
          &__label {
            @apply mb-1 text-xs font-semibold leading-5 text-gray-500;
          }

          &__value {
            @apply mb-3 overflow-hidden font-opensans leading-6;
          }

          &__link {
            @apply cursor-pointer font-semibold leading-6 text-blue-600;
            transition: color 0.2s ease;

            &:hover {
              @apply text-blue-800;
            }
          }
        }
      `}</style>
    </DefaultLayout>
  );
};

export default OrderDetailDesktop;
