import { describe, it, expect } from 'vitest';
import { countVowel } from './count-vowel';

describe('countVowel', () => {
  it('should return 2 when input is "vowel"', () => {
    expect(countVowel('vowel')).toBe(2);
  });

  it('should return 4 when input is "Nabe Atsu"', () => {
    expect(countVowel('Nabe Atus')).toBe(4);
  });
});
