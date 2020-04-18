import React, { useEffect } from 'react';
import Radio from 'components/atoms/Radio';
import Badge from 'components/atoms/Badge';
import { withTranslation } from 'i18n';

const FieldHair = (props: any) => {
  const boyHair = [
    { name: 'straight', image: 'straight' },
    { name: 'curly', image: 'curly' },
  ];
  const girlHair = [
    { name: 'short', image: 'short' },
    { name: 'hijab', image: 'hijab' },
  ];
  const hair = props.type === 'boy' ? boyHair : girlHair;
  useEffect(() => {
    return () => {
      props.unregister('Hair');
    };
  }, [props.type]);
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
              ref={props.register(props.schema)}
              value={hair.name}
              name="Hair"
              errors={props.errors}
              style={props.isMobile ? {} : { height: 84, width: 84 }}
              imageUrl={hair.image}
              type="image"
              variant={props.isMobile ? 'box' : ''}
              defaultChecked={props.defaultChecked === hair.name.toLowerCase()}
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
};
FieldHair.displayName = 'FieldHair';

export default withTranslation('form', { withRef: true })<any>(FieldHair);
