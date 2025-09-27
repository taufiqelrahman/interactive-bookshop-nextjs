import { useTranslation } from 'next-i18next';
import Skeleton from 'react-loading-skeleton';
import NumberFormat from 'react-number-format';

import Capsule from 'components/atoms/Capsule';
import Card from 'components/atoms/Card';
import Divider from 'components/atoms/Divider';
import appConfig from 'config';
import { mapKeyValue } from 'lib/format-array';
import { date } from 'lib/format-date';
import { getPreviewUrl } from 'lib/format-image';
import { useResponsive } from 'lib/hooks/useResponsive';
import { Order } from 'store/orders/types';

interface OrderItemProps extends Order {
  style?: React.CSSProperties;
  isSkeleton?: boolean;
  [key: string]: any;
}

const OrderItem = (props: OrderItemProps) => {
  const { isMobile } = useResponsive();
  const { t } = useTranslation('page-orders');
  const lineItems = (props.line_items || []).map((item) => ({
    ...item,
    customAttributes: mapKeyValue(item.properties || []),
  }));
  const previewImg = (item) => {
    if (!item.customAttributes) return '';
    return getPreviewUrl(item.customAttributes);
  };

  if (isMobile) {
    return (
      <div style={props.style}>
        <Card variant="border--light,square--light">
          <div className="c-order-item">
            <div className="c-order-item__detail">
              <div className="c-order-item__detail--top">
                <div className="c-order-item__detail--top--left">
                  {props.isSkeleton ? <Skeleton height={16} width={80} /> : props.name.replace('#', '')}
                </div>
                <div className="c-order-item__detail--top--right">
                  {props.isSkeleton ? <Skeleton height={16} width={70} /> : date(props.created_at, 'DD/MM/YYYY')}
                </div>
              </div>
              <div className="c-order-item__detail--middle">
                <div>
                  <div className="c-order-item__detail__occupation">
                    {props.isSkeleton ? (
                      <Skeleton height={24} width={180} />
                    ) : (
                      lineItems.map((item) => item.customAttributes.Name).join(', ')
                    )}
                  </div>
                  <div className="c-order-item__detail__books">
                    {props.isSkeleton ? <Skeleton height={19} width={70} /> : `${lineItems.length} ${t('books')}`}
                  </div>
                </div>
                {props.isSkeleton ? (
                  <Skeleton height={47} width={47} />
                ) : (
                  <div className="c-order-item__detail__image">
                    <img src={previewImg(lineItems[0])} alt="item preview" />
                  </div>
                )}
              </div>
              <Divider style={{ borderColor: '#EFEEF4', margin: '3px 0 9px' }} />
              <div className="c-order-item__detail--bottom">
                <div className="c-order-item__detail__price">
                  {props.isSkeleton ? (
                    <Skeleton height={24} width={80} />
                  ) : (
                    <NumberFormat value={props.total_price} thousandSeparator={true} prefix={'Rp'} displayType="text" />
                  )}
                </div>
              </div>
            </div>
          </div>
        </Card>
        <style jsx>{`
          .c-order-item {
            @apply flex items-center;
            padding: 14px 16px;
            &__detail {
              @apply w-full;
              &--top {
                @apply flex items-center justify-between font-opensans text-xs;
                color: #898699;
              }
              &__image {
                @apply overflow-hidden;
                padding: 4px;
                background: #efeef4;
                width: 47px;
                height: 47px;
                border-radius: 6px;
              }
              &__occupation {
                @apply font-semibold;
                line-height: 24px;
              }
              &--middle {
                @apply flex items-center justify-between;
                margin: 13px 0;
              }
              &__books {
                @apply font-opensans text-sm;
                line-height: 19px;
                margin-top: 3px;
              }
              &__value {
                @apply font-opensans font-semibold;
                line-height: 24px;
              }
              &__price {
                @apply font-semibold;
                line-height: 24px;
              }
            }
          }
        `}</style>
      </div>
    );
  }
  return (
    <div style={props.style}>
      <Card variant="border">
        <div className="c-order-item">
          <div className="c-order-item__preview">
            {props.isSkeleton ? (
              <Skeleton height={180} width={142} />
            ) : (
              <div className="c-order-item__preview__image">
                <img src={previewImg(lineItems[0])} alt="item preview" />
              </div>
            )}
          </div>
          <div className="c-order-item__detail">
            <div className="c-order-item__detail--top">
              <div className="c-order-item__detail--top--left">
                {props.isSkeleton ? (
                  <Skeleton height={30} width={350} />
                ) : (
                  <h2>{lineItems.map((item) => item.customAttributes.Name).join(', ')}</h2>
                )}
              </div>
              <div className="c-order-item__detail--top--right">
                {props.isSkeleton ? (
                  <Skeleton height={30} width={135} />
                ) : (
                  <Capsule color={appConfig.stateColor[props.state]}>
                    {t(props.state)}
                    {props.state === 'done' && <span className="icon-cross_check" />}
                  </Capsule>
                )}
              </div>
            </div>
            <div className="c-order-item__detail__occupation">
              {props.isSkeleton ? <Skeleton height={22} width={80} /> : `${lineItems.length} ${t('books')}`}
            </div>
            <div className="c-order-item__detail--middle">
              <div style={{ marginRight: 100 }}>
                <div className="c-order-item__detail__label">
                  {props.isSkeleton ? <Skeleton height={20} width={60} /> : t('order-id')}
                </div>
                <div className="c-order-item__detail__value">
                  {props.isSkeleton ? <Skeleton height={25} width={150} /> : props.name.replace('#', '')}
                </div>
              </div>
              <div>
                <div className="c-order-item__detail__label">
                  {props.isSkeleton ? <Skeleton height={20} width={75} /> : t('order-date')}
                </div>
                <div className="c-order-item__detail__value">
                  {props.isSkeleton ? <Skeleton height={25} width={250} /> : date(props.created_at)}
                </div>
              </div>
            </div>
            <div className="c-order-item__detail--bottom">
              {/* <div className="c-order-item__detail__cover">
                <Dot width="16px" color={props.line_items[0].cover} />
                {props.line_items[0].cover}
              </div> */}
              <div className="c-order-item__detail__price">
                {props.isSkeleton ? (
                  <Skeleton height={30} width={120} />
                ) : (
                  <NumberFormat value={props.total_price} thousandSeparator={true} prefix={'Rp'} displayType="text" />
                )}
              </div>
            </div>
          </div>
        </div>
      </Card>
      <style jsx>{`
        .c-order-item {
          @apply flex items-center;
          padding: 18px 24px;
          &__preview {
            @apply w-1/5;
            margin-right: 24px;
            &__image {
              @apply overflow-hidden;
              padding: 4px;
              background: #efeef4;
              width: 142px;
              height: 180px;
              border-radius: 12px;
            }
          }
          &__detail {
            @apply w-4/5;
            &--top {
              @apply flex items-center justify-between;
              &--left {
                h2 {
                  @apply font-bold;
                  font-size: 28px;
                  line-height: 42px;
                }
              }
            }
            &__occupation {
              @apply font-opensans;
              line-height: 22px;
            }
            &--middle {
              @apply flex;
              margin: 18px 0;
            }
            &--bottom {
              @apply flex items-center justify-end;
            }
            &__cover {
              @apply flex items-center text-xs;
              width: 100px;
              padding: 6px 8px;
              background: #f2f2f6;
              border-radius: 60px;
            }
            &__label {
              @apply font-opensans text-sm;
              line-height: 19px;
              margin-bottom: 3px;
              color: #999;
            }
            &__value {
              @apply font-opensans font-semibold;
              line-height: 24px;
            }
            &__price {
              @apply font-semibold;
              font-size: 20px;
              line-height: 30px;
            }
          }
        }
      `}</style>
    </div>
  );
};

export default OrderItem;
