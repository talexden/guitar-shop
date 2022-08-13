import {CheckboxStoreType, PriceStoreType} from '../store/app-filter/app-filter';

export const createUrlParams = (price: PriceStoreType, checkbox: CheckboxStoreType): string => {
  const {userPrice, checkboxPrice} = price;
  const priceParams: string[] = [];
  if (userPrice.priceMin !== checkboxPrice.priceMin && userPrice.priceMin !== '') {
    priceParams.push(`priceMin=${userPrice.priceMin}`);
  }
  if (userPrice.priceMax !== checkboxPrice.priceMax && userPrice.priceMax !== '') {
    priceParams.push(`priceMax=${userPrice.priceMax}`);
  }

  const checkboxParams: string[] = [];
  Object.keys(checkbox).forEach((key) => {
    if (checkbox[key].isChecked && !checkbox[key].isDisabled) {
      checkboxParams.push(`${key}=${checkbox[key].isChecked}`);
    }
  });


  return `?${[...priceParams, ...checkboxParams].join('&')}`;
};
