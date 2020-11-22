import React from 'react';
import Radio from 'components/atoms/Radio';
import Badge from 'components/atoms/Badge';
import { withTranslation } from 'i18n';

const FieldCover = (props: any) => {
  const colors = [
    { name: 'blue', color: '#445ca4' },
    { name: 'white', color: '#efeef4' },
    { name: 'magenta', color: '#de3636' },
  ];
  return (
    <div style={props.style}>
      <div className="c-field-cover">
        <div className="c-field-cover__header">
          {props.t('cover-label')}
          {props.errors && <Badge>!</Badge>}
        </div>
        <div className="c-field-cover__options">
          {/* dummy */}
          {colors.map(cover => (
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
            @apply items-center flex-row;
          }
          &__header {
            @apply font-semibold flex text-sm;
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

export default withTranslation('form', { withRef: true })<any>(FieldCover);
