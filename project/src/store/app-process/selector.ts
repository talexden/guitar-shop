import {StateType} from '../../types/stateType';
import {NameSpace} from '../root-reducer';

export const getModal = (state: StateType): string => state[NameSpace.process].modal;
