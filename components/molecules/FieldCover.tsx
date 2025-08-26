import { useTranslation } from 'next-i18next';
import React from 'react';

import Badge from 'components/atoms/Badge';
import Radio from 'components/atoms/Radio';

const FieldCover = (props: any) => {
  const { t } = useTranslation('form');
  const colors = [
    { name: t('cover-blue'), color: '#445ca4' },
    { name: t('cover-white'), color: '#efeef4' },
    { name: t('cover-magenta'), color: '#de3636' },
  ];
  return (
    <div style={props.style}>
      <div className="c-field-cover">
        <div className="c-field-cover__header">
          {t('cover-label')}
          {props.errors && <Badge>!</Badge>}
        </div>
        <div className="c-field-cover__options">
          {/* dummy */}
          {colors.map((cover) => (
            <Radio
              key={cover.name}
              ref={props.register(props.schema)}
              value={cover.name}
              name="Cover"
              errors={props.errors}
              style={{
                height: 48,
                width: 48,
                background: cover.color,
                borderRadius: '50%',
                marginRight: 12,
              }}
              type="plain"
              defaultChecked={cover.name === 'blue'}
            />
          ))}
        </div>
      </div>
      <style jsx>{`
        .c-field-cover {
          @apply flex flex-col;
          @screen md {
            @apply flex-row items-center;
          }
          &__header {
            @apply flex text-sm font-semibold;
            margin-bottom: 6px;
            @screen md {
              @apply text-base;
              margin-right: 18px;
              margin-bottom: 0;
            }
          }
          &__options {
            @apply flex flex-wrap items-center;
            height: 64px;
          }
        }
      `}</style>
    </div>
  );
};
FieldCover.displayName = 'FieldCover';

export default FieldCover;
