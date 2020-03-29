import { withTranslation, Router } from 'i18n';
import { useEffect, useState, useRef, useCallback, Fragment } from 'react';
import NumberFormat from 'react-number-format';
import debounce from 'lodash.debounce';
import Card from 'components/atoms/Card';
import Dot from 'components/atoms/Dot';
import Divider from 'components/atoms/Divider';
import Popover from 'components/atoms/Popover';
import { previewImg, updateQuantity } from './helper';
import Skeleton from 'react-loading-skeleton';
import Modal from 'components/atoms/Modal';
import Button from 'components/atoms/Button';

const CartItem = (props: any) => {
  const [quantity, setQuantity] = useState(props.quantity);
  const [showModal, setShowModal] = useState(false);
  const onDecrease = () => {
    if (quantity === 1) {
      setShowModal(true);
    } else if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };
  const debouncedFunctionRef = useRef();
  (debouncedFunctionRef.current as any) = () => updateQuantity(props, quantity);
  const debouncedChange = useCallback(
    debounce(() => (debouncedFunctionRef.current as any)(), 1000),
    [],
  );
  const isFirstRun = useRef(true);
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    debouncedChange();
  }, [quantity]);
  const editItem = () => {
    props.saveSelected({
      id: props.id,
      quantity: props.quantity,
      ...props.customAttributes,
    });
    Router.push('/create');
  };

  return (
    <div style={props.style}>
      <Card variant="border">
        <div className="c-cart-item">
          <div className="c-cart-item__preview">
            {props.isSkeleton ? (
              <Skeleton height={100} width={100} />
            ) : (
              <div className="c-cart-item__preview__image">
                <img src={previewImg(props.customAttributes)} />
              </div>
            )}
            {props.isSkeleton ? (
              <div style={{ marginTop: 8 }}>
                <Skeleton width={100} />
              </div>
            ) : (
              <div className="c-cart-item__preview__cover">
                <Dot width="16px" color={props.customAttributes.Cover} />
                {props.customAttributes.Cover}
              </div>
            )}
          </div>
          <div className="c-cart-item__detail">
            <div className="c-cart-item__detail--top">
              <div className="c-cart-item__detail--top--left">
                <div className="c-cart-item__detail__label">
                  {props.isSkeleton ? <Skeleton /> : props.t('form:name-label')}
                </div>
                <div className="c-cart-item__detail__value">
                  {props.isSkeleton ? <Skeleton /> : props.customAttributes.Name}
                </div>
                <div className="c-cart-item__detail__label">
                  {props.isSkeleton ? <Skeleton /> : props.t('dream-occupation')}
                </div>
                <div className="c-cart-item__detail__value">
                  {props.isSkeleton ? <Skeleton /> : props.customAttributes.Occupations}
                </div>
              </div>
              {!props.isSkeleton && props.customAttributes.Dedication && (
                <div className="c-cart-item__detail--top--right">
                  <div className="c-cart-item__detail__label">{props.t('dedication-note')}</div>
                  <Popover content={props.customAttributes.Dedication}>
                    <div className="c-cart-item__detail__link">{props.t('preview-note')}</div>
                  </Popover>
                </div>
              )}
            </div>
            <Divider style={{ borderColor: '#EDEDED', margin: '8px 0 18px' }} />
            <div className="c-cart-item__detail--bottom">
              <div className="c-cart-item__detail__price">
                {props.isSkeleton ? (
                  <Skeleton width={200} />
                ) : (
                  <NumberFormat value={props.variant.price} thousandSeparator={true} prefix={'Rp'} displayType="text" />
                )}
              </div>
              <div className="c-cart-item__detail__actions">
                {props.isSkeleton ? (
                  <div style={{ marginRight: 22 }}>
                    <Skeleton width={24} />
                  </div>
                ) : (
                  <span onClick={editItem} className="c-cart-item__detail__actions__icon icon-edit" />
                )}
                {props.isSkeleton ? (
                  <div style={{ marginRight: 22 }}>
                    <Skeleton width={20} />
                  </div>
                ) : (
                  <span
                    onClick={() => props.removeFromCart(props.cartId, props.id)}
                    className="c-cart-item__detail__actions__icon icon-trash"
                  />
                )}
                {props.isSkeleton ? (
                  <Skeleton width={140} />
                ) : (
                  <div className="c-cart-item__detail__quantity">
                    <span
                      onClick={onDecrease}
                      className="c-cart-item__detail__quantity__button c-cart-item__detail__quantity__minus"
                    >
                      -
                    </span>
                    <input type="number" value={quantity} onChange={e => setQuantity(parseInt(e.target.value, 10))} />
                    <span
                      onClick={() => setQuantity(quantity + 1)}
                      className="c-cart-item__detail__quantity__button c-cart-item__detail__quantity__plus"
                    >
                      +
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Card>
      <Modal
        title={props.t('form:delete-item')}
        isOpen={showModal}
        closeModal={() => setShowModal(false)}
        actions={
          <Fragment>
            <Button width="100%" onClick={() => setQuantity(0)} style={{ marginBottom: 12 }}>
              {props.t('form:continue-button')}
            </Button>
            <Button width="100%" onClick={() => setShowModal(false)} variant="outline" color="black">
              {props.t('form:cancel-button')}
            </Button>
          </Fragment>
        }
        content={props.t('form:delete-confirmation')}
      />
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
              @apply font-semibold cursor-pointer;
              color: #445ca4;
              line-height: 24px;
            }
            &__actions {
              @apply flex items-center;
              &__icon {
                @apply cursor-pointer;
                margin-right: 24px;
                font-size: 24px;
                color: #e1e1e1;
              }
            }
            &__quantity {
              @apply flex overflow-hidden;
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
                @apply flex items-center justify-center text-white cursor-pointer;
                width: 36px;
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

export default withTranslation(['common', 'form'])(CartItem);
