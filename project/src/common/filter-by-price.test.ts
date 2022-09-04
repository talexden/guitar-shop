import {filterByPrice} from './filter-by-price';
import {mockGuitarsFilterByPrice, mockGuitarsLongArray} from './mock/mock-guitars';

describe('Function: filterByPrice', () => {
  it('should be filter structure GUITARS by min end max price', () => {
    const price = {
      priceMax: '1900',
      priceMin: '1700',
    };

    expect(filterByPrice(mockGuitarsLongArray, price)).toEqual(mockGuitarsFilterByPrice);
  });
});
