import Picker from 'pickerjs';
import { withTranslation } from 'i18n';
import { useEffect } from 'react';

const DatePicker = (props: any) => {
  useEffect(() => {
    const input: any = document.getElementById('c-date-picker__input');
    const pickerInstance = new Picker(input, {
      format: 'DD MM YYYY',
      container: '.c-date-picker',
      headers: true,
      inline: true,
      rows: 3,
      text: {
        year: props.t('year'),
        month: props.t('month'),
        day: props.t('day'),
      },
      date: props.value,
    });
    props.setPicker(pickerInstance as any);
  }, []);
  return (
    <div className="c-date-picker">
      <input type="text" id="c-date-picker__input" />
      <style jsx global>{`
        @import '/static/styles/picker.min.css';
        .picker {
          @apply bg-white;
          &-cell {
            border: 0;
            &:before,
            &:after {
              background-image: none;
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

export default withTranslation('common')(DatePicker);
