import { withTranslation } from 'i18n';
import NumberFormat from 'react-number-format';
import { date } from 'lib/format-date';
import Card from 'components/atoms/Card';
import Dot from 'components/atoms/Dot';
import Capsule from 'components/atoms/Capsule';
import appConfig from 'config';

const OrderItem = (props: any) => {
  const previewImg = () => {
    const filePath = '/static/images/preview/child';
    const { gender, age, skin, hair } = props.line_items[0];
    return `${filePath}/${gender}_${age}_${skin}_${hair}.JPG`;
  };
  return (
    <div style={props.style}>
      <Card variant="border">
        <div className="c-order-item">
          <div className="c-order-item__preview">
            <div className="c-order-item__preview__image">
              <img src={previewImg()} />
            </div>
          </div>
          <div className="c-order-item__detail">
            <div className="c-order-item__detail--top">
              <div className="c-order-item__detail--top--left">
                <h2>{props.line_items.map(item => item.name).join(', ')}</h2>
              </div>
              <div className="c-order-item__detail--top--right">
                <Capsule color={appConfig.stateColor[props.state]}>
                  {props.t(props.state)}
                  {props.state === 'received' && (
                    <span className="icon-cross_check" style={{ marginLeft: 8, fontSize: 20 }} />
                  )}
                </Capsule>
              </div>
            </div>
            <div className="c-order-item__detail__occupation">
              {props.line_items.length} {props.t('books')}
            </div>
            <div className="c-order-item__detail--middle">
              <div style={{ marginRight: 100 }}>
                <div className="c-order-item__detail__label">{props.t('order-id')}</div>
                <div className="c-order-item__detail__value">{props.order_id}</div>
              </div>
              <div>
                <div className="c-order-item__detail__label">{props.t('order-date')}</div>
                <div className="c-order-item__detail__value">{date(props.created_at)}</div>
              </div>
            </div>
            <div className="c-order-item__detail--bottom">
              <div className="c-order-item__detail__cover">
                <Dot width="16px" color={props.cover} />
                {props.cover}
              </div>
              <div className="c-order-item__detail__price">
                <NumberFormat value={props.price} thousandSeparator={true} prefix={'Rp'} displayType="text" />
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
              background: #efeef4;
              width: 142px;
              height: 180px;
              border-radius: 12px;
            }
          }
          &__detail {
            @apply w-4/5;
            &--top {
              @apply flex justify-between items-center;
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
              @apply flex justify-between items-center;
            }
            &__cover {
              @apply flex text-xs items-center;
              width: 100px;
              padding: 6px 8px;
              background: #f2f2f6;
              border-radius: 60px;
            }
            &__label {
              @apply text-sm font-opensans;
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

export default withTranslation('page-orders')(OrderItem);
