const { calculateMean, calculateMedian, calculateMode, areQueryParamsNumbers } = require('./functions');

describe('calculateMean', () => {
  it('returns the correct mean', () => {
    const numbers = [1, 2, 3, 4, 5];
    const mean = calculateMean(numbers);
    expect(mean).toBe(3);
  });
});

describe('calculateMedian', () => {
  it('returns the correct median for an odd-length array', () => {
    const numbers = [1, 2, 3, 4, 5];
    const median = calculateMedian(numbers);
    expect(median).toBe(3);
  });

  it('returns the correct median for an even-length array', () => {
    const numbers = [1, 2, 3, 4];
    const median = calculateMedian(numbers);
    expect(median).toBe(2.5);
  });
});

describe('calculateMode', () => {
  it('returns the correct mode', () => {
    const numbers = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4];
    const mode = calculateMode(numbers);
    expect(mode).toEqual([4]);
  });
});

describe('areQueryParamsNumbers', () => {
  it('returns true for query parameters that are numbers', () => {
    const query = [1,2,3,4 ];
    const result = areQueryParamsNumbers(query);
    expect(result).toBe(true);
  });

  it('returns false for query parameters that are not numbers', () => {
    const query = { nums: '1,2,foo' };
    const result = areQueryParamsNumbers(query);
    expect(result).toBe(false);
  });
});
