import {createReducer} from '@reduxjs/toolkit';
import {CheckboxType} from '../../types/const-type';
import {CHECKBOX_GUITAR_TYPE, CHECKBOX_STRING_TYPE} from '../../common/const';
import {GuitarType} from '../../types/stateType';

import {
  disableCheckbox,
  filterByString,
  getCheckboxString, getFilterByPrice, getMinMaxPrice,
  isCheckboxTypeChecked
} from '../../common/filter';

import {
  setCheckboxStore,
  setUserPrice,
  setGuitars,
  setIsLoading,
  setIsLoaded
} from '../action';


export type CheckboxStoreType = {
    [key: string]: {
      name: string,
      isChecked: boolean,
      isDisabled: boolean,
  },
};

export type PriceStoreType = {
  [key:string] : string,
}

export type GuitarStringsType = number[]

export type AppFilterType = {
  guitars: GuitarType[],
  isLoading: boolean,
  price: {
    userPrice: PriceStoreType,
    filteredPrice:PriceStoreType,
  },
  guitarsFilteredByCheckbox: GuitarType[],
  checkboxStore: CheckboxStoreType,
  isStringChecked: boolean,
  isTypeChecked: boolean,
  filteredGuitars: GuitarType[];
}

const getCheckboxesInit = (checkboxTypes: CheckboxType[]) => {
  let checkboxes = {};
  checkboxTypes.forEach((type) => {
    checkboxes = {
      ...checkboxes,
      [type.name]: {
        name: type.name,
        isChecked: false,
        isDisabled: false,
      },
    };
  });
  return checkboxes;
};

export const checkboxStoreInit: CheckboxStoreType = {
  ...getCheckboxesInit(CHECKBOX_GUITAR_TYPE),
  ...getCheckboxesInit(CHECKBOX_STRING_TYPE),
};

const initialStore: AppFilterType = {
  guitars: [],
  isLoading: false,
  price: {
    userPrice: {
      priceMin: '',
      priceMax: '',
    },
    filteredPrice: {
      priceMin: '',
      priceMax: '',
    },
  },
  guitarsFilteredByCheckbox: [],
  checkboxStore: checkboxStoreInit,
  isStringChecked: false,
  isTypeChecked: false,
  filteredGuitars: [],
};

export const AppFilter = createReducer(initialStore, (builder)=>{
  builder

    .addCase(setGuitars, (state, action) => {
      const {guitars} = action.payload;
      state.price.filteredPrice = getMinMaxPrice(guitars);
      state.guitarsFilteredByCheckbox = guitars;
      state.guitars = guitars;
    })

    .addCase(setIsLoading, (state) => {state.isLoading = true;})

    .addCase(setIsLoaded, (state) => {state.isLoading = false;})

    .addCase(setUserPrice, (state, action) => {
      const price = action.payload;
      const filteredPrice = state.price.filteredPrice;
      const guitars = state.guitarsFilteredByCheckbox;

      if (price.priceMin === '') {
        price.priceMin = filteredPrice.priceMin;
      }
      if (price.priceMax === '') {
        price.priceMax = filteredPrice.priceMax;
      }

      if (Number(price.priceMin) > Number(price.priceMax)) {
        [price.priceMin, price.priceMax] = [price.priceMax, price.priceMin];
      }

      if (Number(price.priceMin) < Number(filteredPrice.priceMin)) {
        price.priceMin = filteredPrice.priceMin;
      }
      if (Number(price.priceMin) > Number(filteredPrice.priceMax)) {
        price.priceMin = filteredPrice.priceMax;
      }
      if (Number(price.priceMax) < Number(filteredPrice.priceMin)) {
        price.priceMax = filteredPrice.priceMin;
      }
      if (Number(price.priceMax) > Number(filteredPrice.priceMax)) {
        price.priceMax = filteredPrice.priceMax;
      }

      state.filteredGuitars = getFilterByPrice(guitars, Number(price.priceMin), Number(price.priceMax));
      state.price.userPrice = price
    })

    .addCase(setCheckboxStore, (state, action) => {
      const checkboxState = action.payload;
      const isGuitarTypeChecked = isCheckboxTypeChecked(CHECKBOX_GUITAR_TYPE, checkboxState);
      const isStringTypeChecked = isCheckboxTypeChecked(CHECKBOX_STRING_TYPE, checkboxState);
      let currentGuitars: GuitarType[] = state.guitars;
      const checkboxGuitarTypeStrings = getCheckboxString(checkboxState, CHECKBOX_GUITAR_TYPE);
      const checkboxGuitarStrings = getCheckboxString(checkboxState, CHECKBOX_STRING_TYPE);
      const correctedCheckboxState = disableCheckbox(checkboxState, CHECKBOX_STRING_TYPE, checkboxGuitarTypeStrings);

      if (isGuitarTypeChecked){
        currentGuitars = [];
        CHECKBOX_GUITAR_TYPE.forEach((type) => {
          if (correctedCheckboxState[type.name].isChecked) {
            const checkedTypeGuitars = state.guitars.filter((guitar) => correctedCheckboxState[type.name] && guitar.type === type.name);
            currentGuitars = [...new Set([...currentGuitars, ...checkedTypeGuitars])];
          }
        });
      }

      if (isStringTypeChecked){
        currentGuitars = filterByString(currentGuitars, checkboxGuitarStrings);
      }

      state.checkboxStore = correctedCheckboxState;

      // if (!isGuitarTypeChecked && !isStringTypeChecked) {
      //   state.price.userPrice = {
      //     priceMin: '',
      //     priceMax: '',
      //   };
      // }

      const price = getMinMaxPrice(currentGuitars);
      const filteredPrice = state.price.filteredPrice;
      if (price.priceMin !== filteredPrice.priceMin || price.priceMax !== filteredPrice.priceMax) {
        state.price.filteredPrice = price;
      }
      state.guitarsFilteredByCheckbox = currentGuitars;
    });
});
