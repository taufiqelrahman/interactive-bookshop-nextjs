import React from 'react';
import Radio from 'components/atoms/Radio';
import Badge from 'components/atoms/Badge';
import { withTranslation } from 'i18n';

const FieldHair = React.forwardRef((props: any, ref: any) => {
  const boyHair = [
    { name: 'straight', image: 'straight' },
    { name: 'curly', image: 'curly' },
  ];
  const girlHair = [
    { name: 'straight', image: 'straight' },
    { name: 'hijab', image: 'hijab' },
  ];
  const hair = props.type === 'boy' ? boyHair : girlHair;
  return (
    <div style={props.style}>
      <div className="c-field-hair">
        <div className="c-field-hair__header">
          {props.t('hair-label')}
          {props.errors && <Badge>!</Badge>}
        </div>
        <div className="c-field-hair__options">
          {/* dummy */}
          {hair.map(hair => (
            <Radio
              key={hair.name}
              ref={ref}
              value={hair.name}
              name="hair"
              errors={props.errors}
              style={{ height: 84, width: 84 }}
              imageUrl={hair.image}
              type="image"
            />
          ))}
        </div>
      </div>
      <style jsx>{`
        .c-field-hair {
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
});
FieldHair.displayName = 'FieldHair';

export default withTranslation('form', { withRef: true })<any>(FieldHair);
