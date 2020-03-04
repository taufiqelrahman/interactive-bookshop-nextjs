const Sheet = (props: any) => {
  return (
    <div key={props.name}>
      <div className="c-sheet">
        <div>{props.content}</div>
        {props.actions && <div className="c-sheet__action">{props.actions}</div>}
      </div>
      {props.isOpen && <div className="c-sheet__overlay" onClick={props.closeSheet}></div>}
      <style jsx>{`
        .c-sheet {
          @apply absolute w-full bg-white bottom-0 z-50 flex flex-col justify-between;
          transform: ${props.isOpen ? 'none' : 'translateY(999px)'};
          transition: transform 0.2s ease-in;
          min-height: 268px;
          padding: 24px 16px 16px;
          &__overlay {
            @apply fixed top-0 left-0 w-full h-full z-40;
            background-color: rgba(51, 51, 51, 0.8);
            opacity: ${props.isOpen ? 1 : 0};
            transition: opacity 0.3s ease-in;
          }
        }
      `}</style>
    </div>
  );
};

export default Sheet;
