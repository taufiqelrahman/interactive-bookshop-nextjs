import React from 'react';

const Divider = React.memo(() => {
  return (
    <div>
      <hr className="c-divider" />
      <style jsx>{`
        .c-divider {
          border: 1px solid #e1e0e7;
          margin-bottom: 30px;
        }
      `}</style>
    </div>
  );
});
Divider.displayName = 'Divider';

export default Divider;
