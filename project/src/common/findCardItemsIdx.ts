import {CartItemType} from '../store/app-cart/app-cart';

export const findCardItemsIdx = (guitarId: number, cartItems: CartItemType[]): number => (
  cartItems.findIndex( (item) => (item.guitar.id === guitarId))
);
