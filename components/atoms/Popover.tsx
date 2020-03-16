import { useState } from 'react';

const Popover = (props: any) => {
  const [visible, setVisible] = useState(false);
  return (
    <div>
      <div className="c-popover" onMouseEnter={() => setVisible(true)} onMouseLeave={() => setVisible(false)}>
        <div className="c-popover__text">{props.children}</div>
        {visible && <div className="c-popover__content">{props.content}</div>}
      </div>
      <style jsx>{`
        .c-popover {
          @apply relative;
          &__content {
            @apply absolute left-0 bg-white font-opensans;
            transition: opacity 0.5s;
            border-radius: 12px;
            padding: 16px;
            width: 360px;
            border: 2px solid #ededed;
            line-height: 22px;
          }
        }
      `}</style>
      <style jsx global>{`
        .c-popover {
          &__content {
            @apply font-opensans text-sm;
            h5 {
              @apply font-semibold;
            }
            div {
              @apply italic;
              margin-top: 4px;
              line-height: 19px;
              margin-bottom: 16px;
            }
          }
        }
      `}</style>
    </div>
  );
};

export default Popover;
