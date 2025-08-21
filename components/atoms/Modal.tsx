const Modal = (props: any) => {
  const variantClass = () => {
    if (!props.variant) return '';
    const variants = props.variant.split(',');
    return variants.map((variant) => `c-modal--${variant}`).join(' ');
  };
  const overlayClass = props.overlay ? `c-modal__overlay--${props.overlay}` : '';
  const zIndexMultiplier = props.zIndexLevel ? 5 * props.zIndexLevel : 1;
  const onClose = (event) => {
    event.stopPropagation();
    props.closeModal();
  };
  return (
    <div key={props.name} style={props.style}>
      <div onClick={props.onClick} className={`c-modal ${variantClass()}`}>
        <div className="c-modal__head">
          <div className="c-modal__head__title">{props.title}</div>
        </div>
        <div className="c-modal__content">{props.content}</div>
        {props.actions && <div className="c-modal__action">{props.actions}</div>}
      </div>
      {props.isOpen && <div className={`c-modal__overlay ${overlayClass}`} onClick={onClose}></div>}
      <style jsx>{`
        .c-modal {
          @apply fixed flex flex-col justify-between bg-white;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 445px;
          opacity: ${props.isOpen ? 1 : 0};
          transition: opacity 0.2s ease-in;
          min-height: 268px;
          padding: 16px;
          z-index: ${props.isOpen ? 50 + zIndexMultiplier : -99};
          border-radius: 24px;
          border: 2px solid #e1e0e7;
          &__overlay {
            @apply fixed left-0 top-0 h-full w-full;
            background-color: rgba(51, 51, 51, 0.8);
            opacity: ${props.isOpen ? 1 : 0};
            transition: opacity 0.3s ease-in;
            z-index: ${40 + zIndexMultiplier};
            &--light {
              background-color: rgba(51, 51, 51, 0.5);
            }
          }
          &--rounded {
            border-radius: 6px 6px 0px 0px;
          }
          &--rounded-large {
            border-radius: 12px 12px 0px 0px;
          }
          &--bleed {
            padding: 0;
          }
          &__head {
            @apply text-center;
            &__title {
              @apply font-bold;
              font-size: 28px;
              line-height: 42px;
              margin-bottom: 12px;
            }
          }
          &__content {
            @apply text-sm;
            line-height: 20px;
          }
          &__action {
            margin-top: 24px;
          }
        }
      `}</style>
    </div>
  );
};

export default Modal;
