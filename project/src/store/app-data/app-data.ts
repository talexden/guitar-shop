import {createReducer} from '@reduxjs/toolkit';
import {AppData} from '../../types/state';
import {setGuitars, setIsLoading, setIsLoaded} from '../action';

const initialState: AppData = {
  guitars: [],
  guitarsById: null,
  comments: [],
  isLoading: false,
};

export const appData = createReducer(initialState, (builder)=>{
  builder
    .addCase(setGuitars, (state, action) => {
      const {guitars} = action.payload;
      state.guitars = guitars;
    })
    .addCase(setIsLoading, (state, action) => {
      state.isLoading = true;
    })
    .addCase(setIsLoaded, (state, action) => {
      state.isLoading = false;
    });
});
