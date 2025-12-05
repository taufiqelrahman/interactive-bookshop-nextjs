/**
 * @jest-environment jsdom
 */

import Cookies from 'js-cookie';

import {
  getSecureCookie,
  setSecureCookie,
  removeSecureCookie,
  generateCSRFToken,
  setCSRFToken,
  getCSRFToken,
  validateCSRFToken,
} from './secure-cookies';

jest.mock('js-cookie');

// Mock crypto.getRandomValues for CSRF token generation
Object.defineProperty(global, 'crypto', {
  value: {
    getRandomValues: (arr: Uint8Array) => {
      for (let i = 0; i < arr.length; i++) {
        arr[i] = Math.floor(Math.random() * 256);
      }
      return arr;
    },
  },
});

describe('lib/secure-cookies', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getSecureCookie', () => {
    it('should get cookie value', () => {
      (Cookies.get as jest.Mock).mockReturnValue('test-value');

      const result = getSecureCookie('testKey');

      expect(Cookies.get).toHaveBeenCalledWith('testKey');
      expect(result).toBe('test-value');
    });

    it('should return undefined for non-existent cookie', () => {
      (Cookies.get as jest.Mock).mockReturnValue(undefined);

      const result = getSecureCookie('nonExistent');

      expect(result).toBeUndefined();
    });
  });

  describe('setSecureCookie', () => {
    it('should set cookie with default options', () => {
      setSecureCookie('testKey', 'testValue');

      expect(Cookies.set).toHaveBeenCalledWith('testKey', 'testValue', {
        expires: 7,
        secure: false,
        sameSite: 'strict',
        domain: undefined,
      });
    });

    it('should set cookie with custom options', () => {
      setSecureCookie('testKey', 'testValue', { expires: 30 });

      expect(Cookies.set).toHaveBeenCalledWith('testKey', 'testValue', {
        expires: 30,
        secure: false,
        sameSite: 'strict',
        domain: undefined,
      });
    });

    it('should handle custom sameSite option', () => {
      setSecureCookie('testKey', 'testValue', { sameSite: 'lax' });

      expect(Cookies.set).toHaveBeenCalledWith('testKey', 'testValue', {
        expires: 7,
        secure: false,
        sameSite: 'lax',
        domain: undefined,
      });
    });
  });

  describe('removeSecureCookie', () => {
    it('should remove cookie with domain', () => {
      removeSecureCookie('testKey');

      expect(Cookies.remove).toHaveBeenCalledWith('testKey', { domain: undefined });
    });

    it('should handle multiple removes', () => {
      removeSecureCookie('key1');
      removeSecureCookie('key2');

      expect(Cookies.remove).toHaveBeenCalledTimes(2);
      expect(Cookies.remove).toHaveBeenCalledWith('key1', { domain: undefined });
      expect(Cookies.remove).toHaveBeenCalledWith('key2', { domain: undefined });
    });

    it('should pass custom options when removing', () => {
      removeSecureCookie('testKey', { path: '/custom' });

      expect(Cookies.remove).toHaveBeenCalledWith('testKey', {
        domain: undefined,
        path: '/custom',
      });
    });
  });

  describe('generateCSRFToken', () => {
    it('should generate a random token', () => {
      const token1 = generateCSRFToken();
      const token2 = generateCSRFToken();

      expect(token1).toBeDefined();
      expect(token2).toBeDefined();
      expect(typeof token1).toBe('string');
      expect(token1).not.toBe(token2); // Should be different each time
    });
  });

  describe('setCSRFToken', () => {
    it('should set CSRF token cookie', () => {
      const token = setCSRFToken();

      expect(token).toBeDefined();
      expect(typeof token).toBe('string');
      expect(Cookies.set).toHaveBeenCalled();
    });

    it('should use provided token', () => {
      const customToken = 'my-custom-token';
      const result = setCSRFToken(customToken);

      expect(result).toBe(customToken);
      expect(Cookies.set).toHaveBeenCalled();
    });
  });

  describe('getCSRFToken', () => {
    it('should get CSRF token from cookie', () => {
      (Cookies.get as jest.Mock).mockReturnValue('csrf-token-value');

      const result = getCSRFToken();

      expect(result).toBe('csrf-token-value');
      expect(Cookies.get).toHaveBeenCalledWith('csrf-token');
    });
  });

  describe('validateCSRFToken', () => {
    it('should validate matching token', () => {
      (Cookies.get as jest.Mock).mockReturnValue('valid-token');

      const result = validateCSRFToken('valid-token');

      expect(result).toBe(true);
    });

    it('should reject non-matching token', () => {
      (Cookies.get as jest.Mock).mockReturnValue('valid-token');

      const result = validateCSRFToken('invalid-token');

      expect(result).toBe(false);
    });

    it('should reject when no token is stored', () => {
      (Cookies.get as jest.Mock).mockReturnValue(undefined);

      const result = validateCSRFToken('any-token');

      expect(result).toBe(false);
    });
  });
});
