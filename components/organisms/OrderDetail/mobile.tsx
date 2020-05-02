import { withTranslation, Router } from 'i18n';
import DefaultLayout from 'components/layouts/Default';
// import dummyOrder from '_mocks/orderDetail';
import NumberFormat from 'react-number-format';
import Divider from 'components/atoms/Divider';
import appConfig from 'config';
import { useState, useEffect, Fragment } from 'react';
import Capsule from 'components/atoms/Capsule';
import { fullDate } from 'lib/format-date';
import NavBar from 'components/organisms/NavBar/mobile';
import { retrieveInfo } from './helper';
import Sheet from 'components/atoms/Sheet';
import { Swipeable } from 'react-swipeable';
import Dot from 'components/atoms/Dot';
import Skeleton from 'react-loading-skeleton';
import Head from 'next/head';

const OrderDetailMobile = (props: any): any => {
  const { isFetching, currentOrder: order } = props.state.orders;
  const [state, setState] = useState({
    showPreview: false,
    extendPreview: false,
    showNote: false,
    extendNote: false,
  });
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
  } = retrieveInfo(order || {});
  useEffect(() => {
    setState({ ...state, showPreview: true });
  }, []);
  const onExit = () => {
    setState({ ...state, showPreview: false });
    Router.push('/orders');
  };
  const screenHeight = '100vh - 59px';
  const showNote = event => {
    event.stopPropagation();
    setState({ ...state, showNote: true });
  };
  return (
    <DefaultLayout
      {...props}
      navbar={<NavBar setSideNav={props.setSideNav} menuAction={false} title={orderNumber} style={{ zIndex: 42 }} />}
    >
      <Head>
        <title>When I Grow Up | {orderNumber}</title>
      </Head>
      <div
        className={props.isMobile ? 'bg-dark-grey' : 'u-container u-container__page'}
        style={{ height: `calc(${screenHeight})` }}
      >
        {isFetching ? (
          <Skeleton height={30} width={'100%'} />
        ) : (
          <Capsule
            color={appConfig.stateColor[currentOrder.state]}
            variant="bar"
            style={{ zIndex: 42, position: 'absolute', top: 0, left: 0, right: 0 }}
          >
            {props.t(currentOrder.state)}
            {props.state === 'received' && <span className="icon-cross_check" />}
          </Capsule>
        )}
        <Swipeable
          onSwipedUp={() => setState({ ...state, extendPreview: true })}
          onSwipedRight={() => setState({ ...state, extendPreview: true })}
          onSwipedDown={() => (state.extendPreview ? null : onExit())}
          onSwipedLeft={() => setState({ ...state, extendPreview: false })}
        >
          <Sheet
            name="preview-sheet"
            isOpen={state.showPreview}
            closeSheet={onExit}
            variant="rounded-large,bleed"
            onClick={() => setState({ ...state, extendPreview: true })}
            content={
              <div className="c-detail">
                <div className="c-detail__container">
                  <h2>{props.t('book-details')}</h2>
                  <div className="c-detail__book">
                    <div className="c-detail__label">{props.t('form:name-label')}</div>
                    <div className="c-detail__value">
                      {isFetching ? (
                        <Skeleton height={19} width={280} />
                      ) : (
                        lineItems.map(item => item.customAttributes.Name).join(', ') || '-'
                      )}
                    </div>
                    <div className="c-detail__label">{props.t('common:quantity')}</div>
                    <div className="c-detail__value">
                      {isFetching ? <Skeleton height={19} width={60} /> : `${lineItems.length} ${props.t('books')}`}
                    </div>
                    <div className="c-detail__label">{props.t('common:dedication-note')}</div>
                    {isFetching ? (
                      <Skeleton height={21} width={100} />
                    ) : hasDedication ? (
                      <div className="c-detail__link" onClick={showNote}>
                        {props.t('common:preview-note')}
                      </div>
                    ) : (
                      '-'
                    )}
                  </div>
                </div>
                {!isFetching && (
                  <Fragment>
                    <div className="c-detail__container">
                      <h2>{props.t('order-state')}</h2>
                      <div className="c-detail__order">
                        <div className="c-detail__label">{props.t('order-date')}</div>
                        <div className="c-detail__value">{fullDate(currentOrder.created_at)}</div>
                        <div className="c-detail__label">{props.t('order-state')}</div>
                        <div className="c-detail__value capitalize">{props.t(currentOrder.state)}</div>
                        <div className="c-detail__label">{props.t('shipping-date')}</div>
                        <div className="c-detail__value">{fullDate(shippingDate) || '-'}</div>
                        <div className="c-detail__label">{props.t('tracking-number')}</div>
                        <div className="c-detail__value">{trackingNumber}</div>
                      </div>
                    </div>
                    <div className="c-detail__container">
                      <h2>{props.t('shipping-address')}</h2>
                      <div className="c-detail__address">
                        <div className="c-detail__label">{props.t('street-address')}</div>
                        <div className="c-detail__value">{shippingAddress.address1}</div>
                        <div className="c-detail__label">{props.t('province')}</div>
                        <div className="c-detail__value">{shippingAddress.province}</div>
                        <div className="c-detail__label">{props.t('postal-code')}</div>
                        <div className="c-detail__value">{shippingAddress.zip}</div>
                        <div className="c-detail__label">{props.t('city')}</div>
                        <div className="c-detail__value">{shippingAddress.city}</div>
                      </div>
                    </div>
                    <div className="c-detail__container">
                      <div className="c-detail__summary__header">
                        <h2 style={{ marginBottom: 0 }}>{props.t('common:order-summary')}</h2>
                        <Dot width="12px" color="red" />
                      </div>
                      <div className="flex justify-between items-baseline">
                        <div>
                          <div className="c-detail__summary__title">When I Grow Up</div>
                          <div className="c-detail__summary__label">
                            {props.t('common:quantity')}: {lineItems.length}
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
                      {shippingLine && (
                        <div className="flex justify-between items-baseline" style={{ marginTop: 16 }}>
                          <div>
                            <div className="c-detail__summary__title">{props.t('shipping-cost')}</div>
                            <div className="c-detail__summary__label">{shippingName}</div>
                          </div>
                          <div className="c-detail__summary__total">
                            <NumberFormat
                              value={shippingCost}
                              thousandSeparator={true}
                              prefix={'Rp'}
                              displayType="text"
                            />
                          </div>
                        </div>
                      )}
                      {discounts &&
                        discounts.map(discount => (
                          <div
                            key={discount.code}
                            className="flex justify-between items-baseline"
                            style={{ marginTop: 18 }}
                          >
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
                      <Divider style={{ borderColor: '#EDEDED', margin: '20px 0 20px' }} />
                      <div className="c-detail__summary__subtotal">
                        <div>Subtotal</div>
                        <NumberFormat
                          value={currentOrder.total_price}
                          thousandSeparator={true}
                          prefix={'Rp'}
                          displayType="text"
                        />
                      </div>
                      {currentOrder.financial_status !== 'paid' && (
                        <div className="c-detail__summary__info">
                          <a href={currentOrder.order_status_url}>{props.t('continue-payment')}</a>
                        </div>
                      )}
                    </div>
                  </Fragment>
                )}
              </div>
            }
          />
        </Swipeable>
        {!isFetching && (
          <Swipeable
            onSwipedUp={() => setState({ ...state, extendNote: true })}
            onSwipedRight={() => setState({ ...state, extendNote: true })}
            onSwipedDown={() =>
              state.extendNote ? setState({ ...state, extendNote: false }) : setState({ ...state, showNote: false })
            }
            onSwipedLeft={() => setState({ ...state, extendNote: false })}
          >
            <Sheet
              name="preview-sheet"
              isOpen={state.showNote}
              closeSheet={() => setState({ ...state, showNote: false })}
              variant="rounded-large"
              overlay="light"
              onClick={() => setState({ ...state, extendNote: true })}
              zIndexLevel={2}
              header={true}
              title={props.t(`common:note-preview`)}
              content={
                <div className="c-detail__note">
                  {lineItems.map(item => (
                    <Fragment key={item.id}>
                      <h5>{item.customAttributes.Name}</h5>
                      <div>{item.customAttributes.Dedication}</div>
                    </Fragment>
                  ))}
                </div>
              }
            />
          </Swipeable>
        )}
      </div>
      <style jsx>{`
        .c-detail {
          @apply w-full;
          background: #e5e5e5;
          max-height: calc(${screenHeight} - 65px);
          ${state.extendPreview && !isFetching ? 'overflow: auto;' : 'position: absolute;'}
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
          &__note {
            @apply w-full;
            max-height: calc(${screenHeight} - 65px);
            ${state.extendNote ? 'overflow: auto;' : 'position: absolute;'}
            padding: 16px 0;
            h5 {
              @apply text-sm font-opensans font-bold;
              line-height: 19px;
              margin-bottom: 4px;
            }
            div {
              @apply font-opensans text-sm italic;
              line-height: 19px;
              margin-bottom: 16px;
            }
          }
          &__book {
            &__image {
              background: #f3bf45;
              border-radius: 12px;
              height: 136px;
              max-width: 136px;
              border: 2px solid #ededed;
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
            &__header {
              @apply flex items-center;
              margin-bottom: 24px;
              h2 {
                margin-right: 8px;
              }
            }
            &__subtotal {
              @apply flex justify-between font-semibold text-sm;
            }
            &__title {
              @apply mb-1 text-sm;
              line-height: 19px;
            }
            &__info {
              @apply text-sm font-semibold;
              color: #445ca4;
              margin-top: 20px;
              line-height: 24px;
            }
            &__total {
              @apply text-sm;
            }
          }
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
          &__link {
            @apply font-semibold cursor-pointer text-sm;
            color: #445ca4;
            line-height: 21px;
          }
        }
      `}</style>
    </DefaultLayout>
  );
};

export default withTranslation(['page-orders', 'form', 'common'])(OrderDetailMobile);
