import { describe, it, expect } from 'vitest';
import { nabeatsu } from './nabeatsu';

describe('nabeatsu', () => {
  it('should return [1, 2, "aho"] when input is 3', () => {
    expect(nabeatsu(3)).toEqual([1, 2, 'aho']);
  });

  it('should return [..., 4, "bow"] when input is 5', () => {
    expect(nabeatsu(5)).toEqual([1, 2, 'aho', 4, 'bow']);
  });

  it('should return [..., 14, "ahobow"] when input is 15', () => {
    expect(nabeatsu(15)).toEqual([
      1,
      2,
      'aho',
      4,
      'bow',
      'aho',
      7,
      8,
      'aho',
      'bow',
      11,
      'aho',
      13,
      14,
      'ahobow',
    ]);
  });
});
