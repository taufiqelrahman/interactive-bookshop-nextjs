import { useTranslation } from 'next-i18next';
import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';

import Badge from 'components/atoms/Badge';
import Checkbox from 'components/atoms/Checkbox';
import { Occupation } from 'store/master/types';
// import { useRouter } from 'next/router';

interface FieldOccupationsProps {
  style?: React.CSSProperties;
  errors?: any;
  setValue: (field: string, value: string[]) => void;
  triggerValidation: (field: string) => void;
  formState: { isSubmitted?: boolean };
  defaultValue?: string[];
  isMobile?: boolean;
  gender?: string;
  register?: any;
}

const FieldOccupations = (props: FieldOccupationsProps) => {
  const { t, i18n } = useTranslation('form');

  const master = useSelector((state: any) => state.master);
  const { occupations } = master;
  // State for selected occupation names
  const [selectedOccupations, setSelectedOccupations] = useState<string[]>([]);

  /**
   * Update selected occupations and trigger validation if needed.
   * Triggers validation if form is submitted or more than 2 occupations are selected.
   */
  const updateSelectedOccupations = useCallback(
    (newSelections: string[]) => {
      setSelectedOccupations(newSelections);
      props.setValue('Occupations', newSelections);
      if (props.formState.isSubmitted || newSelections.length > 2) {
        props.triggerValidation('Occupations');
      }
    },
    [props],
  );

  /**
   * Handle checkbox change for an occupation.
   * Adds or removes the occupation from the selected list.
   */
  const handleOccupationCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, value: occupationName } = event.target;
    let updatedSelections = [...selectedOccupations];
    if (checked) {
      updatedSelections = [...updatedSelections, occupationName];
    } else {
      updatedSelections = updatedSelections.filter((job) => job !== occupationName);
    }
    updateSelectedOccupations(updatedSelections);
  };

  /**
   * Get the list of occupations to display, filtered by gender and device type.
   */
  const getFilteredOccupations = (): Occupation[] => {
    let filtered = [...occupations];
    // Remove 'President' for boys on mobile or for everyone on desktop
    if ((props.isMobile && props.gender === 'boy') || !props.isMobile) {
      filtered = filtered.filter((job) => job.name !== 'President');
    }
    // Remove 'Ballerina' for boys
    if (props.gender === 'boy') {
      filtered = filtered.filter((job) => job.name !== 'Ballerina');
    }
    return filtered;
  };

  // Initialize selected occupations from defaultValue
  useEffect(() => {
    if (props.defaultValue) setSelectedOccupations(props.defaultValue);
  }, [props.defaultValue]);

  // Remove 'Ballerina' if gender changes to boy and it was selected
  useEffect(() => {
    if (props.gender === 'boy' && selectedOccupations.includes('Ballerina')) {
      updateSelectedOccupations(selectedOccupations.filter((job) => job !== 'Ballerina'));
    }
  }, [props.gender, selectedOccupations, updateSelectedOccupations]);
  return (
    <div style={props.style}>
      <div className="c-field-occupations">
        <div className="c-field-occupations__header">
          {t('occupations-label')}
          {props.errors && <Badge>!</Badge>}
        </div>
        <div className="c-field-occupations__options">
          {getFilteredOccupations().map((job) => (
            <div key={job.id} className="c-field-occupations__options__box">
              <Checkbox
                value={job.name}
                errors={props.errors}
                inset={true}
                handleCheck={handleOccupationCheck}
                checked={selectedOccupations.includes(job.name)}
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
