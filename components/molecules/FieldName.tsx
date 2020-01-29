import React from 'react';
import TextField from 'components/atoms/TextField';
import Badge from 'components/atoms/Badge';

const FieldName = React.forwardRef((props: any, ref: any) => (
  <div>
    <div className="c-field-name">
      <div className="c-field-name__header">
        Name
        {props.errors && <Badge>!</Badge>}
      </div>
      <TextField name="name" placeholder="Enter name here..." ref={ref} errors={props.errors} />
    </div>
    <style jsx>{`
      .c-field-name {
        @apply mb-4;
        @screen md {
          @apply mb-0;
        }
        &__header {
          @apply font-semibold mb-3 flex;
        }
      }
    `}</style>
  </div>
));
FieldName.displayName = 'FieldName';

export default FieldName;
