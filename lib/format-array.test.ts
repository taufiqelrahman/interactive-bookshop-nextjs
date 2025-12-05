import { mapKeyValue, KeyValueItem } from './format-array';

describe('lib/format-array', () => {
  describe('mapKeyValue', () => {
    it('should map array with key property to object', () => {
      const input: KeyValueItem[] = [
        { key: 'name', value: 'John' },
        { key: 'age', value: 30 },
        { key: 'city', value: 'Jakarta' },
      ];
      const result = mapKeyValue(input);
      expect(result).toEqual({
        name: 'John',
        age: 30,
        city: 'Jakarta',
      });
    });

    it('should map array with name property to object', () => {
      const input: KeyValueItem[] = [
        { name: 'Gender', value: 'boy' },
        { name: 'Age', value: 'kid' },
        { name: 'Hair', value: 'short' },
      ];
      const result = mapKeyValue(input);
      expect(result).toEqual({
        Gender: 'boy',
        Age: 'kid',
        Hair: 'short',
      });
    });

    it('should handle empty array', () => {
      const result = mapKeyValue([]);
      expect(result).toEqual({});
    });

    it('should handle mixed key and name properties', () => {
      const input: KeyValueItem[] = [
        { key: 'firstName', value: 'John' },
        { name: 'lastName', value: 'Doe' },
      ];
      const result = mapKeyValue(input);
      expect(result).toEqual({
        firstName: 'John',
        lastName: 'Doe',
      });
    });

    it('should overwrite duplicate keys with last value', () => {
      const input: KeyValueItem[] = [
        { key: 'name', value: 'John' },
        { key: 'name', value: 'Jane' },
      ];
      const result = mapKeyValue(input);
      expect(result.name).toBe('Jane');
    });

    it('should handle items without key or name', () => {
      const input: KeyValueItem[] = [{ value: 'test' }, { key: 'valid', value: 'data' }];
      const result = mapKeyValue(input);
      expect(result).toEqual({ valid: 'data' });
    });

    it('should handle complex value types', () => {
      const input: KeyValueItem[] = [
        { key: 'string', value: 'text' },
        { key: 'number', value: 123 },
        { key: 'boolean', value: true },
        { key: 'object', value: { nested: 'value' } },
        { key: 'array', value: [1, 2, 3] },
      ];
      const result = mapKeyValue(input);
      expect(result).toEqual({
        string: 'text',
        number: 123,
        boolean: true,
        object: { nested: 'value' },
        array: [1, 2, 3],
      });
    });
  });
});
