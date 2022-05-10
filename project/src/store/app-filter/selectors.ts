import {NameSpace} from '../root-reducer';
import {
  GuitarType,
  StateType
} from '../../types/stateType';
import {CheckboxStoreType, PriceStoreType} from './app-filter';

export const getUserPrice = (state: StateType): PriceStoreType => state[NameSpace.filter].price.userPrice;
export const getFilteredPrice = (state: StateType): PriceStoreType => state[NameSpace.filter].price.filteredPrice;
export const getCheckboxStore = (state: StateType): CheckboxStoreType => state[NameSpace.filter].checkboxStore;
export const getGuitarsFilteredByCheckbox = (state: StateType): GuitarType[] => state[NameSpace.filter].guitarsFilteredByCheckbox;
export const getGuitars = (state: StateType): GuitarType[] => state[NameSpace.filter].guitars;
export const getIsLoading = (state: StateType): boolean => state[NameSpace.filter].isLoading;
