import {NameSpace} from '../root-reducer';
import {
  GuitarType,
  StateType
} from '../../types/stateType';
import {CheckboxStoreType, PriceType} from './app-filter';
import {SortDirect, SortKey} from '../../common/const';

export const getCheckboxPrice = (state: StateType): PriceType => state[NameSpace.Filter].price.checkboxPrice;
export const getCheckboxStore = (state: StateType): CheckboxStoreType => state[NameSpace.Filter].checkboxStore;
export const getCommentCount = (state: StateType): number => state[NameSpace.Filter].commentCount;
export const getCurrentGuitar = (state: StateType): GuitarType | null => state[NameSpace.Filter].currentGuitar;
export const getCurrentNavigationLabel = (state: StateType): string => state[NameSpace.Filter].currentNavigationLabel;
export const getCurrentPage = (state: StateType): number => state[NameSpace.Filter].currentPage;
export const getIsFilter = (state: StateType): boolean => state[NameSpace.Filter].isFilter;
export const getIsLoading = (state: StateType): boolean => state[NameSpace.Filter].isLoading;
export const getPaginationPages = (state: StateType): number[] => state[NameSpace.Filter].paginationPages;
export const getUserPrice = (state: StateType): PriceType => state[NameSpace.Filter].price.userPrice;
export const getSearchedGuitars = (state: StateType): GuitarType[] => state[NameSpace.Filter].searchedGuitars;
export const getSearchKey = (state: StateType): string => state[NameSpace.Filter].searchKey;
export const getSortedByPages = (state: StateType): GuitarType[][] => state[NameSpace.Filter].sortedByPages;
export const getSortDirect = (state: StateType): SortDirect => state[NameSpace.Filter].sortDirect;
export const getSortKey = (state: StateType): SortKey => state[NameSpace.Filter].sortKey;
export const getUrlSearch= (state: StateType): string => state[NameSpace.Filter].urlSearch;
