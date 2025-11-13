/**
 * Form validation rule interface
 */
export interface ValidationRule {
  /** Whether the field is required */
  required?: { value: boolean; message: string } | boolean;
  /** Maximum length constraint */
  maxLength?: { value: number; message: string } | number;
  /** Minimum length constraint */
  minLength?: { value: number; message: string } | number;
  /** Pattern matching constraint */
  pattern?: { value: RegExp; message: string } | RegExp;
  /** Custom validation function */
  validate?: (value: any) => Promise<any> | boolean | string;
}
