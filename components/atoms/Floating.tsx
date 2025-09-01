import React, { ReactNode } from 'react';

interface FloatingProps {
  color?: string;
  children?: ReactNode;
}

const Floating: React.FC<FloatingProps> = (props) => {
  const colorClass = props.color ? `c-floating--${props.color}` : '';
  return (
    <div className={`c-floating ${colorClass}`}>
      {props.children}
      <style jsx>{`
        .c-floating {
          @apply fixed flex cursor-pointer items-center justify-center rounded-full;
          width: 60px;
          height: 60px;
          bottom: 3vh;
          right: 5vw;
          font-size: 30px;
          z-index: 49;
          box-shadow: 0 0 0px 4px rgba(183, 183, 183, 0.3);
          &--green {
            @apply text-white;
            background: #25d366;
          }
        }
      `}</style>
    </div>
  );
};

export default Floating;
