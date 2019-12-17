const Footer = () => {
  return (
    <div>
      <div className="c-footer">
        <div className="c-footer__top">
        
        </div>
        <div className="c-footer__bottom">
          <div className="u-container">
            <div className="c-footer__bottom__menu">
              <div className="c-footer__bottom__menu__item">
                Terms & Conditions
              </div>
              <div className="c-footer__bottom__menu__item">
                Privacy Policy
              </div>
            </div>
            <div className="c-footer__copyright">
              whenigrowup
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .c-footer {
          @apply text-sm;
          &__bottom {
            @apply bg-teal-600 py-3;

            &__menu {
              @apply flex;

              &__item {
                &:last-child {
                  @apply ml-3;
                }
              }
            }
          }
        }
      `}</style>
    </div>
  )
};

export default Footer;