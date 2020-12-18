const Card = (props: any) => {
  const variantClass = () => {
    if (!props.variant) return '';
    const variants = props.variant.split(',');
    return variants.map((variant: string) => `c-card--${variant}`).join(' ');
  };

  return (
    <div className={`c-card ${variantClass()} ${props.className}`} style={props.style}>
      {props.children}
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
          &--square {
            border-radius: 0;
            &--light {
              border-radius: 12px;
            }
          }
          &--border {
            border: 2px solid #e1e0e7;
            &--light {
              border: 1px solid #efeef4;
            }
          }
        }
      `}</style>
    </div>
  );
};

export default Card;
