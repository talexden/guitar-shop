import {CartItem} from '../app-cart/app-cart';
import {DEFAULT_CART_COUNT} from '../../common/const';
import {GuitarType} from '../../types/stateType';

export class CartLogic {
  static addToCartItems = (guitar: GuitarType | null, cartItems: CartItem[]): CartItem[] => {
    if (guitar) {
      const cartItemsIdx = cartItems.findIndex((item) => item.guitar.id === guitar.id);

      if (cartItemsIdx) {
        cartItems[cartItemsIdx].count++;
      } else {
        const item = {
          guitar,
          count: DEFAULT_CART_COUNT,
        };
        cartItems.push(item);
      }
    }
    return cartItems;
  };
}
