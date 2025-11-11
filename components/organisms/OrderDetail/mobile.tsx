import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useState, useEffect, useCallback, useMemo, Fragment } from 'react';
import Skeleton from 'react-loading-skeleton';
import NumberFormat from 'react-number-format';
import { useSelector } from 'react-redux';
import { Swipeable } from 'react-swipeable';
import { toast } from 'react-toastify';

import DefaultLayout from 'components/layouts/Default';
import NavBar from 'components/organisms/NavBar/mobile';
import appConfig from 'config';
import { fullDate } from 'lib/format-date';
import { RootState } from 'store';

import { retrieveInfo } from './helper';

// Dynamic imports for better performance and code splitting
const Divider = dynamic(() => import('components/atoms/Divider'));
const Capsule = dynamic(() => import('components/atoms/Capsule'));
const Sheet = dynamic(() => import('components/atoms/Sheet'));
const Dot = dynamic(() => import('components/atoms/Dot'));
const Button = dynamic(() => import('components/atoms/Button'));

/**
 * Props interface for OrderDetailMobile component
 */
interface OrderDetailMobileProps {
  /** Function to control side navigation state */
  setSideNav?: (isOpen: boolean) => void;
  /** Whether the current device is mobile */
  isMobile?: boolean;
  /** Order state passed from parent component */
  state?: string;
}

/**
 * State interface for component internal state management
 */
interface ComponentState {
  /** Controls main preview sheet visibility */
  showPreview: boolean;
  /** Controls whether preview sheet is extended to full height */
  extendPreview: boolean;
  /** Controls dedication note sheet visibility */
  showNote: boolean;
  /** Controls whether note sheet is extended to full height */
  extendNote: boolean;
}

/**
 * OrderDetailMobile Component
 *
 * A mobile-optimized order detail view that displays comprehensive order information
 * including book details, shipping status, payment information, and dedication notes.
 * Features swipe gestures for intuitive navigation and responsive sheet modals.
 *
 * Key features:
 * - Responsive sheet-based layout optimized for mobile
 * - Swipe gesture support for navigation
 * - Real-time order status tracking
 * - Payment status and action buttons
 * - Dedication note preview functionality
 * - Copy-to-clipboard for payment numbers
 *
 * @param props - Component props containing navigation controls and mobile state
 * @returns JSX element representing the mobile order detail interface
 */
