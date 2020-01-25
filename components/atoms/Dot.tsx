const Dot = (props: any) => {
  const colorVariant = props.color ? `c-dot--${props.color}` : '';
  return (
    <div>
      <span className={`c-dot ${colorVariant}`} />
      <style jsx>{`
        .c-dot {
          @apply bg-black flex mx-1;
          width: 6px;
          height: 6px;
          border-radius: 50%;

          &--red {
            background: #de3636;
          }
        }
      `}</style>
    </div>
  );
};

export default Dot;
