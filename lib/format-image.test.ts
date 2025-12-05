import { Character } from 'store/cart/types';

import { getPreviewUrl } from './format-image';

describe('lib/format-image', () => {
  describe('getPreviewUrl', () => {
    it('should generate preview URL with all attributes', () => {
      const attributes: Partial<Character> = {
        Gender: 'boy',
        Age: 'kid',
        Skin: 'light',
        Hair: 'short',
      };
      const result = getPreviewUrl(attributes as Character);
      expect(result).toBe('/static/images/child/boy/kid/short/light.png');
    });

    it('should use default values for missing attributes', () => {
      const attributes: Partial<Character> = {};
      const result = getPreviewUrl(attributes as Character);
      expect(result).toBe('/static/images/child/boy/kid/short/light.png');
    });

    it('should handle girl gender', () => {
      const attributes: Partial<Character> = {
        Gender: 'girl',
        Age: 'teen',
        Skin: 'dark',
        Hair: 'long',
      };
      const result = getPreviewUrl(attributes as Character);
      expect(result).toBe('/static/images/child/girl/teen/long/dark.png');
    });

    it('should handle partial attributes with defaults', () => {
      const attributes: Partial<Character> = {
        Gender: 'girl',
        Skin: 'medium',
      };
      const result = getPreviewUrl(attributes as Character);
      expect(result).toBe('/static/images/child/girl/kid/short/medium.png');
    });

    it('should generate correct path structure', () => {
      const attributes: Partial<Character> = {
        Gender: 'boy',
        Age: 'teen',
        Skin: 'light',
        Hair: 'medium',
      };
      const result = getPreviewUrl(attributes as Character);
      expect(result).toContain('/static/images/child/');
      expect(result).toContain('/boy/');
      expect(result).toContain('/teen/');
      expect(result).toContain('/medium/');
      expect(result).toContain('/light.png');
    });

    it('should handle all empty attributes with defaults', () => {
      const attributes: Partial<Character> = {
        Gender: undefined,
        Age: undefined,
        Skin: undefined,
        Hair: undefined,
      };
      const result = getPreviewUrl(attributes as Character);
      expect(result).toBe('/static/images/child/boy/kid/short/light.png');
    });
  });
});
