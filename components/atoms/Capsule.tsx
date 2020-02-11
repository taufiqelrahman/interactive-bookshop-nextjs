const Capsule = (props: any) => {
  const colorVariant = props.color ? `c-capsule--${props.color}` : '';
  return (
    <div>
      <span className={`c-capsule ${colorVariant}`}>{props.children}</span>
      <style jsx>{`
        .c-capsule {
          @apply bg-black font-bold text-sm flex items-center;
          border-radius: 60px;
          padding: 6px 28px;
          color: white;

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
        }
      `}</style>
    </div>
  );
};

export default Capsule;
