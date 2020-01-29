const Badge = (props: any) => {
  const colorClass = props.color ? `c-badge--${props.color}` : '';
  return (
    <div className={`c-badge ${colorClass}`}>
      {props.children}
      <style jsx>{`
        .c-badge {
          @apply text-white flex items-center justify-center text-xs mx-2;
          width: 16px;
          height: 16px;
          background: #de3636;
          border-radius: 50%;
        }
      `}</style>
    </div>
  );
};

export default Badge;
