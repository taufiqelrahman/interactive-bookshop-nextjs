import { withTranslation } from 'i18n';
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
              <div>
                <div className="c-cart-item__detail__label">Name</div>
                <div className="c-cart-item__detail__value">{props.attributes.name}</div>
                <div className="c-cart-item__detail__label">Dream Occupations</div>
                <div className="c-cart-item__detail__value">{props.attributes.occupation}</div>
              </div>
              <div>
                <div className="c-cart-item__detail__label">Dedication Notes</div>
                <div className="c-cart-item__detail__link">Preview Notes</div>
              </div>
            </div>
            <Divider />
            <div className="c-cart-item__detail--bottom">
              <div className="c-cart-item__detail__price">{props.price}</div>
              <div className="c-cart-item__detail__actions">
                <span className="icon-chevron_left" />
                <span className="icon-chevron_left" />
                quantity-editor
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
            }
            &--bottom {
              @apply flex;
            }
            &__label {
              @apply text-xs font-semibold;
              line-height: 18px;
              margin-bottom: 3px;
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
          }
        }
      `}</style>
    </div>
  );
};

export default withTranslation('form')(CartItem);
