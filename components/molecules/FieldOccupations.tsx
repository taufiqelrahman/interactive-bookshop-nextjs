import React, { useState, useEffect, HTMLAttributes } from 'react';
import { withTranslation, i18n } from 'i18n';
// import { useRouter } from 'next/router';
import Checkbox from 'components/atoms/Checkbox';
import Badge from 'components/atoms/Badge';
import { FieldValues, FormStateProxy } from 'react-hook-form';
import { Occupation } from 'store/master/types';
import { CustomAttributes } from 'store/cart/types';
import { WithTranslation } from 'next-i18next';

interface FieldOccupationsProps extends WithTranslation, HTMLAttributes<HTMLDivElement> {
  formState: FormStateProxy<FieldValues>;
  triggerValidation: (payload?: string | string[] | undefined, shouldRender?: boolean | undefined) => Promise<boolean>;
  setValue: (name: any, value?: any, shouldValidate?: boolean | undefined) => void;
  errors: any;
  register: any;

  occupations?: Occupation[];
  isMobile?: boolean;
  gender: CustomAttributes['Gender'];
  defaultValue: string[];
}
const FieldOccupations = (props: FieldOccupationsProps) => {
  const [occupations, setOccupations] = useState([] as string[]);
  // const router = useRouter();
  // const isIndexPage = router.pathname === '/';
  const setValue = (value: string[]) => {
    setOccupations(value);
    props.setValue('Occupations', value);
    if (props.formState.isSubmitted || value.length > 2) {
      props.triggerValidation('Occupations');
    }
  };
  const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = event.target;
    let newValue: Array<string> = [...occupations];
    if (checked) {
      newValue = [...newValue, value];
    } else {
      const index = occupations.findIndex(job => job === value);
      if (index === -1) return;
      newValue.splice(index, 1);
    }
    setValue(newValue);
  };
  const occupationsOpts = () => {
    if (!props.occupations) return [];
    let occupationsOpts = [...props.occupations.filter(job => job.name !== 'President')];
    if (props.gender === 'boy') {
      occupationsOpts = [...occupationsOpts.filter(job => job.name !== 'Ballerina')];
    }
    return occupationsOpts;
  };
  useEffect(() => {
    if (props.defaultValue) setOccupations(props.defaultValue);
  }, []);
  useEffect(() => {
    if (props.gender === 'boy' && occupations.includes('Ballerina')) {
      setValue(occupations.filter(job => job !== 'Ballerina'));
    }
  }, [props.gender]);
  return (
    <div style={props.style}>
      <div className="c-field-occupations">
        <div className="c-field-occupations__header">
          {props.t('occupations-label')}
          {props.errors && <Badge>!</Badge>}
        </div>
        <div className="c-field-occupations__options">
          {occupationsOpts().map(job => (
            <div key={job.id} className="c-field-occupations__options__box">
              <Checkbox
                value={job.name}
                errors={props.errors}
                inset={true}
                handleCheck={handleCheck}
                checked={occupations.includes(job.name)}
                name="Occupations"
              >
                <span>{i18n.language === 'en' ? job.name : job.indonesia}</span>
              </Checkbox>
            </div>
          ))}
        </div>
        {props.errors && <div className="c-field-occupations__error">{props.errors.message}</div>}
      </div>
      <style jsx>{`
        .c-field-occupations {
          &__header {
            @apply font-semibold mb-6 flex justify-center;
            @screen md {
              @apply justify-start;
            }
          }
          &__error {
            @apply mt-2 flex justify-center text-sm;
            color: #de3636;
            @screen md {
              @apply justify-start;
            }
          }
          &__options {
            @apply flex flex-wrap;
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
                display: flex;
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

export default withTranslation('form', { withRef: true })(FieldOccupations);
