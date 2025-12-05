/**
 * @jest-environment jsdom
 */

import Cookies from 'js-cookie';

import { getSecureCookie, setSecureCookie, removeSecureCookie } from './secure-cookies';

jest.mock('js-cookie');

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
});
