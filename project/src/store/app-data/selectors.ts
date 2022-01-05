import {NameSpace} from '../root-reducer';
import {CommentType, GuitarType, StateType} from '../../types/stateType';

export const getGuitars = (state: StateType): GuitarType[] => state[NameSpace.data].guitars;
export const getGuitarsById = (state: StateType): GuitarType | null => state[NameSpace.data].guitarById;
export const getComments = (state: StateType): CommentType[] => state[NameSpace.data].comments;
export const getIsLoading = (state: StateType): boolean => state[NameSpace.data].isLoading;
