import React from 'react';
import TextArea from 'components/atoms/TextArea';
import Badge from 'components/atoms/Badge';
import { withTranslation } from 'i18n';

const FormTextArea = React.forwardRef((props: any, ref: any) => (
  <div style={props.style}>
    <div className="c-form-text-area">
      <div className="c-form-text-area__label">
        {props.label}
        {props.errors && <Badge>!</Badge>}
      </div>
      <div className="c-form-text-area__hint">{props.hint}</div>
      <TextArea name={props.name} placeholder={props.placeholder} ref={ref} errors={props.errors} />
    </div>
    <style jsx>{`
      .c-form-text-area {
        @apply mb-4;
        @screen md {
          @apply mb-0;
        }
        &__label {
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
FormTextArea.displayName = 'FormTextArea';

export default withTranslation('form', { withRef: true })<any>(FormTextArea);
