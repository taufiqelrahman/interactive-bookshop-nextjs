import React from 'react';

const Divider = (props: any) => (
  <div>
    <hr className="c-divider" style={props.style} />
    <style jsx>{`
      .c-divider {
        border: 1px solid #e1e0e7;
        margin-bottom: 30px;
      }
    `}</style>
  </div>
);

export default Divider;
