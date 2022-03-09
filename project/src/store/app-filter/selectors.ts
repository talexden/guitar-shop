import {NameSpace} from '../root-reducer';
import {
  GuitarType,
  StateType
} from '../../types/stateType';
import {CheckboxStoreType, GuitarStringsType, PriceStoreType} from './app-filter';

export const getCurrentPrice = (state: StateType): PriceStoreType => state[NameSpace.filter].price.currentPrice;
export const getFilteredPrice = (state: StateType): PriceStoreType => state[NameSpace.filter].price.filteredPrice;
export const getCheckboxStore = (state: StateType): CheckboxStoreType => state[NameSpace.filter].checkboxStore;
export const getIsStringChecked = (state: StateType): boolean => state[NameSpace.filter].isStringChecked;
export const getIsTypeChecked = (state: StateType): boolean => state[NameSpace.filter].isTypeChecked;
export const getGuitarStrings = (state: StateType): GuitarStringsType => state[NameSpace.filter].guitarStrings;
export const getGuitarsFilteredByCheckbox = (state: StateType): GuitarType[] => state[NameSpace.filter].guitarsFilteredByCheckbox;

