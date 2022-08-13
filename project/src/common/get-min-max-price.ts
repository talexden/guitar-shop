import {GuitarType} from '../types/stateType';
import {PriceType} from '../store/app-filter/app-filter';

export const getMinMaxPrice = (guitars: GuitarType[]): PriceType => {
  let priceMin = 0;
  let priceMax = 0;

  if (guitars.length > 0) {
    priceMin = guitars[0].price;
    priceMax = guitars[0].price;
  }

  if (guitars.length) {
    guitars.forEach((guitar) => {
      if (guitar.price > priceMax) {
        priceMax = guitar.price;
      }
      if (guitar.price < priceMin) {
        priceMin = guitar.price;
      }
    });
  }

  return {priceMin: String(priceMin), priceMax: String(priceMax)};
};
