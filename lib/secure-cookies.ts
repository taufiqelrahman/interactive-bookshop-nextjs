import Cookies from 'js-cookie';

/**
 * Secure cookie configuration
 *
 * Provides security best practices for cookie handling:
 * - sameSite: 'strict' - Prevents CSRF attacks by not sending cookies cross-site
 * - secure: true in production - Ensures cookies only sent over HTTPS
 * - expires: 7 days default - Reasonable session duration
 *
 * Note: httpOnly cannot be set via js-cookie (client-side)
 * For truly secure tokens, set httpOnly cookies via server-side Set-Cookie headers
 */

/**
 * Cookie options interface
 */
interface CookieOptions {
  expires?: number | Date;
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
}

/**
 * Default secure cookie options for production
 */
export const SECURE_COOKIE_OPTIONS: CookieOptions = {
  sameSite: 'strict',
  secure: process.env.NODE_ENV === 'production',
  expires: 7, // 7 days
  domain: process.env.DOMAIN,
};

/**
 * Set a cookie with secure defaults
 *
 * @param name - Cookie name
 * @param value - Cookie value
 * @param options - Additional cookie options (merged with secure defaults)
 *
 * @example
 * ```typescript
 * setSecureCookie('user', token);
 * setSecureCookie('session', sessionId, { expires: 1 }); // 1 day
 * ```
 */
export const setSecureCookie = (name: string, value: string, options?: CookieOptions): void => {
  const cookieOptions: CookieOptions = {
    ...SECURE_COOKIE_OPTIONS,
    ...options,
  };

  Cookies.set(name, value, cookieOptions as any);
};

/**
 * Get a cookie value
 *
 * @param name - Cookie name
 * @returns Cookie value or undefined
 */
export const getSecureCookie = (name: string): string | undefined => {
  return Cookies.get(name);
};

/**
 * Remove a cookie
 *
 * @param name - Cookie name
 * @param options - Cookie options (must match the options used when setting)
 */
export const removeSecureCookie = (name: string, options?: CookieOptions): void => {
  const cookieOptions: CookieOptions = {
    domain: process.env.DOMAIN,
    ...options,
  };

  Cookies.remove(name, cookieOptions as any);
};

/**
 * CSRF Token Management
 *
 * Generates and validates CSRF tokens to prevent cross-site request forgery.
 * Tokens should be included in forms and validated server-side.
 */

/**
 * Generate a random CSRF token
 *
 * @returns Random token string (base64)
 */
export const generateCSRFToken = (): string => {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return btoa(String.fromCharCode.apply(null, Array.from(array)));
};

/**
 * Set CSRF token in cookie
 *
 * @param token - CSRF token (generates new one if not provided)
 * @returns The CSRF token
 */
export const setCSRFToken = (token?: string): string => {
  const csrfToken = token || generateCSRFToken();
  setSecureCookie('csrf-token', csrfToken, { expires: 1 }); // 1 day
  return csrfToken;
};

/**
 * Get CSRF token from cookie
 *
 * @returns CSRF token or undefined
 */
export const getCSRFToken = (): string | undefined => {
  return getSecureCookie('csrf-token');
};

/**
 * Validate CSRF token
 *
 * @param token - Token to validate
 * @returns True if token matches cookie value
 */
export const validateCSRFToken = (token: string): boolean => {
  const storedToken = getCSRFToken();
  return !!storedToken && storedToken === token;
};
