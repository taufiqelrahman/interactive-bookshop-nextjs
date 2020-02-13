import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from 'lib/with-redux-store';
import { withTranslation } from 'i18n';
import DefaultLayout from 'components/layouts/Default';
import Stepper from 'components/atoms/Stepper';
import dummyOrders from '_mocks/orders';
import Card from 'components/atoms/Card';
import NumberFormat from 'react-number-format';
import Divider from 'components/atoms/Divider';

const OrderDetail = (props: any): any => {
  const dummyOrder = dummyOrders[0];
  const previewImg = () => {
    const filePath = '/static/images/preview/child';
    const { gender, age, skin, hair } = dummyOrder;
    return `${filePath}/${gender}_${age}_${skin}_${hair}.JPG`;
  };
  return (
    <DefaultLayout {...props}>
      <div className="bg-light-grey h-min-screen">
        <div className="u-container u-container__page">
          <Stepper title={props.t('orders-title')} />
          <div className="c-detail-section">
            <div className="c-detail-section__left">
              <Card variant="border" style={{ marginBottom: 12 }}>
                <div className="c-detail__container">
                  <h2>{props.t('book-detail')}</h2>
                  <div className="flex">
                    <div className="c-detail__book__left">
                      <div className="c-detail__book__image">
                        <img src={previewImg()} />
                      </div>
                    </div>
                    <div className="c-detail__book__middle">
                      <div className="c-detail__label">{props.t('form:name-label')}</div>
                      <div className="c-detail__value">{dummyOrder.name}</div>
                      <div className="c-detail__label">{props.t('form:dream-occupation')}</div>
                      <div className="c-detail__value">{dummyOrder.occupation}</div>
                    </div>
                    <div className="c-detail__book__right">
                      <div className="c-detail__label">{props.t('form:dedication-note')}</div>
                      <div className="c-detail__link">{props.t('form:preview-note')}</div>
                    </div>
                  </div>
                </div>
              </Card>
              <Card variant="border">
                <div className="c-detail__container">
                  <h2>{props.t('shipping-address')}</h2>
                  <div className="flex">
                    <div className="c-detail__address__left">
                      <div className="c-detail__label">{props.t('form:street-address')}</div>
                      <div className="c-detail__value">{dummyOrder.name}</div>
                      <div className="c-detail__label">{props.t('form:province')}</div>
                      <div className="c-detail__value">{dummyOrder.occupation}</div>
                    </div>
                    <div className="c-detail__address__right">
                      <div className="c-detail__label">{props.t('form:postal-code')}</div>
                      <div className="c-detail__value">{dummyOrder.occupation}</div>
                      <div className="c-detail__label">{props.t('form:city-district')}</div>
                      <div className="c-detail__value">{dummyOrder.occupation}</div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
            <div className="c-detail-section__right">
              <Card variant="border">
                <div className="c-detail__container">
                  <h2>{props.t('order-summary')}</h2>
                  <div className="flex justify-between">
                    <div>
                      <div className="c-detail__summary__title">When I Grow Up</div>
                      <div className="c-detail__summary__quantity">{props.t('quantity')}: 3</div>
                    </div>
                    <div className="c-detail__summary__total">
                      <NumberFormat value={300000} thousandSeparator={true} prefix={'Rp'} displayType="text" />
                    </div>
                  </div>
                  <Divider style={{ borderColor: '#EDEDED', margin: '24px 0 24px' }} />
                  <div className="c-detail__summary__subtotal">
                    <div>Subtotal</div>
                    <NumberFormat value={900000} thousandSeparator={true} prefix={'Rp'} displayType="text" />
                  </div>
                  <div className="c-detail__summary__info">
                    <span className="icon-info" />
                    {props.t('shipping-not-included')}
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .c-detail {
          &-section {
            @apply flex w-full;
            padding: 31px 0;
            &__left {
              @apply w-full;
              @screen xl {
                @apply w-2/3;
                margin-right: 30px;
              }
            }
            &__right {
              @apply w-full;
              @screen xl {
                @apply w-1/3;
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
              @apply w-3/12;
            }
            &__middle {
              @apply w-4/12;
            }
            &__right {
              @apply w-5/12;
            }
            &__image {
              background: #f3bf45;
              border-radius: 12px;
              height: 136px;
              width: 136px;
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

export default withTranslation(['page-orders', 'form'])(connect(mapStateToProps, mapDispatchToProps)(OrderDetail));
