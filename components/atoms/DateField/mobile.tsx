import React, { useState, useEffect, Fragment } from 'react';
import Sheet from 'components/atoms/Sheet';
import Button from 'components/atoms/Button';
import { dates, months, years } from './helper';
import DatePicker from '../DatePicker';

const DateField = (props: any) => {
  const [picker, setPicker] = useState(null);
  const [state, setState] = useState({
    date: null,
    month: null,
    year: null,
  });
  const [sheetData, setSheetData] = useState({
    show: false,
    value: null,
  });
  const setFullDate = () => {
    const { date, month, year } = state;
    if (!date || !month || !year) return;
    props.setValue(props.name, `${(date as any).value}-${(month as any).value}-${(year as any).value}`);
    props.triggerValidation(props.name);
  };
  useEffect(() => {
    setFullDate();
  }, [state]);
  const openSheet = () => {
    setSheetData({
      ...sheetData,
      show: true,
      value: null,
    });
  };
  const onSelect = (event: any) => {
    event.preventDefault();
    const { day, month, year } = (picker as any).data;
    setState({
      ...state,
      date: day.item.textContent,
      month: month.item.textContent,
      year: year.item.textContent,
    });
    setSheetData({ ...sheetData, show: false });
  };
  return (
    <div>
      <div className={`c-date-field ${props.errors ? 'c-date-field--error' : ''}`}>
        <div className="c-date-field__child" onClick={() => openSheet()}>
          <div className="c-date-field__child__value">{state.date || 'DD'}</div>
          <div className="c-date-field__child__arrow">&#9660;</div>
        </div>
        <div className="c-date-field__child" onClick={() => openSheet()}>
          <div className="c-date-field__child__value">{state.month || 'MM'}</div>
          <div className="c-date-field__child__arrow">&#9660;</div>
        </div>
        <div className="c-date-field__child" onClick={() => openSheet()} style={{ width: 102 }}>
          <div className="c-date-field__child__value">{state.year || 'YYYY'}</div>
          <div className="c-date-field__child__arrow">&#9660;</div>
        </div>
      </div>
      {sheetData.show && (
        <Sheet
          name="date-field-sheet"
          isOpen={sheetData.show}
          closeSheet={() => setSheetData({ ...sheetData, show: false })}
          header={true}
          title={props.t(`select-date`)}
          variant="rounded"
          content={
            <Fragment>
              <DatePicker value={sheetData.value} setPicker={setPicker} />
            </Fragment>
          }
          actions={
            <Fragment>
              <Button width="100%" onClick={(event: any) => onSelect(event)}>
                {props.t('select')}
              </Button>
            </Fragment>
          }
        />
      )}
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
