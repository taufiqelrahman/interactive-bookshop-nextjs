const Sheet = (props: any) => {
  const variantClass = props.variant ? ` c-sheet--${props.variant}` : '';
  return (
    <div key={props.name}>
      <div className={`c-sheet${variantClass}`}>
        {props.header && (
          <div className="c-sheet__head">
            <div className="c-sheet__head__handler"></div>
            <div className="c-sheet__head__header">
              <span className="icon-chevron_left" />
              <div className="c-sheet__head__title">{props.title}</div>
            </div>
          </div>
        )}
        <div style={{ marginTop: props.header ? 0 : 8 }}>{props.content}</div>
        {props.actions && <div className="c-sheet__action">{props.actions}</div>}
      </div>
      {props.isOpen && <div className="c-sheet__overlay" onClick={props.closeSheet}></div>}
      <style jsx>{`
        .c-sheet {
          @apply absolute w-full bg-white left-0 bottom-0 z-50 flex flex-col justify-between;
          transform: ${props.isOpen ? 'none' : 'translateY(999px)'};
          transition: transform 0.2s ease-in;
          min-height: 268px;
          padding: 16px;
          &__overlay {
            @apply fixed top-0 left-0 w-full h-full z-40;
            background-color: rgba(51, 51, 51, 0.8);
            opacity: ${props.isOpen ? 1 : 0};
            transition: opacity 0.3s ease-in;
          }
          &--rounded {
            border-radius: 6px 6px 0px 0px;
          }
          &--rounded-large {
            border-radius: 12px 12px 0px 0px;
          }
          &__head {
            &__handler {
              @apply mx-auto;
              width: 48px;
              background: #e8eaef;
              border-radius: 4px;
              height: 4px;
              margin-bottom: 20px;
            }
            &__header {
              @apply flex items-center;
              font-size: 18px;
              padding-bottom: 16px;
              border-bottom: 1px solid #f1f2f5;
            }
            &__title {
              line-height: 24px;
              margin-left: 17px;
            }
          }
          &__action {
            margin-top: 8px;
          }
        }
      `}</style>
    </div>
  );
};

export default Sheet;
