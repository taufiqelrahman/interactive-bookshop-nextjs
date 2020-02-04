import React from 'react';
import TextArea from 'components/atoms/TextArea';
import Badge from 'components/atoms/Badge';
import { withTranslation } from 'i18n';

const FieldDedication = React.forwardRef((props: any, ref: any) => (
  <div style={props.style}>
    <div className="c-field-dedication">
      <div className="c-field-dedication__header">
        {props.t('dedication-label')}
        {props.errors && <Badge>!</Badge>}
      </div>
      <div className="c-field-dedication__hint">{props.t('dedication-hint')}</div>
      <TextArea name="dedication" placeholder={props.t('dedication-placeholder')} ref={ref} errors={props.errors} />
    </div>
    <style jsx>{`
      .c-field-dedication {
        @apply mb-4;
        @screen md {
          @apply mb-0;
        }
        &__header {
          @apply font-semibold mb-2 flex;
        }
        &__hint {
          @apply text-xs mb-3;
          line-height: 19px;
        }
        &__options {
          @apply flex flex-wrap;
        }
      }
    `}</style>
  </div>
));
FieldDedication.displayName = 'FieldDedication';

export default withTranslation('form', { withRef: true })<any>(FieldDedication);
