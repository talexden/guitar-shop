import {createReducer} from '@reduxjs/toolkit';
import {
  closeModal,
  openModal
} from '../action';


export type AppProcessType = {
  modal: string,
}

const initialState: AppProcessType = {
  modal: '',
};

export const AppProcess = createReducer(initialState, (builder)=>{
  builder

    .addCase(closeModal, (state) => {
      state.modal = '';
    })

    .addCase(openModal, (state, action) => {
      state.modal = action.payload;
    });
});


