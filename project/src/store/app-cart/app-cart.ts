import {createReducer} from '@reduxjs/toolkit';
import {GuitarType} from '../../types/stateType';
import {addCartItem, removeCardItem, setCartItemQuantity, setGuitarForCart} from '../action';
import {CartLogic} from '../store-logic/cart-logic';
import {GUITAR_NULL, Quantity} from '../../common/const';
import {findCardItemsIdx} from '../../common/findCardItemsIdx';

export type CartItemType = {
  guitar: GuitarType;
  quantity: number;
}

export type AppProcessType = {
  cartItems: CartItemType[];
  guitarForCart: GuitarType,
}

const initialState: AppProcessType = {
  cartItems: [],
  guitarForCart: GUITAR_NULL,
};

export const AppCart = createReducer(initialState, (builder)=>{
  builder

    .addCase(addCartItem, (state) => {
      state.cartItems = CartLogic.addToCartItems(state.guitarForCart, state.cartItems);
    })

    .addCase(setCartItemQuantity, (state, action) => {
      const {quantityCount, quantityCmd, guitarId} = action.payload;
      const cartItemsIdx = findCardItemsIdx(guitarId, state.cartItems);

      if (cartItemsIdx >= 0) {
        let quantity = state.cartItems[cartItemsIdx].quantity;

        switch (quantityCmd) {
          case Quantity.Inc:
            quantity++;
            break;
          case Quantity.Dec:
            quantity--;
            break;
          case Quantity.Set:
            if (quantityCount !== undefined) {
              quantity = quantityCount;
            }
            break;
        }
        const currentCartItem = {...state.cartItems[cartItemsIdx], quantity};
        state.cartItems = [...state.cartItems.slice(0, cartItemsIdx), currentCartItem, ...state.cartItems.slice(cartItemsIdx + 1)];
      }
    })

    .addCase(setGuitarForCart, (state, action) => {
      state.guitarForCart = action.payload;
    })

    .addCase(removeCardItem, (state, action) => {
      const guitarId = action.payload;
      const cardItemsIdx = findCardItemsIdx(guitarId, state.cartItems);
      if (cardItemsIdx >= 0) {
        state.cartItems = [...state.cartItems.slice(0, cardItemsIdx), ...state.cartItems.slice(cardItemsIdx + 1)];
      }
    });
});


