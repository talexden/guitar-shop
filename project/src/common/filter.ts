import {CheckboxType, StringsType} from '../types/const-type';
import {GuitarType} from '../types/stateType';
import {CheckboxStoreType, PriceStoreType} from '../store/app-filter/app-filter';


export const getMinMaxPrice = (guitars: GuitarType[]): PriceStoreType => {
  let priceMin = 0;
  let priceMax = 0;

  if (guitars.length > 0) {
    priceMin = guitars[0].price;
    priceMax = guitars[0].price;
  }

  if (guitars.length) {
    guitars.forEach((guitar) => {
      if (guitar.price > priceMax) {priceMax = guitar.price;}
      if (guitar.price < priceMin) {priceMin = guitar.price;}
    });
  }

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

export const filterGuitarsByType = (guitars: GuitarType[], checkboxType: CheckboxType[], checkboxStore: CheckboxStoreType ): GuitarType[] => {
  let filteredGuitars: GuitarType[] = [];
  let noChecked = true;
  checkboxType.forEach((type) => {
    if (checkboxStore[type.name].isChecked) {
      noChecked = false;
      const checkedTypeGuitars = guitars.filter((guitar) => checkboxStore[type.name] && guitar.type === type.name);
      filteredGuitars = [...new Set([...filteredGuitars, ...checkedTypeGuitars])];
    }
  });

  return noChecked ? [...guitars] : filteredGuitars;
};


// export const getGuitarTypeStrings = (guitars: GuitarType[]): StringsType => [...new Set(guitars.map((guitar)=> guitar.stringCount))];

export const getCheckboxStrings = (checkboxType: CheckboxType[], checkboxStore: CheckboxStoreType): StringsType => {
  let checkboxStrings: StringsType = [];
  checkboxType.forEach((checkbox) => {
    const strings: StringsType = checkboxStore[checkbox.name].isChecked ? checkbox.string : [];
    checkboxStrings = [...new Set([...checkboxStrings,...strings])];
  });
  return checkboxStrings;
};
