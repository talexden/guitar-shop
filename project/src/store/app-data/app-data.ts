import {createReducer} from '@reduxjs/toolkit';
import {CommentType, GuitarType} from '../../types/stateType';
import {setGuitars, setIsLoading, setIsLoaded, setGuitarById} from '../action';

type AppDataType = {
  guitars: GuitarType[],
  guitarById: GuitarType | null,
  comments: CommentType[],
  isLoading: boolean,
}

const initialState: AppDataType = {
  guitars: [],
  guitarById: null,
  comments: [],
  isLoading: false,
};

export const appData = createReducer(initialState, (builder)=>{
  builder
    .addCase(setGuitars, (state, action) => {
      const {guitars} = action.payload;
      state.guitars = guitars;
    })
    .addCase(setGuitarById, (state, action) => {
      const {guitar} = action.payload;
      state.guitarById = guitar;
    })
    .addCase(setIsLoading, (state, action) => {
      state.isLoading = true;
    })
    .addCase(setIsLoaded, (state, action) => {
      state.isLoading = false;
    });
});
