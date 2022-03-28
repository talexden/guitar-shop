import {createReducer} from '@reduxjs/toolkit';
import {CheckboxType} from '../../types/const-type';
import {CHECKBOX_GUITAR_TYPE, CHECKBOX_STRING_TYPE} from '../../common/const';
import {GuitarType} from '../../types/stateType';

import {
  disableCheckbox,
  filterByString,
  getCheckboxGuitarString,
  isCheckboxTypeChecked
} from '../../common/filter';

import {
  setCheckboxStore,
  setCurrentPrice,
  setGuitarsFilteredByCheckbox,
  setGuitarStrings,
  setFilteredPrice, setGuitars, setIsLoading, setIsLoaded
} from '../action';


export type CheckboxStoreType = {
    [key: string]: {
      name: string,
      isChecked: boolean,
      isDisabled: boolean,
  },
};

export enum PriceName {
  priceMin = 'priceMin',
  priceMax = 'priceMax',
}

export type PriceStoreType = {
  [key:string] : string,
}

export type GuitarStringsType = number[]

export type AppFilterType = {
  guitars: GuitarType[],
  isLoading: boolean,
  price: {
    currentPrice: PriceStoreType,
    filteredPrice:PriceStoreType,
  },
  guitarsFilteredByCheckbox: GuitarType[],
  checkboxStore: CheckboxStoreType,
  isStringChecked: boolean,
  isTypeChecked: boolean,
  guitarStrings: GuitarStringsType;
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
    currentPrice: {
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
  guitarStrings: [],
};

export const AppFilter = createReducer(initialStore, (builder)=>{
  builder

    .addCase(setGuitars, (state, action) => {
      const {guitars} = action.payload;
      state.guitars = guitars;
    })

    .addCase(setIsLoading, (state) => {state.isLoading = true;})

    .addCase(setIsLoaded, (state) => {state.isLoading = false;})

    .addCase(setCurrentPrice, (state, action) => {
      state.price.currentPrice = action.payload;
    })

    .addCase(setFilteredPrice, (state, action) => {
      state.price.filteredPrice = action.payload;
    })

    .addCase(setCheckboxStore, (state, action) => {
      const checkboxState = action.payload;
      const isGuitarTypeChecked = isCheckboxTypeChecked(CHECKBOX_GUITAR_TYPE, checkboxState);
      const isStringTypeChecked = isCheckboxTypeChecked(CHECKBOX_STRING_TYPE, checkboxState);
      let currentGuitars: GuitarType[] = isGuitarTypeChecked || isStringTypeChecked ? [] : state.guitars;
      const checkboxGuitarStrings = getCheckboxGuitarString(checkboxState, CHECKBOX_GUITAR_TYPE);
      const correctedCheckboxState = disableCheckbox(checkboxState, CHECKBOX_STRING_TYPE, checkboxGuitarStrings);

      if (isGuitarTypeChecked){
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
      state.guitarsFilteredByCheckbox = currentGuitars;
    })

    .addCase(setGuitarStrings, (state, action) => {
      state.guitarStrings = action.payload;
    })

    .addCase(setGuitarsFilteredByCheckbox, (state, action) => {
      state.guitarsFilteredByCheckbox = action.payload;
    });
});
