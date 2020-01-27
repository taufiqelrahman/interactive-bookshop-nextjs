const Button = (props: any) => {
  const variantClass = props.variant ? `c-button--${props.variant}` : '';
  const colorClass = props.color ? `c-button--${props.color}` : '';
  return (
    <div>
      <button className={`c-button ${variantClass} ${colorClass}`} onClick={props.onClick}>
        {props.children}
      </button>
      <style jsx>{`
        .c-button {
          @apply font-semibold;
          border: 2px solid;
          border-radius: 60px;
          padding: 12px;
          width: 255px;
          line-height: 24px;
          &--black {
            border-color: #333333;
          }
          &--white {
            @apply border-white;
          }
        }
      `}</style>
    </div>
  );
};

export default Button;
