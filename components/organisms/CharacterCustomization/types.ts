/**
 * Form data interface for character customization
 */
export interface CharacterFormData {
  /** Character's chosen name/nickname */
  Name?: string;
  /** Character's gender selection */
  Gender?: string;
  /** Character's age category */
  Age?: string;
  /** Character's hair style */
  Hair?: string;
  /** Character's skin tone */
  Skin?: string;
  /** Array of 3 selected occupations */
  Occupations?: string[];
  /** Character's language preference */
  Language?: string;
  /** Optional dedication message */
  Dedication?: string;
  /** Character's date of birth (legacy field) */
  'Date of Birth'?: string;
}

/**
 * Step enumeration for mobile character customization flow
 */
export const STEP_ENUM = {
  NAME_GENDER: 0,
  AGE: 1,
  HAIR: 2,
  SKIN: 3,
  OCCUPATIONS: 4,
  LANGUAGE: 5,
  DEDICATION: 6,
} as const;

export type StepType = 0 | 1 | 2 | 3 | 4 | 5 | 6;