const OrderDetailMobile = (props: OrderDetailMobileProps): JSX.Element => {
  // Translation and routing hooks
  const { t } = useTranslation('page-orders');
  const router = useRouter();

  // Redux state for order data and loading state
  const { isFetching, currentOrder: order } = useSelector((state: RootState) => state.orders);

  // Component state for managing sheet visibility and extension
  const [componentState, setComponentState] = useState<ComponentState>({
    showPreview: false,
    extendPreview: false,
    showNote: false,
    extendNote: false,
  });

  // Memoized order information to prevent unnecessary recalculations
  const orderInfo = useMemo(() => retrieveInfo(order || {}), [order]);

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

  // Screen height calculation for responsive layout
  const screenHeight = '100vh - 59px';

  // Initialize preview sheet visibility when component mounts
  useEffect(() => {
    setComponentState((prevState) => ({ ...prevState, showPreview: true }));
  }, []);

  /**
   * Handles navigation back to orders list
   * Closes the preview sheet and navigates using Next.js router
   */
  const handleExit = useCallback(() => {
    setComponentState((prevState) => ({ ...prevState, showPreview: false }));
    router.push('/orders');
  }, [router]);

  /**
   * Opens the dedication note sheet
   * Prevents event propagation to avoid triggering parent click handlers
   *
   * @param event - React mouse event
   */
  const handleShowNote = useCallback((event: React.MouseEvent) => {
    event.stopPropagation();
    setComponentState((prevState) => ({ ...prevState, showNote: true }));
  }, []);

  /**
   * Copies payment number to clipboard
   * Uses legacy execCommand for backward compatibility
   * Shows success toast notification to user
   */
  const handleCopyToClipboard = useCallback(() => {
    const element = document.getElementById('payment-number') as HTMLInputElement;
    if (element) {
      element.select();
      document.execCommand('copy');
      toast.success(t('copy-success'));
    }
  }, [t]);

  /**
   * Renders book details section with character names and quantities
   * Handles loading states and empty data gracefully
   */
  const renderBookDetails = useMemo(
    () => (
      <div className="c-detail__container">
        <h2>{t('book-details')}</h2>
        <div className="c-detail__book">
          <div className="c-detail__label">{t('form:nickname-label')}</div>
          <div className="c-detail__value">
            {isFetching ? (
              <Skeleton height={19} width={280} />
            ) : (
              lineItems.map((item) => item.customAttributes.Name).join(', ') || '-'
            )}
          </div>
          <div className="c-detail__label">{t('common:quantity')}</div>
          <div className="c-detail__value">
            {isFetching ? <Skeleton height={19} width={60} /> : `${lineItems.length} ${t('books')}`}
          </div>
          <div className="c-detail__label">{t('common:dedication-note')}</div>
          {isFetching ? (
            <Skeleton height={21} width={100} />
          ) : hasDedication ? (
            <div className="c-detail__link" onClick={handleShowNote}>
              {t('common:preview-note')}
            </div>
          ) : (
            '-'
          )}
        </div>
      </div>
    ),
    [t, isFetching, lineItems, hasDedication, handleShowNote],
  );

  /**
   * Renders order status section with dates and tracking information
   * Only shown when data is loaded (not fetching)
   */
  const renderOrderStatus = useMemo(() => {
    if (isFetching) return null;

    return (
      <div className="c-detail__container">
        <h2>{t('order-state')}</h2>
        <div className="c-detail__order">
          <div className="c-detail__label">{t('order-date')}</div>
          <div className="c-detail__value">{fullDate(currentOrder.created_at)}</div>
          <div className="c-detail__label">{t('order-state')}</div>
          <div className="c-detail__value capitalize">{t(currentOrder.state)}</div>
          <div className="c-detail__label">{t('shipping-date')}</div>
          <div className="c-detail__value">{fullDate(shippingDate) || '-'}</div>
          <div className="c-detail__label">{t('tracking-number')}</div>
          <div className="c-detail__value">{trackingNumber}</div>
        </div>
        <div className="c-detail__order__info">
          <div className="c-detail__order__info__item">{t('common:manufacturing-time')}</div>
        </div>
      </div>
    );
  }, [isFetching, t, currentOrder, shippingDate, trackingNumber]);

  /**
   * Renders shipping address section
   * Only shown when data is loaded (not fetching)
   */
  const renderShippingAddress = useMemo(() => {
    if (isFetching) return null;

    return (
      <div className="c-detail__container">
        <h2>{t('shipping-address')}</h2>
        <div className="c-detail__address">
          <div className="c-detail__label">{t('street-address')}</div>
          <div className="c-detail__value">{shippingAddress.address1}</div>
          <div className="c-detail__label">{t('province')}</div>
          <div className="c-detail__value">{shippingAddress.province}</div>
          <div className="c-detail__label">{t('postal-code')}</div>
          <div className="c-detail__value">{shippingAddress.zip}</div>
          <div className="c-detail__label">{t('city')}</div>
          <div className="c-detail__value">{shippingAddress.city}</div>
        </div>
      </div>
    );
  }, [isFetching, t, shippingAddress]);

  /**
   * Renders order summary section with pricing, discounts, and payment information
   * Includes conditional payment actions based on status
   */
  const renderOrderSummary = useMemo(() => {
    if (isFetching) return null;

    return (
      <div className="c-detail__container">
        <div className="c-detail__summary__header">
          <h2 style={{ marginBottom: 0 }}>{t('common:order-summary')}</h2>
          <Dot width="12px" color="red" />
        </div>

        {/* Main product line */}
        <div className="flex items-baseline justify-between">
          <div>
            <div className="c-detail__summary__title">Interactive Bookshop Next.js</div>
            <div className="c-detail__summary__label">
              {t('common:quantity')}: {lineItems.length}
            </div>
          </div>
          <div className="c-detail__summary__total">
            <NumberFormat
              value={currentOrder.total_line_items_price}
              thousandSeparator={true}
              prefix={'Rp'}
              displayType="text"
            />
          </div>
        </div>

        {/* Shipping costs */}
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

        {/* Discounts */}
        {discounts &&
          discounts.map((discount) => (
            <div key={discount.code} className="flex items-baseline justify-between" style={{ marginTop: 18 }}>
              <div>
                <div className="c-detail__summary__title">{t('common:discount-code')}</div>
                <div className="c-detail__summary__label">{discount.code}</div>
              </div>
              <div className="c-detail__summary__total">
                <NumberFormat value={-totalDiscounts} thousandSeparator={true} prefix={'Rp'} displayType="text" />
              </div>
            </div>
          ))}

        <Divider style={{ borderColor: '#EDEDED', margin: '20px 0 20px' }} />

        {/* Final total */}
        <div className="c-detail__summary__subtotal">
          <div>Subtotal</div>
          <NumberFormat value={currentOrder.total_price} thousandSeparator={true} prefix={'Rp'} displayType="text" />
        </div>

        {/* Payment information and actions */}
        {currentOrder.financial_status !== 'paid' && (
          <div className="c-detail__summary__info">
            {payment.type ? (
              <Fragment>
                <div className="c-detail__summary__info__item">
                  {t('awaiting-payment')} {payment.type}
                </div>
                {payment.instance ? (
                  <div className="flex items-end justify-between">
                    <div>
                      <div className="c-detail__summary__info__payment">{payment.instance}</div>
                      <div className="c-detail__summary__info__payment">{payment.number}</div>
                    </div>
                    <div className="c-detail__summary__info__copy" onClick={handleCopyToClipboard}>
                      {/* Hidden input for copying payment number to clipboard */}
                      <input
                        id="payment-number"
                        value={payment.number}
                        type="text"
                        style={{ position: 'absolute', left: 999 }}
                        readOnly
                      />
                      <span className="icon-duplicate" />
                    </div>
                  </div>
                ) : payment.url ? (
                  <div className="c-detail__summary__info__link">
                    <a href={payment.url} target="_blank" rel="noopener noreferrer">
                      {t('continue-payment')}
                    </a>
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
    );
  }, [
    isFetching,
    t,
    lineItems.length,
    currentOrder,
    shippingLine,
    shippingName,
    shippingCost,
    discounts,
    totalDiscounts,
    payment,
    handleCopyToClipboard,
    whatsappUrl,
  ]);

  /**
   * Renders dedication note content for the sheet modal
   * Shows character names and their dedication messages
   */
  const renderDedicationNotes = useMemo(
    () => (
      <div className="c-detail__note">
        {lineItems.map((item) => (
          <Fragment key={item.id}>
            <h5>{item.customAttributes.Name}</h5>
            <div>{item.customAttributes.Dedication}</div>
          </Fragment>
        ))}
      </div>
    ),
    [lineItems],
  );
  return (
    <DefaultLayout
      {...props}
      navbar={<NavBar setSideNav={props.setSideNav} menuAction={false} title={orderNumber} style={{ zIndex: 42 }} />}
    >
      <Head>
        <title>Interactive Bookshop Next.js | {orderNumber}</title>
      </Head>
      {isFetching ? (
        <Skeleton height={30} width={'100%'} />
      ) : (
        <Capsule
          color={appConfig.stateColor[currentOrder.state]}
          variant="bar"
          style={{ zIndex: 42, position: 'fixed', top: 59 }}
        >
          {t(currentOrder.state)}
          {currentOrder.state === 'received' && <span className="icon-cross_check" />}
        </Capsule>
      )}
      <div
        className={props.isMobile ? 'bg-dark-grey' : 'u-container u-container__page'}
        style={{ height: `calc(${screenHeight})` }}
      >
        <Swipeable
          onSwipedUp={() => setComponentState((prev) => ({ ...prev, extendPreview: true }))}
          onSwipedRight={() => setComponentState((prev) => ({ ...prev, extendPreview: true }))}
          onSwipedDown={() => (componentState.extendPreview ? null : handleExit())}
          onSwipedLeft={() => setComponentState((prev) => ({ ...prev, extendPreview: false }))}
        >
          <Sheet
            name="preview-sheet"
            isOpen={componentState.showPreview}
            closeSheet={handleExit}
            variant="rounded-large,bleed"
            onClick={() => setComponentState((prev) => ({ ...prev, extendPreview: true }))}
            content={
              <div className="c-detail">
                {/* Book details section with character names and quantities */}
                {renderBookDetails}

                {/* Order status and shipping information - only show when loaded */}
                {!isFetching && (
                  <Fragment>
                    {renderOrderStatus}
                    {renderShippingAddress}
                    {/* Order summary with pricing and payment information */}
                    {renderOrderSummary}
                  </Fragment>
                )}
              </div>
            }
          />
        </Swipeable>
        {!isFetching && (
          <Swipeable
            onSwipedUp={() => setComponentState((prev) => ({ ...prev, extendNote: true }))}
            onSwipedRight={() => setComponentState((prev) => ({ ...prev, extendNote: true }))}
            onSwipedDown={() =>
              componentState.extendNote
                ? setComponentState((prev) => ({ ...prev, extendNote: false }))
                : setComponentState((prev) => ({ ...prev, showNote: false }))
            }
            onSwipedLeft={() => setComponentState((prev) => ({ ...prev, extendNote: false }))}
          >
            <Sheet
              name="preview-sheet"
              isOpen={componentState.showNote}
              closeSheet={() => setComponentState((prev) => ({ ...prev, showNote: false }))}
              variant="rounded-large"
              overlay="light"
              onClick={() => setComponentState((prev) => ({ ...prev, extendNote: true }))}
              zIndexLevel={2}
              header={true}
              title={t(`common:note-preview`)}
              content={renderDedicationNotes}
            />
          </Swipeable>
        )}
      </div>
      <style jsx>{`
        /* ==============================================
         * ORDER DETAIL MOBILE STYLES
         * Mobile-optimized layout with sheet-based modals
         * ============================================== */

        /* Main container styles */
        .c-detail {
          @apply w-full;
          background: #e5e5e5;
          max-height: calc(${screenHeight} - 65px);
          ${componentState.extendPreview && !isFetching ? 'overflow: auto;' : 'position: absolute;'}

          /* Content container - white background sections */
          &__container {
            @apply bg-white;
            padding: 24px 16px;
            margin-bottom: 12px;

            h2 {
              @apply font-semibold;
              line-height: 24px;
              margin-bottom: 24px;
            }
          }

          /* Book details section */
          &__book {
            &__image {
              background: #f3bf45;
              border-radius: 12px;
              height: 136px;
              max-width: 136px;
              border: 2px solid #ededed;
            }
          }

          /* Order status and tracking info */
          &__order {
            &__info {
              @apply mt-6 text-sm;
              line-height: 24px;
              background: #f6f5f8;
              border-radius: 12px;
              padding: 20px;

              &__item {
                line-height: 20px;
              }
            }
          }

          /* Dedication notes modal content */
          &__note {
            @apply w-full;
            max-height: calc(${screenHeight} - 65px);
            ${componentState.extendNote ? 'overflow: auto;' : 'position: absolute;'}
            padding: 16px 0;

            h5 {
              @apply font-opensans text-sm font-bold;
              line-height: 19px;
              margin-bottom: 4px;
            }

            div {
              @apply font-opensans text-sm italic;
              line-height: 19px;
              margin-bottom: 16px;
            }
          }

          /* Address display */
          &__address {
            &__left {
              @apply w-7/12;
            }
            &__right {
              @apply w-5/12;
            }
          }

          /* Order summary and payment section */
          &__summary {
            &__label {
              @apply text-xs;
              color: #8c89a6;
            }

            &__header {
              @apply flex items-center;
              margin-bottom: 24px;

              h2 {
                margin-right: 8px;
              }
            }

            &__subtotal {
              @apply flex justify-between text-sm font-semibold;
            }

            &__title {
              @apply mb-1 text-sm;
              line-height: 19px;
            }

            &__total {
              @apply text-sm;
            }

            /* Payment information and actions */
            &__info {
              @apply text-sm;
              margin-top: 20px;
              line-height: 24px;
              background: #f6f5f8;
              border-radius: 12px;
              padding: 20px;

              &__item {
                @apply flex items-center;
                line-height: 20px;
                margin-bottom: 22px;
              }

              &__payment {
                @apply font-semibold;
                line-height: 21px;
              }

              &__link {
                @apply font-semibold;
                line-height: 21px;
                color: #445ca4;
              }

              &__copy {
                @apply cursor-pointer;
                font-size: 18px;
                padding-bottom: 3px;
              }
            }
          }

          /* Common label and value styles */
          &__label {
            @apply text-xs font-semibold;
            line-height: 18px;
            margin-bottom: 2px;
            color: #999;
          }

          &__value {
            @apply font-opensans text-sm;
            line-height: 19px;
            margin-bottom: 16px;

            &:last-child {
              @apply mb-0;
            }
          }

          /* Interactive link styles */
          &__link {
            @apply cursor-pointer text-sm font-semibold;
            color: #445ca4;
            line-height: 21px;
          }
        }
      `}</style>
    </DefaultLayout>
  );
};

export default OrderDetailMobile;
