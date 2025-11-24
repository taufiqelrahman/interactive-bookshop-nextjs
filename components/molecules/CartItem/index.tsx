// @todo refactor
import debounce from 'lodash.debounce';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useEffect, useState, useRef, Fragment } from 'react';
import Skeleton from 'react-loading-skeleton';
import NumberFormat from 'react-number-format';
import { useDispatch, useSelector } from 'react-redux';

import Button from 'components/atoms/Button';
import Card from 'components/atoms/Card';
import Divider from 'components/atoms/Divider';
import Dot from 'components/atoms/Dot';
import Modal from 'components/atoms/Modal';
import Popover from 'components/atoms/Popover';
import Sheet from 'components/atoms/Sheet';
import { useResponsive } from 'lib/hooks/useResponsive';
import { RootState } from 'store';
import actions from 'store/actions';
import { saveSelected } from 'store/cart/reducers';
import { CartLineItem } from 'store/cart/types';

import { previewImg } from './helper';

interface CartItemProps extends CartLineItem {
  cartId: string;
  style?: React.CSSProperties;
  isSkeleton?: boolean;
}

const CartItem = (props: CartItemProps) => {
  const { isMobile } = useResponsive();
  const { t } = useTranslation('common');
  const { customAttributes } = props;
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart);
  const router = useRouter();
  const [quantity, setQuantity] = useState(props.quantity);
  const deleteItem = () => dispatch(actions.thunkRemoveFromCart(props.cartId, props.id));

  // desktop only
  const [showModal, setShowModal] = useState(false);

  // mobile only
  const [showSheet, setShowSheet] = useState(false);
  const onDelete = () => {
    setShowSheet(false);
    deleteItem();
  };

  const onDecrease = () => {
    if (quantity === 1) {
      if (isMobile) {
        setShowSheet(true);
      } else {
        setShowModal(true);
      }
    } else if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };
  const debouncedFunctionRef = useRef();
  (debouncedFunctionRef.current as any) = async () => {
    await dispatch(actions.thunkUpdateCart({ id: props.id, quantity, ...customAttributes }));
    if (router.pathname !== '/cart') router.replace('/cart');
  };
  const debouncedChange = debounce(() => (debouncedFunctionRef.current as any)(), 1000);
  const isFirstRun = useRef(true);
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    debouncedChange();
  }, [quantity]);

  const editItem = () => {
    dispatch(
      saveSelected({
        ...cart.selected,
        id: props.id,
        quantity: props.quantity,
        ...customAttributes,
        Occupations: customAttributes.Occupations.split(','),
      }),
    );
    router.push('/create');
  };

  if (isMobile) {
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
                    {props.isSkeleton ? (
                      <Skeleton height={19} />
                    ) : (
                      props.customAttributes.Occupations?.replace(/,/g, ', ')
                    )}
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
                      <img src={previewImg(props.customAttributes)} alt="item preview" />
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
                    <Fragment>
                      <div className="c-cart-item__detail__price--original">Rp250,000.00</div>
                      <NumberFormat
                        value={props.variant?.price.amount || 0}
                        thousandSeparator={true}
                        prefix={'Rp'}
                        displayType="text"
                      />
                    </Fragment>
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
                    <span
                      className="c-cart-item__detail__actions__icon icon-trash"
                      onClick={() => setShowSheet(true)}
                    />
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
                      <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
                      />
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
              <h1 className="c-cart-item__sheet__title">{t('form:delete-item')}</h1>
              <div className="c-cart-item__sheet__content">{t('form:delete-confirmation')}</div>
            </Fragment>
          }
          actions={
            <Fragment>
              <Button width="100%" onClick={onDelete} style={{ marginBottom: 12 }}>
                {t('form:continue-button')}
              </Button>
              <Button width="100%" onClick={() => setShowSheet(false)} variant="outline" color="black">
                {t('form:cancel-button')}
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
                @apply flex items-center justify-between;
              }
              &__image {
                @apply overflow-hidden;
                background: #f3bf45;
                width: 72px;
                height: 72px;
                border-radius: 6px;
                padding: 4px;
              }
              &__price {
                @apply py-2 font-semibold;
                &--original {
                  font-size: 14px;
                  text-decoration: line-through;
                  color: #8c8b8c;
                  font-weight: 600;
                  margin-bottom: 8px;
                }
              }
              &__name {
                @apply font-semibold;
                line-height: 24px;
                margin-bottom: 2px;
              }
              &__jobs {
                @apply font-opensans text-sm;
                line-height: 19px;
                margin-bottom: 11px;
              }
              &__notes {
                @apply font-opensans text-xs;
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
                  @apply flex cursor-pointer items-center justify-center;
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
  }

  return (
    <div style={props.style}>
      <Card variant="border">
        <div className="c-cart-item">
          <div className="c-cart-item__preview">
            {props.isSkeleton ? (
              <Skeleton height={100} width={100} />
            ) : (
              <div className="c-cart-item__preview__image">
                <img src={previewImg(customAttributes)} alt="item preview" />
              </div>
            )}
            {props.isSkeleton ? (
              <div style={{ marginTop: 8 }}>
                <Skeleton width={100} />
              </div>
            ) : (
              <div className="c-cart-item__preview__cover">
                <Dot width="16px" color={customAttributes.Cover} />
                {customAttributes.Cover}
              </div>
            )}
          </div>
          <div className="c-cart-item__detail">
            <div className="c-cart-item__detail--top">
              <div className="c-cart-item__detail--top--left">
                <div className="c-cart-item__detail__label">
                  {props.isSkeleton ? <Skeleton /> : t('form:nickname-label')}
                </div>
                <div className="c-cart-item__detail__value">
                  {props.isSkeleton ? <Skeleton /> : customAttributes.Name}
                </div>
                <div className="c-cart-item__detail__label">
                  {props.isSkeleton ? <Skeleton /> : t('dream-occupation')}
                </div>
                <div className="c-cart-item__detail__value">
                  {props.isSkeleton ? <Skeleton /> : customAttributes.Occupations?.replace(/,/g, ', ')}
                </div>
              </div>
              {!props.isSkeleton && customAttributes.Dedication && (
                <div className="c-cart-item__detail--top--right">
                  <div className="c-cart-item__detail__label">{t('dedication-note')}</div>
                  <Popover content={customAttributes.Dedication}>
                    <div className="c-cart-item__detail__link">{t('preview-note')}</div>
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
                  <Fragment>
                    <div className="c-cart-item__detail__price--original">Rp250,000.00</div>
                    <NumberFormat
                      value={props.variant?.price.amount || 0}
                      thousandSeparator={true}
                      prefix={'Rp'}
                      displayType="text"
                    />
                  </Fragment>
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
                  <span onClick={() => setShowModal(true)} className="c-cart-item__detail__actions__icon icon-trash" />
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
                    <input type="number" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value, 10))} />
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
        title={t('form:delete-item')}
        isOpen={showModal}
        closeModal={() => setShowModal(false)}
        actions={
          <Fragment>
            <Button width="100%" onClick={deleteItem} style={{ marginBottom: 12 }}>
              {t('form:continue-button')}
            </Button>
            <Button width="100%" onClick={() => setShowModal(false)} variant="outline" color="black">
              {t('form:cancel-button')}
            </Button>
          </Fragment>
        }
        content={t('form:delete-confirmation')}
      />
      <style jsx>{`
        .c-cart-item {
          @apply flex;
          padding: 18px 24px;
          &__preview {
            @apply w-1/5;
            margin-right: 18px;
            &__image {
              @apply overflow-hidden;
              padding: 4px;
              background: #f3bf45;
              width: 100px;
              height: 100px;
              border-radius: 12px;
            }
            &__cover {
              @apply flex items-center text-xs;
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
              @apply flex items-center justify-between;
            }
            &__price {
              @apply font-semibold;
              font-size: 20px;
              line-height: 24px;
              &--original {
                font-size: 16px;
                text-decoration: line-through;
                color: #8c8b8c;
                font-weight: 600;
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
              @apply cursor-pointer font-semibold;
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
                @apply flex cursor-pointer items-center justify-center text-white;
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

export default CartItem;
