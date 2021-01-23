const Dot = (props: any) => {
  const colorVariant = props.color ? `c-dot--${props.color}` : '';
  return (
    <div>
      <span className={`c-dot ${colorVariant}`} data-testid="span" />
      <style jsx>{`
        .c-dot {
          @apply bg-black flex mx-1;
          width: ${props.width || '6px'};
          height: ${props.width || '6px'};
          border-radius: 50%;

          &--red,
          &--magenta {
            background: #de3636;
          }
          &--blue {
            background: #445ca4;
          }
          &--white {
            background: #fff;
            border: 1px solid #e1e1e1;
          }
        }
      `}</style>
    </div>
  );
};

export default Dot;
