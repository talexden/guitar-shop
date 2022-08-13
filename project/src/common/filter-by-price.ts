import {GuitarType} from '../types/stateType';
import {PriceType} from '../store/app-filter/app-filter';

export const filterByPrice = (guitars: GuitarType[], price: PriceType): GuitarType[] => {
  let minPrice = Number(price.priceMin);
  let maxPrice = Number(price.priceMax);
  if (minPrice > maxPrice) {
    [minPrice, maxPrice] = [maxPrice, minPrice];
  }

  return guitars.filter((guitar) => guitar.price >= minPrice && guitar.price <= maxPrice);
};
