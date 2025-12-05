import { customStyles, dates, months, years, Option } from './helper';

describe('components/atoms/DateField/helper', () => {
  describe('customStyles', () => {
    it('should have menu styles with proper border config', () => {
      const provided = { marginTop: 10, border: '1px solid' };
      const result = customStyles.menu(provided);

      expect(result.marginTop).toBe(0);
      expect(result.border).toBe('2px solid #333');
      expect(result.borderTopRightRadius).toBe(0);
      expect(result.borderTopLeftRadius).toBe(0);
      expect(result.borderTop).toBe('none');
    });

    it('should hide indicator separator', () => {
      const result = customStyles.indicatorSeparator();
      expect(result.display).toBe('none');
    });

    it('should apply hover styles to option', () => {
      const provided = {};
      const result = customStyles.option(provided);

      expect(result['&:hover']).toEqual({
        background: '#333',
        color: 'white',
      });
    });

    it('should style control with focus state', () => {
      const provided = {
        borderBottomRightRadius: 4,
        borderBottomLeftRadius: 4,
      };
      const state = { isFocused: true };
      const result = customStyles.control(provided, state);

      expect(result.borderWidth).toBe(2);
      expect(result.borderColor).toBe('#333');
      expect(result.borderBottomRightRadius).toBe(0);
      expect(result.borderBottomLeftRadius).toBe(0);
      expect(result.paddingLeft).toBe(6);
    });

    it('should style control without focus state', () => {
      const provided = {
        borderBottomRightRadius: 4,
        borderBottomLeftRadius: 4,
      };
      const state = { isFocused: false };
      const result = customStyles.control(provided, state);

      expect(result.borderColor).toBe('#e1e0e7');
      expect(result.borderBottomRightRadius).toBe(4);
      expect(result.borderBottomLeftRadius).toBe(4);
    });
  });

  describe('dates', () => {
    it('should return 31 days for odd month', () => {
      const month: Option = { value: '01', label: '01' };
      const result = dates(month);

      expect(result).toHaveLength(31);
      expect(result[0]).toEqual({ value: '01', label: '01' });
      expect(result[30]).toEqual({ value: '31', label: '31' });
    });

    it('should return 30 days for even month (except February)', () => {
      const month: Option = { value: '04', label: '04' };
      const result = dates(month);

      expect(result).toHaveLength(30);
      expect(result[29]).toEqual({ value: '30', label: '30' });
    });

    it('should return 28 days for February', () => {
      const month: Option = { value: '02', label: '02' };
      const result = dates(month);

      expect(result).toHaveLength(28);
      expect(result[27]).toEqual({ value: '28', label: '28' });
    });

    it('should return 31 days when month is null', () => {
      const result = dates(null);

      expect(result).toHaveLength(31);
    });

    it('should pad single digit dates with zero', () => {
      const month: Option = { value: '01', label: '01' };
      const result = dates(month);

      expect(result[0].value).toBe('01');
      expect(result[8].value).toBe('09');
      expect(result[9].value).toBe('10');
    });
  });

  describe('months', () => {
    it('should return 12 months', () => {
      expect(months).toHaveLength(12);
    });

    it('should start from 01 and end at 12', () => {
      expect(months[0]).toEqual({ value: '01', label: '01' });
      expect(months[11]).toEqual({ value: '12', label: '12' });
    });

    it('should pad single digit months with zero', () => {
      expect(months[0].value).toBe('01');
      expect(months[8].value).toBe('09');
      expect(months[9].value).toBe('10');
    });
  });

  describe('years', () => {
    it('should return 20 years', () => {
      const result = years();
      expect(result).toHaveLength(20);
    });

    it('should start from current year', () => {
      const result = years();
      const currentYear = new Date().getUTCFullYear();

      expect(result[0]).toEqual({
        value: String(currentYear),
        label: String(currentYear),
      });
    });

    it('should go back 19 years', () => {
      const result = years();
      const currentYear = new Date().getUTCFullYear();

      expect(result[19]).toEqual({
        value: String(currentYear - 19),
        label: String(currentYear - 19),
      });
    });

    it('should return consecutive years in descending order', () => {
      const result = years();

      for (let i = 0; i < result.length - 1; i++) {
        const currentYear = Number(result[i].value);
        const nextYear = Number(result[i + 1].value);
        expect(currentYear - nextYear).toBe(1);
      }
    });
  });
});
