import dayjs from 'dayjs';
import { date, fullDate } from './format-date';

describe('lib/format-date', () => {
  describe('date', () => {
    it('should format date with default format', () => {
      const result = date('2023-12-01');
      expect(result).toContain('01');
      expect(result).toContain('December');
      expect(result).toContain('2023');
    });

    it('should format date with custom format', () => {
      const result = date('2023-12-01', 'YYYY-MM-DD');
      expect(result).toBe('2023-12-01');
    });

    it('should handle Date object', () => {
      const testDate = new Date('2023-12-01');
      const result = date(testDate, 'YYYY-MM-DD');
      expect(result).toBe('2023-12-01');
    });

    it('should handle dayjs object', () => {
      const testDate = dayjs('2023-12-01');
      const result = date(testDate, 'YYYY-MM-DD');
      expect(result).toBe('2023-12-01');
    });

    it('should handle timestamp', () => {
      const timestamp = new Date('2023-12-01').getTime();
      const result = date(timestamp, 'YYYY-MM-DD');
      expect(result).toBe('2023-12-01');
    });
  });

  describe('fullDate', () => {
    it('should format date with time and default format', () => {
      const result = fullDate('2023-12-01 15:30:00');
      expect(result).toContain('01');
      expect(result).toContain('Dec');
      expect(result).toContain('2023');
      expect(result).toContain('15:30');
      expect(result).toContain('WIB');
    });

    it('should return empty string for null', () => {
      expect(fullDate(null)).toBe('');
    });

    it('should return empty string for undefined', () => {
      expect(fullDate(undefined)).toBe('');
    });

    it('should format with custom format', () => {
      const result = fullDate('2023-12-01 15:30:00', 'YYYY-MM-DD HH:mm');
      expect(result).toBe('2023-12-01 15:30');
    });
  });
});
