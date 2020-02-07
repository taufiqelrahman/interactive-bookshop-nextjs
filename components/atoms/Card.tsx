const Card = (props: any) => {
  const variantClass = props.variant ? `c-card--${props.variant}` : '';
  return (
    <div style={props.style}>
      <div className={`c-card ${variantClass}`}>{props.children}</div>
      <style jsx>{`
        .c-card {
          @apply bg-white;
          border-radius: 24px;
          &--shadow {
            box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.05);
            &--bold {
              box-shadow: 0px 32px 32px rgba(0, 0, 0, 0.12);
            }
          }
          &--border {
            border: 2px solid #e1e0e7;
          }
        }
      `}</style>
    </div>
  );
};

export default Card;
