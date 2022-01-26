import {createReducer} from '@reduxjs/toolkit';
import {CommentType, GuitarType} from '../../types/stateType';
import {setGuitars, setIsLoading, setIsLoaded} from '../action';

type AppDataType = {
  guitars: GuitarType[],
  comments: CommentType[],
  isLoading: boolean,
}

const initialState: AppDataType = {
  guitars: [],
  comments: [],
  isLoading: false,
};

export const appData = createReducer(initialState, (builder)=>{
  builder
    .addCase(setGuitars, (state, action) => {
      const {guitars} = action.payload;
      state.guitars = guitars;
    })
    .addCase(setIsLoading, (state) => {state.isLoading = true;})
    .addCase(setIsLoaded, (state) => {state.isLoading = false;});
});
