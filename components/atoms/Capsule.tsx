const Capsule = (props: any) => {
  const colorVariant = props.color ? `c-capsule--${props.color}` : '';
  const variantClass = props.color ? `c-capsule--${props.variant}` : '';
  return (
    <span className={`c-capsule ${colorVariant} ${variantClass}`} style={props.style}>
      {props.children}
      <style jsx>{`
        .c-capsule {
          @apply bg-black font-bold text-sm flex items-center relative;
          border-radius: 60px;
          padding: 6px 28px;
          color: white;
          line-height: normal;

          &--bar {
            @apply w-full rounded-none justify-center;
          }

          &--yellow {
            @apply text-dark-grey;
            background: #f3bf45;
          }
          &--blue {
            background: #4aa8c6;
          }
          &--dark-blue {
            background: #3d76c7;
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
