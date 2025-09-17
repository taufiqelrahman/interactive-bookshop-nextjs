import React, { useEffect, useState } from 'react';

interface PaginationProps {
  pages: never[];
  current: number;
}

const Pagination: React.FC<PaginationProps> = (props) => {
  const { current, pages } = props;
  const [translation, setTranslation] = useState(0);
  // const dotCount = () => {
  //   let length = props.pages.length;
  //   if (props.pages.length > 8) length = 9;
  //   return new Array(length).fill(0);
  // };
  const renderClass = (order): string => {
    let className = 'c-pagination__dot';
    if (order === current) className += ' c-pagination__dot--active';
    if (pages.length - current < 2) {
      if (order === pages.length - 8) className += ' c-pagination--micro c-pagination__dot--large';
      if (order === pages.length - 7) className += ' c-pagination--tiny c-pagination__dot--medium';
    } else if (current > 7) {
      switch (order) {
        case current - 6:
          className += ' c-pagination--micro c-pagination__dot--large';
          break;
        case current - 5:
          className += ' c-pagination--tiny c-pagination__dot--medium';
          break;
        case current + 2:
          className += ' c-pagination--micro';
          break;
        case current + 1:
          className += ' c-pagination--tiny c-pagination__dot--large';
          break;
        case current:
          className += ' c-pagination__dot--medium';
          break;
        default:
          break;
      }
    } else {
      if (order === 9) className += ' c-pagination--micro';
      if (order === 8) className += ' c-pagination--tiny c-pagination__dot--small';
    }
    return className;
  };
  useEffect(() => {
    if (current > 7) {
      if (pages.length - current < 2) return;
      setTranslation(-10 * (current - 7));
    } else {
      setTranslation(0);
    }
  }, [current, pages.length]);
  return (
    <div className="c-pagination">
      <div className="c-pagination__container">
        {pages.map((_, index) => {
          return <div key={index} className={renderClass(index + 1)} />;
        })}
      </div>
      <style jsx>{`
        .c-pagination {
          @apply overflow-hidden;
          width: 84px;
          margin: 15px auto;
          &__container {
            @apply flex items-center;
            transform: translateX(${translation}px);
            transition: transform 0.3s ease-in-out;
          }
          &__dot {
            margin-right: 4px;
            width: 6px;
            min-width: 6px;
            height: 6px;
            border-radius: 50%;
            background: #a8a8a8;
            transition: all 0.2s ease-in-out;
            &--active {
              background: #0095f6;
            }
            &--medium {
              margin-right: 5px;
            }
            &--large {
              margin-right: 7px;
            }
          }
          &--tiny {
            width: 4px;
            min-width: 4px;
            height: 4px;
          }
          &--micro {
            width: 2px;
            min-width: 2px;
            height: 2px;
          }
        }
      `}</style>
    </div>
  );
};

export default Pagination;
