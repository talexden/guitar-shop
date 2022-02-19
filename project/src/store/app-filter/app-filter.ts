import {createReducer} from '@reduxjs/toolkit';
import {setCheckbox, setCurrentPrice, setFilteredPrice} from '../action';
import {CheckboxType} from '../../types/const-type';
import {CHECKBOX_GUITAR_TYPE, CHECKBOX_STRING_TYPE} from '../../common/const';

export type CheckboxStoreType = {
  [key: string]: {
    name: string,
    isChecked: boolean,
    isDisabled: boolean,
  }
};

export type PriceStoreType = {
  [key: string]: string,
}

export type AppFilterType = {
  price: {
    [key: string]: PriceStoreType
  },
  checkboxes: {
    [key: string]: CheckboxStoreType,
  };
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
  })
  return checkboxes;
};

export const checkboxes = {
  ...getCheckboxesInit(CHECKBOX_GUITAR_TYPE),
  ...getCheckboxesInit(CHECKBOX_STRING_TYPE),
}

const initialState: AppFilterType = {
  price: {
    filteredPrice: {
      priceMin: '',
      priceMax: '',
    },
    currentPrice: {
      priceMin: '',
      priceMax: '',
    },
  },

  checkboxes: checkboxes,
};

export const AppFilter = createReducer(initialState, (builder)=>{
  builder

    .addCase(setFilteredPrice, (state, action) => {
      state.price.filteredPrice = action.payload;
    })

    .addCase(setCurrentPrice, (state, action) => {
      state.price.currentPrice = action.payload;
    })

    .addCase(setCheckbox, (state, action) => {
      state.checkboxes = action.payload;
    });
});
