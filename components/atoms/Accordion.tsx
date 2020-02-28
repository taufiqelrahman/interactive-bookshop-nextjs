import { useState } from 'react';
import Card from 'components/atoms/Card';

const Accordion = (props: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div style={props.style}>
      <Card variant="border">
        <div className="c-accordion" onClick={toggleOpen}>
          <div className="c-accordion__header">
            <h2>{props.title}</h2>
            <span className={`icon-chevron_${isOpen ? 'up' : 'down'}`} />
          </div>
          {isOpen && <div className="c-accordion__body">{props.children}</div>}
        </div>
      </Card>
      <style jsx>{`
        .c-accordion {
          padding: 24px;
          &__header {
            @apply flex justify-between items-center cursor-pointer;
            h2 {
              @apply font-semibold;
              font-size: 20px;
              line-height: 30px;
            }
            span {
              font-size: 30px;
            }
          }
          &__body {
            @apply font-opensans whitespace-pre-wrap;
            line-height: 22px;
            padding-bottom: 60px;
            margin-top: 25px;
          }
        }
      `}</style>
    </div>
  );
};

export default Accordion;
