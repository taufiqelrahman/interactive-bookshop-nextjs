/**
 * Form validation rule interface
 */
export interface ValidationRule {
  /** Whether the field is required */
  required?: { value: boolean; message: string };
  /** Maximum length constraint */
  maxLength?: { value: number; message: string };
  /** Minimum length constraint */
  minLength?: { value: number; message: string };
  /** Pattern matching constraint */
  pattern?: { value: RegExp; message: string };
  /** Custom validation function */
  validate?: (value: any) => boolean | string;
}
