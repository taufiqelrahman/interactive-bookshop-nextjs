import { useTranslation } from 'next-i18next';
import { useEffect } from 'react';

import { useResponsive } from 'lib/hooks/useResponsive';

import { DesktopView } from './DesktopView';
import { showError } from './helper';
import { useCharacterForm } from './hooks/useCharacterForm';
import { MobileView } from './MobileView';

/**
 * CharacterCustomization Component
 *
 * Main entry point for character creation with responsive design.
 * Delegates to MobileView or DesktopView based on screen size.
 *
 * Features:
 * - Responsive mobile and desktop layouts
 * - Real-time character preview
 * - Form validation with internationalization
 * - Performance optimizations
 */
const CharacterCustomization = () => {
  const { t } = useTranslation('form');
  const { isMobile } = useResponsive();
  const { methods, onSubmit, selected } = useCharacterForm({ isMobile });

  const { formState, errors } = methods;

  useEffect(() => {
    if (!formState.isValid && Object.keys(errors).length > 0) {
      showError(t('form-error'));
    }
  }, [errors, formState.isValid, t]);

  // Development mode default values
  const isDev = process.env.NODE_ENV === 'development';
  const devDefaults = isDev
    ? {
        Occupations: ['Teacher', 'Pilot', 'Police'],
        Name: 'Fatimah',
        Age: 'kid',
        Gender: 'girl',
        Skin: 'light',
        Language: 'english',
        Dedication:
          '"Aku yakin kamu pasti akan menjadi guru yang sangat baik," kata wanita berambut kuning itu. "I believe that you will be an excellent one," said the yellow-haired woman.',
        'Date of Birth': '03-01-2019',
        Hair: 'short',
      }
    : {};

  const characterData = { ...devDefaults, ...selected };

  if (isMobile) {
    return <MobileView methods={methods} onSubmit={onSubmit} selected={characterData} t={t} />;
  }

  return <DesktopView methods={methods} onSubmit={onSubmit} selected={characterData} t={t} />;
};

export default CharacterCustomization;
