import {getMinMaxPrice} from './get-min-max-price';
import {mockGuitarsLongArray} from './mock/mock-guitars';

describe('Function: getMinMaxPrice', () => {
  it('should be return min end max price from structure GUITARS', () => {
    expect(getMinMaxPrice(mockGuitarsLongArray)).toEqual({priceMax: '35000', priceMin: '1700'});
  });
});
