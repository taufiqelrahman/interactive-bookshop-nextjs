import { useTranslation } from 'next-i18next/dist/types/appWithTranslation';
import React from 'react';

import Badge from 'components/atoms/Badge';
import Radio from 'components/atoms/Radio';

const FieldSkin = (props: any) => {
  const { t } = useTranslation('form');
  const skins = [
    { name: 'light', color: '#ffdbb7' },
    { name: 'medium', color: '#c78d61' },
    { name: 'dark', color: '#a46134' },
  ];
  return (
    <div style={props.style}>
      <div className="c-field-skin">
        <div className="c-field-skin__header">
          {t('skin-label')}
          {props.errors && <Badge>!</Badge>}
        </div>
        <div className="c-field-skin__options">
          {/* dummy */}
          {skins.map((skin) => (
            <Radio
              key={skin.name}
              ref={props.register(props.schema)}
              value={skin.name}
              name="Skin"
              errors={props.errors}
              style={
                props.isMobile
                  ? { background: skin.color }
                  : { height: 64, width: 64, background: skin.color, borderRadius: '50%' }
              }
              type="plain"
              inset={!props.isMobile}
              variant={props.isMobile ? 'box' : ''}
              defaultChecked={props.defaultChecked === skin.name.toLowerCase()}
            />
          ))}
        </div>
        {props.errors && <div className="c-field-skin__error">{props.errors.message}</div>}
      </div>
      <style jsx>{`
        .c-field-skin {
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
};
FieldSkin.displayName = 'FieldSkin';

export default FieldSkin;
