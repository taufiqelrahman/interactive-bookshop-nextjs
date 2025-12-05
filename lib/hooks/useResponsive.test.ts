/**
 * @jest-environment jsdom
 */

import { renderHook } from '@testing-library/react';

import { useResponsive } from './useResponsive';

describe('lib/hooks/useResponsive', () => {
  const originalInnerWidth = window.innerWidth;

  afterEach(() => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: originalInnerWidth,
    });
  });

  describe('useResponsive hook', () => {
    it('should return true for mobile when width is less than 768', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 767,
      });

      const { result } = renderHook(() => useResponsive());
      expect(result.current.isMobile).toBe(true);
    });

    it('should return false for mobile when width is 768 or more', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 768,
      });

      const { result } = renderHook(() => useResponsive());
      expect(result.current.isMobile).toBe(false);
    });

    it('should return false for mobile on desktop width', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1024,
      });

      const { result } = renderHook(() => useResponsive());
      expect(result.current.isMobile).toBe(false);
    });
  });
});
