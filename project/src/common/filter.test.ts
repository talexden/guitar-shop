import {getCheckboxStrings, getFilterByPrice, getFilteredByString, getMinMaxPrice} from './filter';
import {mockGuitarsLongArray, mockGuitarsFilterByPrice, mockGuitarsFilteredByString} from './mock-guitars';

describe('Business logic: check filter functions', () => {
  describe('Function: getMinMaxPrice', () => {
    it('should be return min end max price from structure GUITARS', () => {
      expect(getMinMaxPrice(mockGuitarsLongArray))
        .toEqual({priceMax: 35000, priceMin: 1700});
    });
  });
  describe('Function: getFilterByPrice', () => {
    it('should be filter structure GUITARS by min end max price', () => {
      const minPrice  = 1700;
      const maxPrice = 1900;
      expect(getFilterByPrice(mockGuitarsLongArray, minPrice, maxPrice))
        .toEqual(mockGuitarsFilterByPrice);
    });
  });
  describe('Function: getFilteredByString', () => {
    it('should be filter structure GUITARS by string count array', () => {
      const strings  = [4, 12];
      expect(getFilteredByString(mockGuitarsLongArray, strings))
        .toEqual(mockGuitarsFilteredByString);
    });
  });
  describe('Function: getCheckboxStrings', () => {
    const CHECKBOX_GUITAR_TYPE = [
      {
        label: 'Акустические гитары',
        name: 'acoustic',
        string: [6, 7, 12],
      },
      {
        label: 'Электрогитары',
        name: 'electric',
        string: [4, 6, 7],
      },
      {
        label: 'Укулеле',
        name: 'ukulele',
        string: [4],
      },
    ];
    it('should be return string array for UNKNOWN type', () => {
      const state = {};
      expect(getCheckboxStrings(CHECKBOX_GUITAR_TYPE, state))
        .toEqual([]);
    });
    it('should be return string array for ukulele type', () => {
      const state = {ukulele: true};
      expect(getCheckboxStrings(CHECKBOX_GUITAR_TYPE, state))
        .toEqual([4]);
    });
    it('should be return string array for acoustic type', () => {
      const state = {acoustic: true};
      expect(getCheckboxStrings(CHECKBOX_GUITAR_TYPE, state))
        .toEqual([6, 7, 12]);
    });
    it('should be return string array for electric type', () => {
      const state = {electric: true};
      expect(getCheckboxStrings(CHECKBOX_GUITAR_TYPE, state))
        .toEqual([4, 6, 7]);
    });
    it('should be return string array for electric & ukulele types', () => {
      const state = {electric: true, ukulele: true};
      expect(getCheckboxStrings(CHECKBOX_GUITAR_TYPE, state))
        .toEqual([4, 6, 7]);
    });
    it('should be return string array for electric & acoustic types', () => {
      const state = {electric: true, acoustic: true};
      expect(getCheckboxStrings(CHECKBOX_GUITAR_TYPE, state))
        .toEqual([6, 7, 12, 4]);
    });
    it('should be return string array for ukulele & acoustic types', () => {
      const state = {ukulele: true, acoustic: true};
      expect(getCheckboxStrings(CHECKBOX_GUITAR_TYPE, state))
        .toEqual([6, 7, 12, 4]);
    });
    it('should be return string array for ukulele & acoustic & electric types', () => {
      const state = {ukulele: true, acoustic: true, electric: true};
      expect(getCheckboxStrings(CHECKBOX_GUITAR_TYPE, state))
        .toEqual([6, 7, 12, 4]);
    });
  });
});

