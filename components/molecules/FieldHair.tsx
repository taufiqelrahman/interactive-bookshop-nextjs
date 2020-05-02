import React, { useEffect } from 'react';
import Radio from 'components/atoms/Radio';
import Badge from 'components/atoms/Badge';
import { withTranslation } from 'i18n';

const FieldHair = (props: any) => {
  const toddlerBoyHair = [
    { name: 'short', image: 'short-toddler-boy' },
    { name: 'curly', image: 'curly' },
  ];
  const kidBoyHair = [
    { name: 'short', image: 'short-kid-boy' },
    { name: 'curly', image: 'curly' },
  ];
  const girlHair = [
    { name: 'short', image: 'short-girl' },
    { name: 'hijab', image: 'hijab' },
  ];
  const hair = props.type === 'boy' ? (props.age === 'kid' ? kidBoyHair : toddlerBoyHair) : girlHair;
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
              imageUrl={`/static/images/hair/${hair.image}.png`}
              type="image"
              variant={props.isMobile ? 'box' : ''}
              defaultChecked={props.defaultChecked === hair.name.toLowerCase()}
            />
          ))}
        </div>
        {props.errors && <div className="c-field-hair__error">{props.errors.message}</div>}
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
          &__error {
            @apply mt-2 flex justify-start text-sm;
            color: #de3636;
          }
        }
      `}</style>
    </div>
  );
};
FieldHair.displayName = 'FieldHair';

export default withTranslation('form', { withRef: true })<any>(FieldHair);
