import { withTranslation } from 'i18n';
import NumberFormat from 'react-number-format';
import Card from 'components/atoms/Card';
import Dot from 'components/atoms/Dot';
import Divider from 'components/atoms/Divider';
// import { useState, useEffect } from 'react';

const CartItem = (props: any) => {
  const previewImg = () => {
    const filePath = '/static/images/preview/child';
    const { gender, age, skin, hair } = props.attributes;
    return `${filePath}/${gender}_${age}_${skin}_${hair}.JPG`;
  };
  return (
    <div style={props.style}>
      <Card variant="border">
        <div className="c-cart-item">
          <div className="c-cart-item__preview">
            <div className="c-cart-item__preview__image">
              <img src={previewImg()} />
            </div>
            <div className="c-cart-item__preview__cover">
              <Dot width="16px" color={props.attributes.cover} />
              {props.attributes.cover}
            </div>
          </div>
          <div className="c-cart-item__detail">
            <div className="c-cart-item__detail--top">
              <div className="c-cart-item__detail--top--left">
                <div className="c-cart-item__detail__label">Name</div>
                <div className="c-cart-item__detail__value">{props.attributes.name}</div>
                <div className="c-cart-item__detail__label">Dream Occupations</div>
                <div className="c-cart-item__detail__value">{props.attributes.occupation}</div>
              </div>
              <div className="c-cart-item__detail--top--right">
                <div className="c-cart-item__detail__label">Dedication Notes</div>
                <div className="c-cart-item__detail__link">Preview Notes</div>
              </div>
            </div>
            <Divider style={{ borderColor: '#EDEDED', margin: '8px 0 18px' }} />
            <div className="c-cart-item__detail--bottom">
              <div className="c-cart-item__detail__price">
                <NumberFormat value={props.price} thousandSeparator={true} prefix={'Rp'} displayType="text" />
              </div>
              <div className="c-cart-item__detail__actions">
                {/* <span className="c-cart-item__detail__actions__icon icon-edit" /> */}
                <span className="c-cart-item__detail__actions__icon icon-trash" />
                <div className="c-cart-item__detail__quantity">
                  <span className="c-cart-item__detail__quantity__button c-cart-item__detail__quantity__minus">-</span>
                  <input type="number" value={props.quantity} />
                  <span className="c-cart-item__detail__quantity__button c-cart-item__detail__quantity__plus">+</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
      <style jsx>{`
        .c-cart-item {
          @apply flex;
          padding: 18px 24px;
          &__preview {
            @apply w-1/5;
            margin-right: 18px;
            &__image {
              background: #f3bf45;
              width: 100px;
              height: 100px;
              border-radius: 12px;
            }
            &__cover {
              @apply flex text-xs items-center;
              width: 100px;
              padding: 6px 8px;
              background: #f2f2f6;
              border-radius: 60px;
              margin-top: 8px;
            }
          }
          &__detail {
            @apply w-4/5;
            &--top {
              @apply flex;
              &--left {
                @apply w-3/5;
              }
            }
            &--bottom {
              @apply flex justify-between items-center;
            }
            &__price {
              @apply font-semibold;
              font-size: 20px;
              line-height: 30px;
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
              @apply font-semibold;
              color: #445ca4;
              line-height: 24px;
            }
            &__actions {
              @apply flex items-center;
              &__icon {
                @apply cursor-pointer;
                margin-right: 24px;
                font-size: 24px;
              }
            }
            &__quantity {
              @apply overflow-hidden;
              border: 1px solid #e1e1e1;
              border-radius: 5px;
              input {
                @apply text-center;
                width: 68px;
                height: 36px;
              }
              input::-webkit-outer-spin-button,
              input::-webkit-inner-spin-button {
                /* display: none; <- Crashes Chrome on hover */
                -webkit-appearance: none;
                margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
              }
              input[type='number'] {
                -moz-appearance: textfield; /* Firefox */
              }
              &__button {
                @apply text-white cursor-pointer;
                padding: 6px 12px;
                height: 36px;
                background: #e1e1e1;
                border: 1px solid #e1e1e1;
              }
            }
          }
        }
      `}</style>
    </div>
  );
};

export default withTranslation('form')(CartItem);
