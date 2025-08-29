import { useTranslation } from 'next-i18next';
import React, { useState, useEffect, useCallback } from 'react';

import Badge from 'components/atoms/Badge';
import Checkbox from 'components/atoms/Checkbox';
// import { useRouter } from 'next/router';

interface Occupation {
  id: string | number;
  name: string;
  indonesia?: string;
}

interface FieldOccupationsProps {
  style?: React.CSSProperties;
  errors?: any;
  setValue: (field: string, value: string[]) => void;
  triggerValidation: (field: string) => void;
  formState: { isSubmitted?: boolean };
  defaultValue?: string[];
  occupations: Occupation[];
  isMobile?: boolean;
  gender?: string;
  register?: any;
}

const FieldOccupations = (props: FieldOccupationsProps) => {
  const { t, i18n } = useTranslation('form');
  const [occupations, setOccupations] = useState<string[]>([]);
  // const router = useRouter();
  // const isIndexPage = router.pathname === '/';
  const setValue = useCallback(
    (value: string[]) => {
      setOccupations(value);
      props.setValue('Occupations', value);
      if (props.formState.isSubmitted || value.length > 2) {
        props.triggerValidation('Occupations');
      }
    },
    [props],
  );
  const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = event.target;
    let newValue: string[] = [...occupations];
    if (checked) {
      newValue = [...newValue, value];
    } else {
      const index = occupations.findIndex((job) => job === value);
      if (index === -1) return;
      newValue.splice(index, 1);
    }
    setValue(newValue);
  };
  const occupationsOpts = (): Occupation[] => {
    let occupationsOpts = [...props.occupations];
    if ((props.isMobile && props.gender === 'boy') || !props.isMobile) {
      occupationsOpts = occupationsOpts.filter((job) => job.name !== 'President');
    }
    if (props.gender === 'boy') {
      occupationsOpts = occupationsOpts.filter((job) => job.name !== 'Ballerina');
    }
    return occupationsOpts;
  };
  useEffect(() => {
    if (props.defaultValue) setOccupations(props.defaultValue);
  }, [props.defaultValue]);
  useEffect(() => {
    if (props.gender === 'boy' && occupations.includes('Ballerina')) {
      setValue(occupations.filter((job) => job !== 'Ballerina'));
    }
  }, [props.gender, occupations, setValue]);
  return (
    <div style={props.style}>
      <div className="c-field-occupations">
        <div className="c-field-occupations__header">
          {t('occupations-label')}
          {props.errors && <Badge>!</Badge>}
        </div>
        <div className="c-field-occupations__options">
          {occupationsOpts().map((job) => (
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
            @apply mb-6 flex justify-center font-semibold;
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
                @apply justify-center text-xs font-bold;
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

export default FieldOccupations;
