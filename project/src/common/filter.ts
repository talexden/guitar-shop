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


export const filterByString = (guitars: GuitarType[], strings: StringsType) => {
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


export const getCheckboxStrings = (checkboxType: CheckboxType[], checkboxStore: CheckboxStoreType): StringsType => {
  let checkboxStrings: StringsType = [];
  checkboxType.forEach((checkbox) => {
    const strings: StringsType = checkboxStore[checkbox.name].isChecked ? checkbox.string : [];
    checkboxStrings = [...new Set([...checkboxStrings,...strings])];
  });
  return checkboxStrings;
};


export const isCheckboxTypeChecked = (checkboxType: CheckboxType[], checkboxStore: CheckboxStoreType): boolean => {
  let isChecked = false;
  checkboxType.forEach((type) => {
    if (checkboxStore[type.name].isChecked) {
      isChecked = true;
    }
  });
  return isChecked;
};


export const disableCheckbox = (checkboxState: CheckboxStoreType, checkboxType: CheckboxType[], guitarStrings: number[]): CheckboxStoreType => {
  let state = {...checkboxState};
  checkboxType.forEach((type) => {
    const checkboxName = type.name;
    const checkboxString = type.string[0];
    const isDisableFlag = guitarStrings.length > 0 ? !guitarStrings.includes(checkboxString): false;
    const isCheckedFlag = isDisableFlag ? false : state[checkboxName].isChecked;

    const currentCheckbox = {
      name: checkboxName,
      isDisabled: isDisableFlag,
      isChecked: isCheckedFlag,
    };

    state = {...state, [checkboxName]: currentCheckbox};
  });

  return state;
};


export const getCheckboxGuitarString = (checkboxState: CheckboxStoreType, checkboxType: CheckboxType[]): StringsType => {
  let checkboxGuitarStrings: StringsType = [];
  checkboxType.forEach((type) => {
    if (checkboxState[type.name].isChecked) {
      checkboxGuitarStrings = [...new Set([...checkboxGuitarStrings,...type.string])];
    }
  });

  return checkboxGuitarStrings;
};
