import { useTranslation } from 'next-i18next';
import Picker from 'pickerjs';
import { useEffect } from 'react';

interface DatePickerProps {
  value?: string | Date;
  setPicker: (picker: Picker) => void;
}

const DatePicker: React.FC<DatePickerProps> = (props) => {
  const { t } = useTranslation('common');
  useEffect(() => {
    const input = document.getElementById('c-date-picker__input') as HTMLInputElement | null;
    if (!input) return;
    const pickerInstance = new Picker(input, {
      format: 'DD MM YYYY',
      container: '.c-date-picker',
      headers: true,
      inline: true,
      rows: 3,
      text: {
        year: t('year'),
        month: t('month'),
        day: t('day'),
      },
      date: props.value,
    });
    props.setPicker(pickerInstance);
  }, []);
  return (
    <div className="c-date-picker">
      <input type="text" id="c-date-picker__input" />
      <style jsx>{`
        .c-date-picker {
          margin-top: 8px;
        }
      `}</style>
      <style jsx global>{`
        .picker {
          @apply bg-white;
          &-cell {
            border: 0;
            &:before,
            &:after {
              background-image: none;
              border: 0;
            }
            & + .picker-cell {
              border: 0;
            }
          }
          &-dialog {
            border: 0;
          }
          &-item {
            padding: 0.5rem;
            color: #a1a9b3;
          }
          &-picked {
            color: #42454d;
            background: #f1f2f5;
          }
        }
      `}</style>
    </div>
  );
};

export default DatePicker;
