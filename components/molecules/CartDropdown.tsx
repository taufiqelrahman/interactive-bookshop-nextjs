import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import NumberFormat from 'react-number-format';

import { previewImg } from 'components/molecules/CartItem/helper';

const CartDropdown = (props: any) => {
  const { t } = useTranslation('common');
  const cartNotEmpty = !!props.items && props.items.length > 0;
  return (
    <div onClick={(e) => e.stopPropagation()}>
      <div className={`c-cart-dropdown ${!cartNotEmpty ? 'c-cart-dropdown--empty' : ''}`}>
        {cartNotEmpty ? (
          <div className="c-cart-dropdown__container">
            <div className="c-cart-dropdown__header">
              <div className="c-cart-dropdown__quantity">{props.items.length} item(s)</div>
              <Link href="/cart">
                <a>{t('cart-link')}</a>
              </Link>
            </div>
            <div className="c-cart-dropdown__content">
              {props.items.map((item, i) => {
                return (
                  <div key={i} className="c-cart-dropdown__item">
                    <div className="flex items-center">
                      <Image
                        src={previewImg(item.customAttributes)}
                        alt="item"
                        className="c-cart-dropdown__item__image"
                        width="44"
                        height="44"
                      />
                      <div>
                        <div className="c-cart-dropdown__item__name">
                          {t('for')} {item.customAttributes.Name}
                        </div>
                        <div className="c-cart-dropdown__item__quantity">
                          {item.quantity} {t('page-orders:books')}
                        </div>
                      </div>
                    </div>
                    <div className="c-cart-dropdown__item__total">
                      <NumberFormat
                        value={item.variant.price}
                        thousandSeparator={true}
                        prefix={'Rp'}
                        displayType="text"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          t('cart-empty')
        )}
      </div>
      <style jsx>{`
        .c-cart-dropdown {
          @apply absolute bg-gray-100 text-sm;
          box-shadow: 0px 6px 6px rgba(0, 0, 0, 0.08);
          border-radius: 0px 0px 6px 6px;
          top: 80px;
          width: 400px;
          left: -110px;
          padding: 18px;

          &--empty {
            @apply flex items-center justify-center font-opensans text-base italic;
            left: -15px;
            width: 200px;
            height: 58px;
            color: #898699;
          }

          &__header {
            @apply flex justify-between pb-5;
            border-bottom: 1px solid #ededed;
            a {
              @apply font-semibold;
              color: #445ca4;
            }
          }

          &__item {
            @apply mt-3 flex justify-between;
            &__image {
              @apply mr-3;
              height: 44px;
              width: 44px;
              border-radius: 4px;
              border: 2px solid #ededed;
              background: #efeef4;
              object-fit: cover;
              object-position: top;
            }
            &__name {
              @apply font-semibold;
              line-height: 21px;
            }
            &__quantity {
              @apply text-xs;
              line-height: 18px;
            }
            &__total {
              line-height: 21px;
            }
          }

          &__content {
            @apply mt-4;
          }
        }
      `}</style>
    </div>
  );
};

export default CartDropdown;
