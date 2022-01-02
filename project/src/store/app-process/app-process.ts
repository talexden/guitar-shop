import {createReducer} from '@reduxjs/toolkit';
import {AppProcess} from '../../types/state';
import {setSortedGuitars} from '../action';

const initialState: AppProcess = {
  sortedGuitars: [],
  commentPost: null,
  couponPost: '',
  orderPost: null,
};

export const appProcess = createReducer(initialState, (builder)=>{
  builder
    .addCase(setSortedGuitars, (state, action) => {
      const {guitars} = action.payload;
      state.sortedGuitars = guitars;
    });
});


