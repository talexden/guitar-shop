import {NameSpace} from '../root-reducer';
import {
  StateType
} from '../../types/stateType';
import {PriceType} from '../../types/filter-types';


export const getFilteredPrice = (state: StateType): PriceType => state[NameSpace.filter].filteredPrice;
export const getCurrentPrice = (state: StateType): PriceType => state[NameSpace.filter].currentPrice;

