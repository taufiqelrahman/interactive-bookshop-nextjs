const Capsule = (props: any) => {
  const colorVariant = props.color ? `c-capsule--${props.color}` : '';
  const variantClass = props.color ? `c-capsule--${props.variant}` : '';
  return (
    <span className={`c-capsule ${colorVariant} ${variantClass}`} style={props.style}>
      {props.children}
      <style jsx>{`
        .c-capsule {
          @apply relative flex items-center bg-black text-sm font-bold;
          border-radius: 60px;
          padding: 6px 28px;
          color: white;
          line-height: normal;

          &--bar {
            @apply w-full justify-center rounded-none;
          }

          &--yellow {
            @apply text-dark-grey;
            background: #f3bf45;
          }
          &--blue {
            background: #4aa8c6;
          }
          &--grey {
            @apply text-dark-grey;
            background: #efeef4;
          }
          span {
            margin-left: 8px;
            font-size: 20px;
          }
        }
      `}</style>
    </span>
  );
};

export default Capsule;
