import {PriceType} from '../store/app-filter/app-filter';

export const correctUserPrice = ({...price}: PriceType, checkboxPrice: PriceType) => {
  if (price.priceMin === '') {
    price.priceMin = checkboxPrice.priceMin;
  }
  if (price.priceMax === '') {
    price.priceMax = checkboxPrice.priceMax;
  }

  if (Number(price.priceMin) > Number(price.priceMax)) {
    [price.priceMin, price.priceMax] = [price.priceMax, price.priceMin];
  }

  if (Number(price.priceMin) < Number(checkboxPrice.priceMin)) {
    price.priceMin = checkboxPrice.priceMin;
  }
  if (Number(price.priceMin) > Number(checkboxPrice.priceMax)) {
    price.priceMin = checkboxPrice.priceMax;
  }
  if (Number(price.priceMax) < Number(checkboxPrice.priceMin)) {
    price.priceMax = checkboxPrice.priceMin;
  }
  if (Number(price.priceMax) > Number(checkboxPrice.priceMax)) {
    price.priceMax = checkboxPrice.priceMax;
  }

  const realUserPrice = Object.assign({},price);

  if (price.priceMin === checkboxPrice.priceMin) {
    price.priceMin = '';
  }
  if (price.priceMax === checkboxPrice.priceMax) {
    price.priceMax = '';
  }

  const userPrice = price;

  return {userPrice, realUserPrice};
};
