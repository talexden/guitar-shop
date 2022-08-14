import {createReducer} from '@reduxjs/toolkit';
import {
  closeModal,
  openModal
} from '../action';
import {GuitarType} from '../../types/stateType';

type CartType = {
  item: GuitarType;
  count: number;
}

export type AppProcessType = {
  cart: CartType[],
}

const initialState: AppProcessType = {
  cart: [],
};

export const AppCart = createReducer(initialState, (builder)=>{
  builder

    .addCase(addToCart, (state) => {
      const cartItem
      state.cart.push(action);
    })

    .addCase(openModal, (state, action) => {
      state.modal = action.payload;
    });
});


