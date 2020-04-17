import React from 'react';
import { withTranslation } from 'i18n';
import Radio from 'components/atoms/Radio';
import Badge from 'components/atoms/Badge';

const FieldLanguage = (props: any) => (
  <div>
    <div className="c-field-language">
      <div className="c-field-language__header">
        {props.t('language-label')}
        {props.errors && <Badge>!</Badge>}
      </div>
      <div className="c-field-language__options">
        {/* dummy */}
        {['English', 'Bahasa Indonesia'].map(language => (
          <Radio
            key={language}
            schema={props.schema}
            value={language.toLowerCase()}
            label={language}
            name="Language"
            errors={props.errors}
            style={{ height: 44, minWidth: props.isMobile ? 165 : 219 }}
            defaultChecked={props.defaultChecked === language.toLowerCase()}
          />
        ))}
      </div>
    </div>
    <style jsx>{`
      .c-field-language {
        @apply mb-4;
        @screen md {
          @apply mb-0;
        }
        &__header {
          @apply font-semibold mb-3 flex;
        }
        &__options {
          @apply flex flex-wrap;
        }
      }
    `}</style>
  </div>
);
FieldLanguage.displayName = 'FieldLanguage';

export default withTranslation('form', { withRef: true })<any>(FieldLanguage);
