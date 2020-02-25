const Button = (props: any) => {
  const variantClass = props.variant ? `c-button--${props.variant}` : '';
  const colorClass = props.color ? `c-button--${props.color}` : '';
  const disabledClass = props.disabled ? `c-button--disabled` : '';
  return (
    <div style={props.style}>
      <button
        type={props.type ? props.type : null}
        className={`c-button ${variantClass} ${colorClass} ${disabledClass}`}
        onClick={props.onClick}
        disabled={props.disabled}
      >
        {props.children}
      </button>
      <style jsx>{`
        .c-button {
          @apply font-semibold bg-brand text-white text-sm w-full;
          border-radius: 60px;
          padding: ${props.width ? '12px 0' : '12px'};
          max-width: ${props.width ? '100%' : 'none'};
          line-height: 24px;
          @screen sm {
            width: ${props.width || '255px'};
          }
          @screen md {
            @apply text-base;
          }
          &--outline {
            @apply bg-transparent;
            border: 2px solid;
            &.c-button--black {
              @apply text-dark-grey;
              border-color: #333333;
            }
            &.c-button--white {
              @apply border-white;
            }
          }
          &--disabled {
            opacity: 0.3;
            cursor: not-allowed;
          }
        }
      `}</style>
    </div>
  );
};

export default Button;
