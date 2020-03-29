import { withTranslation, Router } from 'i18n';
import { useEffect, useState, useRef, useCallback, Fragment } from 'react';
import NumberFormat from 'react-number-format';
import debounce from 'lodash.debounce';
import Card from 'components/atoms/Card';
import Divider from 'components/atoms/Divider';
import { previewImg, updateQuantity } from './helper';
import Skeleton from 'react-loading-skeleton';
import Sheet from 'components/atoms/Sheet';
import Button from 'components/atoms/Button';

const CartItemMobile = (props: any) => {
  const [quantity, setQuantity] = useState(props.quantity);
  const [showSheet, setShowSheet] = useState(false);
  const onDecrease = () => {
    if (quantity === 1) {
      setShowSheet(true);
    } else if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };
  const debouncedFunctionRef = useRef();
  (debouncedFunctionRef.current as any) = () => updateQuantity(props, quantity);
  const debouncedChange = useCallback(
    debounce(() => (debouncedFunctionRef.current as any)(), 2000),
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
  const deleteItem = () => {
    setShowSheet(false);
    props.removeFromCart(props.cartId, props.id);
  };

  return (
    <div style={props.style}>
      <Card variant="border--light,square">
        <div className="c-cart-item">
          <div className="c-cart-item__detail">
            <div className="c-cart-item__detail--top">
              <div className="c-cart-item__detail--top--left">
                <div className="c-cart-item__detail__name">
                  {props.isSkeleton ? <Skeleton height={24} /> : props.customAttributes.Name}
                </div>
                <div className="c-cart-item__detail__jobs">
                  {props.isSkeleton ? <Skeleton height={19} /> : props.customAttributes.Occupation}
                </div>
                <div className="c-cart-item__detail__notes">
                  {props.isSkeleton ? (
                    <Skeleton height={16} />
                  ) : (
                    `${props.customAttributes.Cover} cover${props.customAttributes.Dedication ? ' with notes' : ''}`
                  )}
                </div>
              </div>
              <div className="c-cart-item__detail--top--right">
                {props.isSkeleton ? (
                  <Skeleton height={72} width={72} />
                ) : (
                  <div className="c-cart-item__detail__image">
                    <img src={previewImg(props.customAttributes)} />
                  </div>
                )}
              </div>
            </div>
            <Divider style={{ borderColor: '#EFEEF4', margin: '13px 0 12px' }} />
            <div className="c-cart-item__detail--bottom">
              <div className="c-cart-item__detail__price">
                {props.isSkeleton ? (
                  <Skeleton height={24} width={120} />
                ) : (
                  <NumberFormat value={props.variant.price} thousandSeparator={true} prefix={'Rp'} displayType="text" />
                )}
              </div>
              <div className="c-cart-item__detail__actions">
                {props.isSkeleton ? (
                  <div style={{ marginRight: 16 }}>
                    <Skeleton height={20} width={20} />
                  </div>
                ) : (
                  <span className="c-cart-item__detail__actions__icon icon-edit" onClick={editItem} />
                )}
                {props.isSkeleton ? (
                  <div style={{ marginRight: 16 }}>
                    <Skeleton height={20} width={16} />
                  </div>
                ) : (
                  <span className="c-cart-item__detail__actions__icon icon-trash" onClick={() => setShowSheet(true)} />
                )}
                {props.isSkeleton ? (
                  <Skeleton height={32} width={116} />
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
      <Sheet
        name="delete-sheet"
        isOpen={showSheet}
        closeSheet={() => setShowSheet(false)}
        content={
          <Fragment>
            <h1 className="c-cart-item__sheet__title">{props.t('form:delete-item')}</h1>
            <div className="c-cart-item__sheet__content">{props.t('form:delete-confirmation')}</div>
          </Fragment>
        }
        actions={
          <Fragment>
            <Button width="100%" onClick={deleteItem} style={{ marginBottom: 12 }}>
              {props.t('form:continue-buttom')}
            </Button>
            <Button width="100%" onClick={() => setShowSheet(false)} variant="outline" color="black">
              {props.t('form:cancel-button')}
            </Button>
          </Fragment>
        }
      />
      <style jsx>{`
        .c-cart-item {
          padding: 16px 17px 12px;
          &__detail {
            @apply w-full;
            &--top {
              @apply flex justify-between;
              &--left {
                @apply w-3/5;
              }
            }
            &--bottom {
              @apply flex justify-between items-center;
            }
            &__image {
              background: #f3bf45;
              width: 72px;
              height: 72px;
              border-radius: 6px;
            }
            &__price {
              @apply font-semibold;
            }
            &__name {
              @apply font-semibold;
              line-height: 24px;
              margin-bottom: 2px;
            }
            &__jobs {
              @apply text-sm font-opensans;
              line-height: 19px;
              margin-bottom: 11px;
            }
            &__notes {
              @apply text-xs font-opensans;
              line-height: 16px;
            }
            &__actions {
              @apply flex items-center;
              &__icon {
                @apply cursor-pointer;
                color: #898699;
                margin-right: 16px;
                font-size: 24px;
              }
            }
            &__quantity {
              @apply flex overflow-hidden;
              border: 1px solid #e8eaef;
              border-radius: 4px;
              input {
                @apply text-center text-sm;
                width: 52px;
                height: 32px;
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
                @apply flex items-center justify-center cursor-pointer;
                width: 32px;
                background: #efeef4;
                border: 1px solid #efeef4;
              }
            }
          }
          &__sheet {
            &__title {
              @apply font-semibold;
              font-size: 27px;
              line-height: 32px;
            }
            &__content {
              @apply font-opensans text-sm;
              line-height: 20px;
              margin-top: 12px;
            }
          }
        }
      `}</style>
    </div>
  );
};

export default withTranslation(['common', 'form'])(CartItemMobile);
