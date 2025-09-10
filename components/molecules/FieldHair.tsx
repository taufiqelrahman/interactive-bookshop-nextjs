import { useTranslation } from 'next-i18next';
import React, { useEffect } from 'react';

import Badge from 'components/atoms/Badge';
import Radio from 'components/atoms/Radio';

interface FieldHairProps {
  style?: React.CSSProperties;
  isMobile?: boolean;
  errors?: any;
  register: (schema: any) => (ref: HTMLInputElement | null) => void;
  unregister: (name: string) => void;
  schema: any;
  defaultChecked?: string;
  type: string;
  age: string;
}

const FieldHair = (props: FieldHairProps) => {
  const { t } = useTranslation('form');
  const toddlerBoyHair = [
    { name: t('short'), image: 'short-toddler-boy' },
    { name: t('curly'), image: 'curly' },
  ];
  const kidBoyHair = [
    { name: t('short'), image: 'short-kid-boy' },
    { name: t('curly'), image: 'curly' },
  ];
  const girlHair = [
    { name: t('short'), image: 'short-girl' },
    { name: t('hijab'), image: 'hijab' },
  ];
  const hair = props.type === 'boy' ? (props.age === 'kid' ? kidBoyHair : toddlerBoyHair) : girlHair;
  useEffect(() => {
    return () => {
      props.unregister('Hair');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.type]);
  return (
    <div style={props.style}>
      <div className="c-field-hair">
        <div className="c-field-hair__header">
          {t('hair-label')}
          {props.errors && <Badge>!</Badge>}
        </div>
        <div className="c-field-hair__options">
          {/* dummy */}
          {hair.map((hair) => (
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
FieldHair.displayName = 'FieldHair';

export default FieldHair;
