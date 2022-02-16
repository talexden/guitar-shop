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
  return {priceMin: String(priceMin), priceMax: String(priceMax)};
};


export const getFilterByPrice = (guitars: GuitarType[], minPrice: number, maxPrice: number): GuitarType[] => {
  if (minPrice > maxPrice) {
    [minPrice, maxPrice] = [maxPrice, minPrice];
  }

  return guitars.filter((guitar) => guitar.price >= minPrice && guitar.price <= maxPrice);
};


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

export const filterGuitarsByType = (guitares: GuitarType[], checkboxType: CheckboxType[], state: checkboxStateType): GuitarType[] => {
  let sortedGuitars: GuitarType[] = [];
  let noChecked = true;
  checkboxType.forEach((type) => {
    if (state[type.name]) {
      noChecked = false;
      const filteredGuitars = guitares.filter((guitar) => state[type.name] && guitar.type === type.name);
      sortedGuitars = [...new Set([...sortedGuitars, ...filteredGuitars])];
    }
  });

  return noChecked ? guitares: sortedGuitars;
};


export const getGuitarTypeStrings = (guitars: GuitarType[]) => [...new Set(guitars.map((guitar)=> guitar.stringCount))];

export const getCheckboxStrings = (checkboxType: CheckboxType[], state: checkboxStateType): number[] => {
  let checkboxStrings: number[] = [];
  checkboxType.forEach((checkbox) => {
    const strings: StringsType = state[checkbox.name] ? checkbox.string : [];
    checkboxStrings = [...new Set([...checkboxStrings,...strings])];
  });
  return checkboxStrings;
};
