import React, { useState, useEffect, Fragment } from 'react';
import Select from 'react-select';
import Sheet from 'components/atoms/Sheet';
import Button from 'components/atoms/Button';
import { customStyles, dates, months, years } from './helper';

const DateField = (props: any) => {
  const [date, setDate] = useState(null);
  const [month, setMonth] = useState(null);
  const [year, setYear] = useState(null);
  const [sheetData, setSheetData] = useState({
    title: '',
    options: [],
    selected: null,
    show: false,
  });
  const setFullDate = () => {
    if (!date || !month || !year) return;
    props.setValue(props.name, `${(date as any).value}-${(month as any).value}-${(year as any).value}`);
    props.triggerValidation(props.name);
  };
  useEffect(() => {
    setFullDate();
  }, [date, month, year]);
  const openSheet = (type, options) => {
    setSheetData({
      ...sheetData,
      title: props.t(`select-${type}`),
      options,
      show: true,
    });
  };
  const select = () => {
    const { title, selected } = sheetData;
    switch (title) {
      case 'date':
        setDate(selected);
        break;
      case 'month':
        setMonth(selected);
        break;
      case 'year':
        setYear(selected);
        break;
      default:
        break;
    }
  };
  return (
    <div>
      <div className={`c-date-field ${props.errors ? 'c-date-field--error' : ''}`}>
        <div className="c-date-field__child" onClick={() => openSheet('date', dates(month))}>
          <div className="c-date-field__child__value">{date || 'DD'}</div>
          <div className="c-date-field__child__arrow">&#9660;</div>
        </div>
        <div className="c-date-field__child" onClick={() => openSheet('month', months)}>
          <div className="c-date-field__child__value">{month || 'MM'}</div>
          <div className="c-date-field__child__arrow">&#9660;</div>
        </div>
        <div className="c-date-field__child" onClick={() => openSheet('year', years())} style={{ width: 102 }}>
          <div className="c-date-field__child__value">{year || 'YYYY'}</div>
          <div className="c-date-field__child__arrow">&#9660;</div>
        </div>
      </div>
      <Sheet
        name="date-field-sheet"
        isOpen={sheetData.show}
        closeSheet={() => setSheetData({ ...sheetData, show: false })}
        header={true}
        title={sheetData.title}
        variant="rounded"
        content={
          <Fragment>
            <h1 className="c-char-custom__sheet__title">{props.t('quit-customizing')}</h1>
            <div className="c-char-custom__sheet__content">{props.t('quit-confirmation')}</div>
          </Fragment>
        }
        actions={
          <Fragment>
            <Button width="100%" onClick={select}>
              {props.t('select')}
            </Button>
          </Fragment>
        }
      />
      <style jsx>{`
        .c-date-field {
          @apply mb-4 flex;
          @screen md {
            @apply mb-0;
          }
          &__child {
            @apply flex justify-between items-center;
            border: 2px solid #e1e0e7;
            border-radius: 4px;
            padding: 8px 12px 8px 20px;
            margin-right: 6px;
            width: 82px;
            height: 40px;
            &:last-child {
              margin-right: 0;
            }
            .c-date-field--error & {
              border: 2px solid #de3636;
            }
            &__value {
              @apply font-semibold;
              color: #cac8d5;
            }
            &__arrow {
              font-size: 10px;
            }
          }
        }
      `}</style>
    </div>
  );
};
DateField.displayName = 'DateFieldMobile';

export default DateField;
