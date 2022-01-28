import {createReducer} from '@reduxjs/toolkit';
import {GuitarType} from '../../types/stateType';
import {setGuitars, setIsLoading, setIsLoaded} from '../action';

export type AppDataType = {
  guitars: GuitarType[],
  isLoading: boolean,
}

const initialState: AppDataType = {
  guitars: [],
  isLoading: false,
};

export const AppData = createReducer(initialState, (builder)=>{
  builder
    .addCase(setGuitars, (state, action) => {
      const {guitars} = action.payload;
      state.guitars = guitars;
    })
    .addCase(setIsLoading, (state) => {state.isLoading = true;})
    .addCase(setIsLoaded, (state) => {state.isLoading = false;});
});
