import React, { CSSProperties } from 'react';

interface DividerProps {
  style?: CSSProperties;
}

const Divider: React.FC<DividerProps> = (props) => (
  <div>
    <hr className="c-divider" style={props.style} />
    <style jsx>{`
      .c-divider {
        border: 1px solid #ededed;
        margin-bottom: 30px;
        @screen md {
          border-color: #e1e0e7;
        }
      }
    `}</style>
  </div>
);

export default Divider;
