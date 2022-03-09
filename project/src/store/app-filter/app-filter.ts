import {createReducer} from '@reduxjs/toolkit';
import {
  setCheckboxStore,
  setCurrentPrice,
  setGuitarsFilteredByCheckbox,
  setGuitarStrings,
  setFilteredPrice
} from '../action';
import {CheckboxType} from '../../types/const-type';
import {CHECKBOX_GUITAR_TYPE, CHECKBOX_STRING_TYPE} from '../../common/const';
import {GuitarType} from '../../types/stateType';

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

    .addCase(setCurrentPrice, (state, action) => {
      state.price.currentPrice = action.payload;
    })

    .addCase(setFilteredPrice, (state, action) => {
      state.price.filteredPrice = action.payload;
    })

    .addCase(setCheckboxStore, (state, action) => {
      state.checkboxStore = action.payload;
    })

    .addCase(setGuitarStrings, (state, action) => {
      state.guitarStrings = action.payload;
    })

    .addCase(setGuitarsFilteredByCheckbox, (state, action) => {
      state.guitarsFilteredByCheckbox = action.payload;
    });
});
