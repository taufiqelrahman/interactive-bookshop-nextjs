import { withTranslation } from 'i18n';
import NumberFormat from 'react-number-format';
import { date } from 'lib/format-date';
import Card from 'components/atoms/Card';
import { previewImg } from './helper';
import Divider from 'components/atoms/Divider';

const OrderItem = (props: any) => {
  return (
    <div style={props.style}>
      <Card variant="border--light,square--light">
        <div className="c-order-item">
          <div className="c-order-item__detail">
            <div className="c-order-item__detail--top">
              <div className="c-order-item__detail--top--left">{props.order_id}</div>
              <div className="c-order-item__detail--top--right">{date(props.created_at, 'DD/MM/YYYY')}</div>
            </div>
            <div className="c-order-item__detail--middle">
              <div>
                <div className="c-order-item__detail__occupation">
                  {props.line_items.map(item => item.name).join(', ')}
                </div>
                <div className="c-order-item__detail__books">
                  {props.line_items.length} {props.t('books')}
                </div>
              </div>
              <div className="c-order-item__detail__image">
                <img src={previewImg(props.line_items[0])} />
              </div>
            </div>
            <Divider style={{ borderColor: '#EFEEF4', margin: '3px 0 9px' }} />
            <div className="c-order-item__detail--bottom">
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
          padding: 14px 16px;
          &__detail {
            @apply w-full;
            &--top {
              @apply flex justify-between items-center font-opensans text-xs;
              color: #898699;
            }
            &__image {
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
              @apply flex justify-between items-center;
              margin: 13px 0;
            }
            &__books {
              @apply text-sm font-opensans;
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
};

export default withTranslation('page-orders')(OrderItem);
