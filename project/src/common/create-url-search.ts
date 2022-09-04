import {AppFilterType} from '../store/app-filter/app-filter';

export const createUrlSearch = ({checkboxStore, price, isFilter, sortKey, sortDirect}: AppFilterType): string => {
  const params: string[] = [];
  const {userPrice} = price;
  if (userPrice.priceMin) {
    params.push(`priceMin=${userPrice.priceMin}`);
  }

  if (userPrice.priceMax) {
    params.push(`priceMax=${userPrice.priceMax}`);
  }

  Object.keys(checkboxStore).forEach((key) => {
    if (checkboxStore[key].isChecked && !checkboxStore[key].isDisabled) {
      params.push(`${key}=${checkboxStore[key].isChecked}`);
    }
  });

  if (isFilter) {
    params.push(`sortKey=${sortKey}`);
    params.push(`sortDirect=${sortDirect}`);
  }

  const search = `?${params.join('&')}`;

  return search.length > 1 ? search : '';
};
