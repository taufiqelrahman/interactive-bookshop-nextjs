import { useEffect } from 'react';

const Sheet = (props: any) => {
  useEffect(() => {
    if (props.isOpen) {
      document.body.classList.add('overlay-active');
    } else {
      document.body.classList.remove('overlay-active');
    }
  }, [props.isOpen]);
  return (
    <div className="c-sheet">
      <div>{props.content}</div>
      {props.actions && <div className="c-sheet__action">{props.actions}</div>}
      <style jsx>{`
        .c-sheet {
          @apply absolute w-full bg-white bottom-0 z-50 flex flex-col justify-between;
          transform: ${props.isOpen ? 'none' : 'translateY(999px)'};
          transition: transform 0.3s ease-in;
          min-height: 268px;
          padding: 24px 16px 16px;
        }
      `}</style>
    </div>
  );
};

export default Sheet;
