import { withTranslation, Router } from 'i18n';
import DefaultLayout from 'components/layouts/Default';
import dummyOrder from '_mocks/orderDetail';
import Card from 'components/atoms/Card';
import NumberFormat from 'react-number-format';
import Divider from 'components/atoms/Divider';
import Popover from 'components/atoms/Popover';
import appConfig from 'config';
import { Fragment, useState, useEffect } from 'react';
import Capsule from 'components/atoms/Capsule';
import { fullDate } from 'lib/format-date';
import NavBar from 'components/organisms/NavBar/mobile';
import { retrieveInfo, previewImg } from './helper';
import Sheet from 'components/atoms/Sheet';

const OrderDetailMobile = (props: any): any => {
  const [showPreview, setShowPreview] = useState(false);
  const {
    currentOrder,
    shippingAddress,
    orderState,
    shippingDate,
    trackingNumber,
    shippingLine,
    shippingName,
    shippingCost,
    orderNumber,
  } = retrieveInfo(dummyOrder);
  useEffect(() => {
    setShowPreview(true);
  }, []);
  const onExit = () => {
    setShowPreview(false);
    Router.push('/orders');
  };
  return (
    <DefaultLayout {...props} navbar={<NavBar setSideNav={props.setSideNav} menuAction={false} title={orderNumber} />}>
      <div
        className={props.isMobile ? 'bg-dark-grey' : 'u-container u-container__page'}
        style={{ minHeight: 'calc(100vh - 59px)' }}
      >
        <Capsule color={appConfig.stateColor[orderState]} variant="bar">
          {props.t(orderState)}
          {props.state === 'received' && <span className="icon-cross_check" />}
        </Capsule>
      </div>
      <Sheet
        name="preview-sheet"
        isOpen={showPreview}
        closeSheet={onExit}
        variant="rounded-large"
        content={
          <Fragment>
            <div className="c-detail__container">
              <h2>{props.t('book-details')}</h2>
              <div className="c-detail__book">
                <div className="c-detail__label">{props.t('form:name-label')}</div>
                <div className="c-detail__value" style={{ marginBottom: 16 }}>
                  {currentOrder.line_items.map(item => item.name).join(', ')}
                </div>
                <div className="c-detail__label">{props.t('common:quantity')}</div>
                <div className="c-detail__value" style={{ marginBottom: 16 }}>
                  {currentOrder.line_items.length} {props.t('books')}
                </div>
                <div className="c-detail__label">{props.t('common:dedication-note')}</div>
                <div className="c-detail__link">{props.t('common:preview-note')}</div>
              </div>
            </div>
          </Fragment>
        }
      />
      <style jsx>{`
        .c-detail {
          &__container {
            padding: 8px 0;
            h2 {
              @apply font-semibold;
              font-size: 20px;
              line-height: 30px;
              margin-bottom: 24px;
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
            &__subtotal {
              @apply flex justify-between font-semibold;
            }
            &__title {
              @apply mb-1;
              line-height: 24px;
            }
            &__info {
              @apply text-sm font-semibold;
              color: #445ca4;
              margin-top: 12px;
              line-height: 24px;
            }
          }
          &__label {
            @apply text-xs font-semibold;
            line-height: 18px;
            margin-bottom: 3px;
            color: #999;
          }
          &__value {
            @apply font-opensans;
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

export default withTranslation(['page-orders', 'form', 'common'])(OrderDetailMobile);
