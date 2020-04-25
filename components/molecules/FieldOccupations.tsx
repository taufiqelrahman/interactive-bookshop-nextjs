import React, { useState, useEffect } from 'react';
import { withTranslation, i18n } from 'i18n';
import { useRouter } from 'next/router';
import Checkbox from 'components/atoms/Checkbox';
import Badge from 'components/atoms/Badge';

const FieldOccupations = (props: any) => {
  const [occupations, setOccupations]: any = useState([]);
  const router = useRouter();
  const isIndexPage = router.pathname === '/';
  const handleCheck = event => {
    const { checked, value } = event.target;
    let newValue: Array<string> = [...occupations];
    if (checked) {
      newValue = [...newValue, value];
    } else {
      const index = occupations.findIndex(job => job === value);
      if (index === -1) return;
      newValue.splice(index, 1);
    }
    setOccupations(newValue);
    props.setValue('Occupations', newValue);
    props.triggerValidation('Occupations');
  };
  useEffect(() => {
    if (props.defaultValue) {
      setOccupations(props.defaultValue);
      setTimeout(() => {
        props.setValue('Occupations', props.defaultValue);
      }, 500);
    }
  }, []);
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
                value={job.name}
                errors={props.errors}
                inset={true}
                handleCheck={handleCheck}
                checked={occupations.includes(job.name)}
              >
                <span>{i18n.language === 'en' ? job.name : job.indonesia}</span>
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
};
FieldOccupations.displayName = 'FieldOccupations';

export default withTranslation('form', { withRef: true })<any>(FieldOccupations);
