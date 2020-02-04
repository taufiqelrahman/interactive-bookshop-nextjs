import React from 'react';
import Radio from 'components/atoms/Radio';
import Badge from 'components/atoms/Badge';
import { withTranslation } from 'i18n';

const FieldSkin = React.forwardRef((props: any, ref: any) => {
  const skins = [
    { name: 'light', color: '#ffdbb7' },
    { name: 'medium', color: '#c78d61' },
    { name: 'dark', color: '#a46134' },
  ];
  return (
    <div style={props.style}>
      <div className="c-field-skin">
        <div className="c-field-skin__header">
          {props.t('skin-label')}
          {props.errors && <Badge>!</Badge>}
        </div>
        <div className="c-field-skin__options">
          {/* dummy */}
          {skins.map(skin => (
            <Radio
              key={skin.name}
              ref={ref}
              value={skin.name}
              name="skin"
              errors={props.errors}
              style={{ height: 64, width: 64, background: skin.color, borderRadius: '50%' }}
              type="plain"
            />
          ))}
        </div>
      </div>
      <style jsx>{`
        .c-field-skin {
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
FieldSkin.displayName = 'FieldSkin';

export default withTranslation('form', { withRef: true })<any>(FieldSkin);
