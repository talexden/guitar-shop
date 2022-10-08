import {CartItemType} from '../app-cart/app-cart';
import {DEFAULT_CART_COUNT} from '../../common/const';
import {GuitarType} from '../../types/stateType';

export class CartLogic {
  static addToCartItems = (guitar: GuitarType | null, cartItems: CartItemType[]): CartItemType[] => {
    if (guitar) {
      const cartItemsIdx = cartItems.findIndex((item) => item.guitar.id === guitar.id);
      if (cartItemsIdx !== -1) {
        cartItems[cartItemsIdx].quantity++;
      } else {
        const item: CartItemType = {
          guitar,
          quantity: DEFAULT_CART_COUNT,
        };
        cartItems.push(item);
      }
    }
    return cartItems;
  };
}
