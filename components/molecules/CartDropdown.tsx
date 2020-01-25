import { withTranslation, Link } from 'i18n';

const CartDropdown = (props: any) => {
  const cartNotEmpty = !!props.cart && props.cart.length > 0;
  return (
    <div>
      <div className={`c-cart-dropdown ${!cartNotEmpty ? 'c-cart-dropdown--empty' : ''}`}>
        {cartNotEmpty ? (
          <div className="c-cart-dropdown__container">
            <div className="c-cart-dropdown__header">
              <div className="c-cart-dropdown__quantity">4 item(s)</div>
              <Link href="/cart">
                <a>{props.t('cart-link')}</a>
              </Link>
            </div>
            <div className="c-cart-dropdown__content">
              {/* dummy */}
              {[1, 2, 3].map(item => {
                return (
                  <div key={item} className="c-cart-dropdown__item">
                    <div className="flex">
                      <img alt="item" className="c-cart-dropdown__item__image" width="44" height="44" />
                      <div>
                        <div className="c-cart-dropdown__item__name">WIGO book for Rivandi Anjas</div>
                        <div className="c-cart-dropdown__item__quantity">1 item</div>
                      </div>
                    </div>
                    <div className="c-cart-dropdown__item__total">Rp65.444</div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          props.t('cart-empty')
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
            @apply flex items-center justify-center italic text-base;
            left: -15px;
            width: 200px;
            height: 58px;
            color: #898699;
            font-family: 'Open Sans', sans-serif;
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
            @apply flex mt-3 justify-between;
            &__image {
              @apply mr-3;
              height: 44px;
              width: 44px;
              border-radius: 4px;
              border: 2px solid #ededed;
              background: #efeef4;
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

export default withTranslation('common')(CartDropdown);
