import {NameSpace} from '../root-reducer';
import {
  GuitarType,
  StateType
} from '../../types/stateType';
import {CheckboxStoreType, PriceType} from './app-filter';
import {SortDirect, SortKey} from '../../common/const';

export const getUserPrice = (state: StateType): PriceType => state[NameSpace.filter].price.userPrice;
export const getCheckboxPrice = (state: StateType): PriceType => state[NameSpace.filter].price.checkboxPrice;
export const getCheckboxStore = (state: StateType): CheckboxStoreType => state[NameSpace.filter].checkboxStore;
export const getIsLoading = (state: StateType): boolean => state[NameSpace.filter].isLoading;
export const getSortedByPages = (state: StateType): GuitarType[][] => state[NameSpace.filter].sortedByPages;
export const getPaginationPages = (state: StateType): number[] => state[NameSpace.filter].paginationPages;
export const getSortKey = (state: StateType): SortKey => state[NameSpace.filter].sortKey;
export const getSortDirect = (state: StateType): SortDirect => state[NameSpace.filter].sortDirect;
export const getIsFilter = (state: StateType): boolean => state[NameSpace.filter].isFilter;
export const getCurrentGuitar = (state: StateType): GuitarType | null => state[NameSpace.filter].currentGuitar;
export const getCommentCount = (state: StateType): number => state[NameSpace.filter].commentCount;
export const getCurrentPage = (state: StateType): number => state[NameSpace.filter].currentPage;
export const getCurrentNavigationLabel = (state: StateType): string => state[NameSpace.filter].currentNavigationLabel;
export const getSearchKey = (state: StateType): string => state[NameSpace.filter].searchKey;
export const getSearchedGuitars = (state: StateType): GuitarType[] => state[NameSpace.filter].searchedGuitars;
