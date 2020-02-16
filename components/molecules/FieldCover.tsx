import React from 'react';
import Radio from 'components/atoms/Radio';
import Badge from 'components/atoms/Badge';
import { withTranslation } from 'i18n';

const FieldCover = React.forwardRef((props: any, ref: any) => {
  const colors = [
    { name: 'blue', color: '#445ca4' },
    { name: 'white', color: '#efeef4' },
    { name: 'red', color: '#de3636' },
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
              ref={ref}
              value={cover.name}
              name="cover"
              errors={props.errors}
              style={{ height: 48, width: 48, background: cover.color, borderRadius: '50%', marginRight: 12 }}
              type="plain"
            />
          ))}
        </div>
      </div>
      <style jsx>{`
        .c-field-cover {
          @apply flex items-center;
          &__header {
            @apply font-semibold flex;
            margin-right: 18px;
          }
          &__options {
            @apply flex flex-wrap items-center;
            height: 64px;
          }
        }
      `}</style>
    </div>
  );
});
FieldCover.displayName = 'FieldCover';

export default withTranslation('form', { withRef: true })<any>(FieldCover);
