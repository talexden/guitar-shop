import {createReducer} from '@reduxjs/toolkit';
import {setCurrentPrice, setFilteredPrice} from '../action';
import {PriceType} from '../../types/filter-types';

export type AppFilterType = {
  [key:string]: PriceType,
}

const initialState: AppFilterType = {
  filteredPrice: {
    priceMin: '',
    priceMax: '',
  },
  currentPrice: {
    priceMin: '',
    priceMax: '',
  },
};

export const AppFilter = createReducer(initialState, (builder)=>{
  builder

    .addCase(setFilteredPrice, (state, action) => {
      state.filteredPrice = action.payload;
    })

    .addCase(setCurrentPrice, (state, action) => {
      state.currentPrice = action.payload;
    });
});
