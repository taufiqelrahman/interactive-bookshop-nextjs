import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import * as gtag from 'lib/gtag';
import { RootState } from 'store';
import { saveSelected } from 'store/cart/reducers';

import { getJobIds } from '../helper';
import { CharacterFormData, STEP_ENUM, StepType } from '../types';

interface UseCharacterFormProps {
  isMobile: boolean;
  charStep?: StepType;
  setCharStep?: (step: StepType) => void;
}

export const useCharacterForm = ({ isMobile, charStep, setCharStep }: UseCharacterFormProps) => {
  const { t } = useTranslation('form');
  const dispatch = useDispatch();
  const router = useRouter();
  const cart = useSelector((state: RootState) => state.cart);
  const master = useSelector((state: RootState) => state.master);
  const methods = useForm({ mode: 'onChange' });

  const { occupations } = master;
  const selected = cart.selected || {};

  const onSubmit = (data: CharacterFormData) => {
    if (!router.query.edit) {
      gtag.event({
        action: 'click_create',
        category: 'engagement',
        label: '/create',
      });
    }

    const jobIds = getJobIds(data.Occupations || [], occupations).filter((id): id is string => id !== undefined);

    const updatedData = { ...selected, ...data, jobIds } as any;
    dispatch(saveSelected(updatedData));

    // Handle mobile step navigation
    if (isMobile && charStep !== undefined && setCharStep) {
      if (charStep === STEP_ENUM.OCCUPATIONS && charStep < STEP_ENUM.DEDICATION) {
        setCharStep((charStep + 1) as StepType);
        return;
      }
    }

    // Navigate to preview
    router.push({
      pathname: '/preview',
      query: jobIds.length ? { jobIds: jobIds.join(',') } : {},
    });
  };

  useEffect(() => {
    router.prefetch('/preview');
  }, [router]);

  return {
    methods,
    onSubmit,
    selected,
    occupations,
    t,
  };
};
