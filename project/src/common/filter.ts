import {CheckboxType, StringsType} from '../types/const-type';
import {checkboxStateType, priceStateType} from '../types/filter-types';
import {GuitarType} from '../types/stateType';


export const getMinMaxPrice = (guitars: GuitarType[]): priceStateType => {
  let priceMin = guitars[0].price;
  let priceMax = guitars[0].price;
  guitars.forEach((guitar) => {
    if (guitar.price > priceMax) {priceMax = guitar.price;}
    if (guitar.price < priceMin) {priceMin = guitar.price;}
  });
  return {priceMin, priceMax};
};


export const getFilterByPrice = (guitars: GuitarType[], minPrice: number, maxPrice: number): GuitarType[] => (
  guitars.filter((guitar) => guitar.price >= minPrice && guitar.price <= maxPrice)
);


export const getFilteredByString = (guitars: GuitarType[], strings: StringsType) => {
  let filteredGuitars = [...guitars];
  if (strings.length > 0) {
    filteredGuitars = guitars.filter((guitar) => {
      let isGuitar = false;
      strings.forEach((string) => {
        if (guitar.stringCount === string) {
          isGuitar = true;
        }
      });
      return isGuitar;
    });
  }
  return filteredGuitars;
};


export const getCheckboxStrings = (checkboxType: CheckboxType[], state: checkboxStateType) => {
  let checkboxStrings: number[] = [];
  checkboxType.forEach((checkbox, idx) => {
    const strings: StringsType = state[checkbox.name] === true ? checkbox.string : [];
    checkboxStrings = [...new Set([...checkboxStrings,...strings])];
  });
  return checkboxStrings;
};
