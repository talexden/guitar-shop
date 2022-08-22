import {createReducer} from '@reduxjs/toolkit';
import {GuitarType} from '../../types/stateType';
import {setCartItem, setSelectedGuitar} from '../action';
import {CartLogic} from '../store-logic/cart-logic';
import {GUITAR_NULL} from '../../common/const';

export type CartItem = {
  guitar: GuitarType;
  count: number;
}

export type AppProcessType = {
  cartItems: CartItem[];
  selectedGuitar: GuitarType,
}

const initialState: AppProcessType = {
  cartItems: [],
  selectedGuitar: GUITAR_NULL,
};

export const AppCart = createReducer(initialState, (builder)=>{
  builder

    .addCase(setCartItem, (state) => {
      state.cartItems = CartLogic.addToCartItems(state.selectedGuitar, state.cartItems);
    })

    .addCase(setSelectedGuitar, (state, action) => {
      state.selectedGuitar = action.payload;
    });
});


