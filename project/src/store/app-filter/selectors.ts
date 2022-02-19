import {NameSpace} from '../root-reducer';
import {
  StateType
} from '../../types/stateType';
import {PriceStoreType} from './app-filter';


export const getFilteredPrice = (state: StateType): PriceStoreType => state[NameSpace.filter].price.filteredPrice;
export const getCurrentPrice = (state: StateType): PriceStoreType => state[NameSpace.filter].price.currentPrice;
export const getCheckboxes = (state: StateType) => state[NameSpace.filter].checkboxes;

