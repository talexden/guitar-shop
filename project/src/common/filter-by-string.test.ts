import {filterByString} from './filter-by-string';
import {mockGuitarsFilteredByString, mockGuitarsLongArray} from './mock/mock-guitars';

describe('Function: filterByString', () => {
  it('should be filter structure GUITARS by string count array', () => {
    const strings  = [4, 12];
    expect(filterByString(mockGuitarsLongArray, strings)).toEqual(mockGuitarsFilteredByString);
  });
});
