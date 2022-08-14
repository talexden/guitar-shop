import {StateType} from '../../types/stateType';
import {NameSpace} from '../root-reducer';

export const getCart = (state: StateType): string => state[NameSpace.Cart].cart;
