import { useState } from 'react';

import Card from 'components/atoms/Card';

const Accordion = (props: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };
  const Wrapper: any = props.isMobile ? 'div' : Card;
  return (
    <div style={props.style}>
      <Wrapper variant="border">
        <div className="c-accordion" onClick={toggleOpen}>
          <div className="c-accordion__header">
            <h2>{props.title}</h2>
            <span className={`icon-chevron_${isOpen ? 'up' : 'down'}`} />
          </div>
          {isOpen && <div className="c-accordion__body">{props.children}</div>}
        </div>
      </Wrapper>
      <style jsx>{`
        .c-accordion {
          padding: 16px;
          border-bottom: 1px solid #ededed;
          @screen md {
            padding: 24px;
            border: 0;
          }
          &__header {
            @apply flex cursor-pointer items-center justify-between;
            h2 {
              @apply font-opensans text-sm;
              line-height: 22px;
              @screen md {
                @apply font-semibold;
                font-size: 20px;
                line-height: 30px;
              }
            }
            span {
              font-size: 24px;
              @screen md {
                font-size: 30px;
              }
            }
          }
          &__body {
            @apply whitespace-pre-wrap font-opensans text-sm;
            color: #616161;
            line-height: 28px;
            padding-bottom: 20px;
            margin-top: 20px;
            padding-right: 24px;
            @screen md {
              @apply text-base text-dark-grey;
              margin-top: 25px;
              padding-bottom: 30px;
              line-height: 30px;
              padding-right: 28px;
            }
          }
        }
      `}</style>
    </div>
  );
};

export default Accordion;
