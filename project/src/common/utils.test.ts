import {capitalizedString, getIntegersArrayFromTo, getTripleNumberString} from './utils';

describe('Business logic: check utils functions', () => {
  describe('Function: getTripleNumberString', () => {
    it('should be return string with number, grouping by 3', () => {
      const number1 = 213;
      const number2 = 45734;
      const number3 = 26553634;
      expect(getTripleNumberString(number1))
        .toEqual('213');
      expect(getTripleNumberString(number2))
        .toEqual('45 734');
      expect(getTripleNumberString(number3))
        .toEqual('26 553 634');
    });
  });
  describe('Function: capitalizedString', () => {
    it('should be return string with first symbol capitalized', () => {
      const string1 = 'function';
      const string2 = 'capitalizedString';
      const string3 = 'getTriple&NumberString4You$!!';
      expect(capitalizedString(string1))
        .toEqual('Function');
      expect(capitalizedString(string2))
        .toEqual('CapitalizedString');
      expect(capitalizedString(string3))
        .toEqual('GetTriple&NumberString4You$!!');
    });
  });
  describe('Function: getIntegersArrayFromTo', () => {
    it('should be return number[], from A to B', () => {
      const a1 = 1;
      const b1 = 5;
      const a2 = 3;
      const b2 = 8;
      expect(getIntegersArrayFromTo(a1, b1))
        .toEqual([1, 2, 3, 4, 5]);
      expect(getIntegersArrayFromTo(a2, b2))
        .toEqual([3, 4, 5, 6, 7, 8]);

    });
  });
});
