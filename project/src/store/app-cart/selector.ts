import {GuitarType, StateType} from '../../types/stateType';
import {NameSpace} from '../root-reducer';
import {CartItemType} from './app-cart';

export const getGuitarForCart = (state: StateType): GuitarType => state[NameSpace.Cart].guitarForCart;
export const getCartItems = (state: StateType): CartItemType[] => state[NameSpace.Cart].cartItems;
