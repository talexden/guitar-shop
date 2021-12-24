import {NameSpace} from '../root-reducer';
import {Comment, Guitar, State} from '../../types/state';

export const getGuitars = (state: State): Guitar[] => state[NameSpace.data].guitars;
export const getGuitarsById = (state: State): Guitar | null => state[NameSpace.data].guitarsById;
export const getComments = (state: State): Comment[] => state[NameSpace.data].comments;
