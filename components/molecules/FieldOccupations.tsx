import React from 'react';
import { withTranslation } from 'i18n';
import { useRouter } from 'next/router';
import Checkbox from 'components/atoms/Checkbox';
import Badge from 'components/atoms/Badge';

const FieldOccupations = React.forwardRef((props: any, ref: any) => {
  const router = useRouter();
  const isIndexPage = router.pathname === '/';
  return (
    <div style={props.style}>
      <div className="c-field-occupations">
        <div className="c-field-occupations__header">
          {props.t('occupations-label')}
          {props.errors && <Badge>!</Badge>}
        </div>
        <div className="c-field-occupations__options">
          {props.occupations.map(job => (
            <div key={job.id} className="c-field-occupations__options__box">
              <Checkbox
                ref={ref}
                value={job.name}
                name="Occupations"
                errors={props.errors}
                inset={true}
                defaultChecked={props.defaultChecked && props.defaultChecked.includes(job.name)}
              >
                <span>{job.name}</span>
              </Checkbox>
            </div>
          ))}
        </div>
        {/* {props.errors && 'Requires 3 occupations'} */}
      </div>
      <style jsx>{`
        .c-field-occupations {
          &__header {
            @apply font-semibold mb-6 flex justify-center;
            @screen md {
              @apply justify-start;
            }
          }
          &__options {
            @apply flex flex-wrap;
            margin-bottom: 30px;
            @screen md {
              @apply mb-0;
            }
            &__box {
              @apply mb-2 flex justify-center;
              flex: 1 0 33%;
              @screen md {
                margin-right: 3%;
                flex: unset;
              }
              span {
                @apply justify-center font-bold text-xs;
                display: ${isIndexPage ? 'flex' : 'none'};
                margin-top: 4px;
                line-height: 16px;
                @screen md {
                  @apply flex;
                }
              }
            }
          }
        }
      `}</style>
      <style jsx global>{`
        input:checked + label > span {
          color: #445ca4;
        }
      `}</style>
    </div>
  );
});
FieldOccupations.displayName = 'FieldOccupations';

export default withTranslation('form', { withRef: true })<any>(FieldOccupations);
