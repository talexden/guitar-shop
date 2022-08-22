import {GuitarType, StateType} from '../../types/stateType';
import {NameSpace} from '../root-reducer';
import {CartItem} from './app-cart';

export const getCartItem = (state: StateType): CartItem[] => state[NameSpace.Cart].cartItems;
export const getSelectedGuitar = (state: StateType): GuitarType => state[NameSpace.Cart].selectedGuitar;
