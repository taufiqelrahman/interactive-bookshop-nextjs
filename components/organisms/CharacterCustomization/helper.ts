import { toast } from 'react-toastify';

import { ValidationRule } from 'lib/validation';
import { Character } from 'store/cart/types';
import { Occupation } from 'store/master/types';

/**
 * Translation function type for internationalization
 */
type TranslationFunction = (key: string) => string;

/**
 * Complete form validation schema interface
 */
interface ValidationSchema {
  occupations: ValidationRule;
  name: ValidationRule;
  age: ValidationRule;
  gender: ValidationRule;
  hair: ValidationRule;
  skin: ValidationRule;
  language: ValidationRule;
  dedication: ValidationRule;
}

/**
 * Form watch function type for reactive form values
 */
type WatchFunction = (fieldName: string) => string | undefined;

/**
 * Default character appearance values
 */
const DEFAULT_CHARACTER: Partial<Character> = {
  Gender: 'boy',
  Age: 'kid',
  Skin: 'light',
  Hair: 'short',
} as const;

/**
 * Character Customization Form Validation Schema
 *
 * Generates a comprehensive validation schema for character creation forms.
 * Includes validation rules for occupations, character details, and personal information.
 * Uses internationalized error messages for better user experience.
 *
 * @param t - Translation function for internationalized error messages
 * @returns Complete validation schema object with all form field rules
 *
 * @example
 * ```typescript
 * const { t } = useTranslation('form');
 * const validationRules = schema(t);
 * // Use with react-hook-form or similar validation library
 * ```
 */
export const schema = (t: TranslationFunction): ValidationSchema => ({
  occupations: {
    required: { value: true, message: t('occupations-invalid') },
    validate: (value: string[]) => value?.length === 3 || t('occupations-invalid'),
  },
  name: {
    required: { value: true, message: `${t('nickname-label')} ${t('required-error')}` },
    maxLength: { value: 10, message: `${t('nickname-label')} ${t('less-than-error')} 10` },
    validate: (value: string) => !value?.includes(' ') || `${t('nickname-label')} ${t('space-error')}`,
  },
  age: {
    required: { value: true, message: `${t('age-label')} ${t('required-error')}` },
  },
  gender: {
    required: { value: true, message: `${t('gender-label')} ${t('required-error')}` },
  },
  hair: {
    required: { value: true, message: `${t('hair-label')} ${t('required-error')}` },
  },
  skin: {
    required: { value: true, message: `${t('skin-label')} ${t('required-error')}` },
  },
  language: {
    required: { value: true, message: `${t('language-label')} ${t('required-error')}` },
  },
  dedication: {
    required: { value: false, message: '' },
  },
});

/**
 * Error Display Utility
 *
 * Displays error messages to the user with consistent UX behavior.
 * Scrolls to top of page for visibility and shows toast notification.
 * Provides centralized error handling for the character customization flow.
 *
 * @param error - Error message string to display to user
 *
 * @example
 * ```typescript
 * try {
 *   // Some operation that might fail
 * } catch (err) {
 *   showError('Failed to save character data');
 * }
 * ```
 */
export const showError = (error: string): void => {
  // Scroll to top for better error visibility
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Show error toast notification
  toast.error(error, {
    position: 'top-center',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
  });
};

/**
 * Character Preview Image Generator
 *
 * Generates the appropriate character preview image path based on selected attributes.
 * Handles gender-specific hair style validation and provides mobile-optimized images.
 * Uses fallback values to ensure a valid image path is always returned.
 *
 * @param data - Current character appearance data
 * @param watch - Form watch function to get real-time field values
 * @param isMobile - Whether to use mobile-optimized smaller images
 * @returns Complete image path for character preview
 *
 * @example
 * ```typescript
 * const imagePath = previewImg(characterData, watch, true);
 * // Returns: "/static/images/child-sm/boy/kid/short/light.png"
 * ```
 */
export const previewImg = (data: Character, watch: WatchFunction, isMobile: boolean = false): string => {
  // Base path with mobile optimization suffix
  const basePath = `/static/images/child${isMobile ? '-sm' : ''}`;

  // Extract current data with fallbacks to defaults
  const currentGender = watch('Gender') || data.Gender || DEFAULT_CHARACTER.Gender || 'boy';
  const currentAge = watch('Age') || data.Age || DEFAULT_CHARACTER.Age || 'kid';
  const currentSkin = watch('Skin') || data.Skin || DEFAULT_CHARACTER.Skin || 'light';
  const currentHair = watch('Hair') || data.Hair || DEFAULT_CHARACTER.Hair || 'short';

  // Apply gender-specific hair style validation
  const validatedHair = validateHairStyleForGender(currentHair, currentGender);

  // Construct complete image path
  return `${basePath}/${currentGender}/${currentAge}/${validatedHair}/${currentSkin}.png`;
};

/**
 * Hair Style Gender Validation Helper
 *
 * Validates hair style choices against gender selection to ensure
 * appropriate character representation. Applies business rules for
 * gender-specific hair styles.
 *
 * @param hairStyle - Selected hair style
 * @param gender - Selected gender
 * @returns Valid hair style for the given gender
 */
const validateHairStyleForGender = (hairStyle: string, gender: string): string => {
  // Business rules for gender-specific hair styles
  const isInvalidCombination =
    (hairStyle === 'hijab' && gender === 'boy') || (hairStyle === 'curly' && gender === 'girl');

  // Return default 'short' style for invalid combinations
  return isInvalidCombination ? 'short' : hairStyle;
};

/**
 * Occupation Name to ID Converter
 *
 * Converts occupation names to their corresponding IDs by looking them up
 * in the occupation list. Handles cases where occupations might not be found
 * and provides safe fallbacks.
 *
 * @param names - Array of occupation names to convert
 * @param list - Complete list of available occupations with ID mappings
 * @returns Array of occupation IDs (may contain undefined for not found items)
 *
 * @example
 * ```typescript
 * const occupationIds = getJobIds(['Doctor', 'Teacher'], occupationsList);
 * // Returns: ['1', '2'] (assuming those are the IDs)
 * ```
 */
export const getJobIds = (names: string[], list: Occupation[]): (string | undefined)[] => {
  return names.map((jobName) => {
    const foundOccupation = list.find((occupation) => occupation.name === jobName);
    return foundOccupation?.id;
  });
};

/**
 * Character Image Preloader
 *
 * Preloads character images and updates the preview element when ready.
 * Provides smooth user experience by showing placeholder while loading
 * and handles loading errors gracefully.
 *
 * @param source - URL of the character image to load
 *
 * @example
 * ```typescript
 * const imagePath = previewImg(characterData, watch);
 * loadImg(imagePath);
 * ```
 */
export const loadImg = (source: string): void => {
  // Find the preview image element
  const previewElement = document.getElementById('preview-char') as HTMLImageElement | null;

  // Early return if preview element doesn't exist
  if (!previewElement) {
    console.warn('Character preview element not found in DOM');
    return;
  }

  // Show placeholder while loading
  previewElement.src = '/static/images/empty.png';

  // Preload the actual image
  const imageLoader = new Image();

  // Handle successful image load
  imageLoader.onload = function handleImageLoad() {
    if (previewElement && imageLoader.src) {
      previewElement.src = imageLoader.src;
    }
  };

  // Handle image loading errors
  imageLoader.onerror = function handleImageError() {
    console.error(`Failed to load character image: ${source}`);
    if (previewElement) {
      previewElement.src = '/static/images/default-character.png';
    }
  };

  // Start loading the image
  imageLoader.src = source;
};
