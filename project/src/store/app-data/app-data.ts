import {createReducer} from '@reduxjs/toolkit';
import {AppData} from '../../types/state';
import {setGuitars} from '../action';

const initialState: AppData = {
  guitars: [],
  guitarsById: null,
  comments: [],
};

export const appData = createReducer(initialState, (builder)=>{
  builder
    .addCase(setGuitars, (state, action) => {
      state.guitars = action.payload;
    });
});
