import {NameSpace} from '../root-reducer';
import {GuitarType, StateType} from '../../types/stateType';

export const getGuitars = (state: StateType): GuitarType[] => state[NameSpace.data].guitars;
export const getIsLoading = (state: StateType): boolean => state[NameSpace.data].isLoading;
