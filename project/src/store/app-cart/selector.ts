import {GuitarType, StateType} from '../../types/stateType';
import {NameSpace} from '../root-reducer';

export const getSelectedGuitar = (state: StateType): GuitarType => state[NameSpace.Cart].selectedGuitar;
