import { useTranslation } from 'next-i18next';
import Picker from 'pickerjs';
import React, { useState, useEffect, Fragment } from 'react';

import Button from 'components/atoms/Button';
import Sheet from 'components/atoms/Sheet';

import DatePicker from '../DatePicker';

interface DateFieldState {
  date: string | null;
  month: string | null;
  year: string | null;
}

interface SheetData {
  show: boolean;
  value: string | null;
}

interface DateFieldProps {
  name: string;
  setValue: (field: string, value: string) => void;
  triggerValidation: (field: string) => void;
  defaultValue: string;
  errors?: { message?: string } | null;
}

const DateField = (props: DateFieldProps) => {
  const { t } = useTranslation('form');
  const [picker, setPicker] = useState<Picker>(null);
  const [state, setState] = useState<DateFieldState>({
    date: null,
    month: null,
    year: null,
  });
  const [sheetData, setSheetData] = useState<SheetData>({
    show: false,
    value: null,
  });
  const setFullDate = () => {
    const { date, month, year } = state;
    if (!date || !month || !year) return;
    props.setValue(props.name, `${date}-${month}-${year}`);
    props.triggerValidation(props.name);
  };
  useEffect(() => {
    setFullDate();
  }, [state]);
  const setDefaultDate = () => {
    const parsed = props.defaultValue.split('-');
    if (parsed.length !== 3) return;
    setState({
      date: parsed[0],
      month: parsed[1],
      year: parsed[2],
    });
  };
  useEffect(() => {
    if (props.defaultValue) setDefaultDate();
  }, []);
  const openSheet = () => {
    setSheetData((prev) => ({
      ...prev,
      show: true,
      value: null,
    }));
  };

  const onSelect = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!picker || typeof picker !== 'object' || !('data' in picker)) return;
    // @todo fix type
    const pickerData = (picker as { data: any }).data;
    const { day, month, year } = pickerData;
    setState((prev) => ({
      ...prev,
      date: day.item.textContent,
      month: month.item.textContent,
      year: year.item.textContent,
    }));
    setSheetData((prev) => ({ ...prev, show: false }));
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
          title={t(`select-date`)}
          variant="rounded"
          content={
            <Fragment>
              <DatePicker value={sheetData.value} setPicker={setPicker} />
            </Fragment>
          }
          actions={
            <Fragment>
              <Button width="100%" onClick={(event: React.MouseEvent<HTMLButtonElement>) => onSelect(event)}>
                {t('select-button')}
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
            @apply flex items-center justify-between;
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
