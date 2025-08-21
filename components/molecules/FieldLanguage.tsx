import React from 'react';

import Badge from 'components/atoms/Badge';
import Radio from 'components/atoms/Radio';
import { withTranslation } from 'i18n';

const FieldLanguage = (props: any) => (
  <div>
    <div className="c-field-language">
      <div className="c-field-language__header">
        {props.t('language-label')}
        {props.errors && <Badge>!</Badge>}
      </div>
      <div className="c-field-language__options">
        {/* dummy */}
        {['Bahasa Indonesia', 'English'].map((language) => (
          <Radio
            key={language}
            ref={props.register(props.schema)}
            value={language.toLowerCase()}
            label={language}
            name="Language"
            errors={props.errors}
            style={{ height: 44, minWidth: props.isMobile ? 165 : 219 }}
            defaultChecked={props.defaultChecked === language.toLowerCase()}
          />
        ))}
      </div>
      {props.errors && <div className="c-field-language__error">{props.errors.message}</div>}
    </div>
    <style jsx>{`
      .c-field-language {
        @apply mb-4;
        @screen md {
          @apply mb-0;
        }
        &__header {
          @apply mb-3 flex font-semibold;
        }
        &__options {
          @apply flex flex-wrap;
        }
        &__error {
          @apply mt-2 flex justify-start text-sm;
          color: #de3636;
        }
      }
    `}</style>
  </div>
);
FieldLanguage.displayName = 'FieldLanguage';

export default withTranslation('form', { withRef: true })<any>(FieldLanguage);
