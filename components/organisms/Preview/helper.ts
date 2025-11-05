import Cookies from 'js-cookie';

import { CartItem } from 'store/cart/types';

/**
 * Translation function type definition
 * Represents the internationalization function signature from next-i18next
 */
type TranslateFn = (key: string) => string;

/**
 * Form validation schema configuration
 *
 * Generates validation rules for the preview form fields with internationalized error messages.
 * Used by React Hook Form to validate cover selection requirements.
 *
 * @param t - Translation function from next-i18next for localized error messages
 * @returns Object containing validation schema for form fields
 *
 * @example
 * ```typescript
 * const { t } = useTranslation('form');
 * const validationRules = schema(t);
 * // Returns: { cover: { required: { value: true, message: "Cover is required" } } }
 * ```
 */
export const schema = (t: TranslateFn) => ({
  cover: {
    required: {
      value: true,
      message: `${t('cover-label')} ${t('form:required-error')}`,
    },
  },
});

/**
 * Character selection data structure for dummy/fallback scenarios
 *
 * Represents the minimum required character data structure used when no actual
 * character selection exists. This ensures the preview component can render
 * with default values while maintaining type safety.
 */
export interface DummySelected {
  /** Character age category (e.g., 'Kid', 'Teen', 'Adult') */
  age: string;
  /** Book dedication message from user */
  dedication: string;
  /** Date of birth in MM-DD-YYYY format */
  dob: string;
  /** Character gender selection ('boy', 'girl', etc.) */
  gender: string;
  /** Character hair style identifier */
  hair: string;
  /** Book language preference */
  language: string;
  /** Character display name/nickname */
  name: string;
  /** Array of character occupation selections */
  occupations: string[];
  /** Character skin tone identifier */
  skin: string;
}

/**
 * Default character selection data for fallback scenarios
 *
 * Provides sensible default values when no character data is available
 * in the Redux store. Used primarily for development/testing and as a
 * fallback to prevent component crashes.
 *
 * @example
 * ```typescript
 * const selected = cart.selected || dummySelected;
 * // Ensures component always has valid character data to render
 * ```
 */
export const dummySelected: DummySelected = {
  age: 'Kid',
  dedication: '',
  dob: '05-01-2019',
  gender: 'girl',
  hair: 'hair',
  language: 'English',
  name: 'Sample Character',
  occupations: ['astronaut', 'doctor', 'nurse'],
  skin: 'light',
};

/**
 * Cookie-based cart data retrieval utility
 *
 * Safely retrieves and parses cart data from browser cookies, typically used
 * for restoring cart state after authentication redirects. Handles JSON parsing
 * errors gracefully to prevent application crashes.
 *
 * @returns Parsed CartItem object if cookie exists and is valid, null otherwise
 *
 * @example
 * ```typescript
 * const savedCart = getFromCookies();
 * if (savedCart) {
 *   dispatch(saveSelected(savedCart));
 *   // Restore user's cart after login redirect
 * }
 * ```
 *
 * @see {@link https://github.com/js-cookie/js-cookie} for cookie handling details
 */
export const getFromCookies = (): CartItem | null => {
  try {
    const cookie = Cookies.get('pendingTrx');

    // Return null if cookie doesn't exist or is empty
    if (!cookie || cookie.trim() === '') {
      return null;
    }

    // Attempt to parse the JSON data
    const parsedData = JSON.parse(cookie);

    // Basic validation to ensure we have a cart-like object
    if (!parsedData || typeof parsedData !== 'object') {
      console.warn('Invalid cart data format in cookies');
      return null;
    }

    return parsedData as CartItem;
  } catch (error) {
    // Log parsing errors for debugging while gracefully handling failure
    console.warn('Failed to parse cart data from cookies:', error);

    // Clean up corrupted cookie to prevent repeated errors
    Cookies.remove('pendingTrx');

    return null;
  }
};

// /**
//  * Cookie storage configuration constants
//  */
// export const COOKIE_CONFIG = {
//   /** Cookie name for pending transaction data */
//   PENDING_TRANSACTION: 'pendingTrx',
//   /** Default cookie expiration (7 days) */
//   DEFAULT_EXPIRY: 7,
// } as const;

// /**
//  * Utility function to safely store cart data in cookies
//  *
//  * Provides a type-safe way to store cart data with proper error handling
//  * and configurable expiration. Used when users need to authenticate before
//  * completing their purchase.
//  *
//  * @param cartData - Cart item data to store
//  * @param expiryDays - Number of days until cookie expires (default: 7)
//  * @returns Boolean indicating success/failure of storage operation
//  *
//  * @example
//  * ```typescript
//  * const success = saveToCookies(cartItem, 3); // Store for 3 days
//  * if (success) {
//  *   router.push('/login?from=preview');
//  * }
//  * ```
//  */
// export const saveToCookies = (cartData: CartItem, expiryDays: number = COOKIE_CONFIG.DEFAULT_EXPIRY): boolean => {
//   try {
//     const serializedData = JSON.stringify(cartData);

//     Cookies.set(COOKIE_CONFIG.PENDING_TRANSACTION, serializedData, {
//       expires: expiryDays,
//       sameSite: 'strict',
//       secure: process.env.NODE_ENV === 'production',
//     });

//     return true;
//   } catch (error) {
//     console.error('Failed to save cart data to cookies:', error);
//     return false;
//   }
// };

// /**
//  * Utility function to clear pending transaction cookies
//  *
//  * Removes stored cart data from cookies, typically called after successful
//  * cart restoration or when cleaning up expired/invalid data.
//  *
//  * @example
//  * ```typescript
//  * clearPendingTransaction();
//  * // Called after successful cart restoration
//  * ```
//  */
// export const clearPendingTransaction = (): void => {
//   try {
//     Cookies.remove(COOKIE_CONFIG.PENDING_TRANSACTION);
//   } catch (error) {
//     console.warn('Failed to clear pending transaction cookie:', error);
//   }
// };

// /**
//  * Character data validation utility
//  *
//  * Validates whether the provided object contains the minimum required
//  * character data structure. Useful for runtime type checking.
//  *
//  * @param data - Object to validate
//  * @returns Boolean indicating if data structure is valid
//  *
//  * @example
//  * ```typescript
//  * const isValid = isValidCharacterData(selectedCharacter);
//  * if (!isValid) {
//  *   // Fallback to dummy data or show error
//  * }
//  * ```
//  */
// export const isValidCharacterData = (data: unknown): data is DummySelected => {
//   if (!data || typeof data !== 'object') {
//     return false;
//   }

//   const character = data as Record<string, unknown>;

//   return (
//     typeof character.age === 'string' &&
//     typeof character.gender === 'string' &&
//     typeof character.name === 'string' &&
//     Array.isArray(character.occupations) &&
//     character.occupations.every((item) => typeof item === 'string')
//   );
// };
