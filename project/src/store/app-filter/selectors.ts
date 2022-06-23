import {NameSpace} from '../root-reducer';
import {
  CommentPostType, CouponPostType,
  GuitarType, OrderPostType,
  StateType
} from '../../types/stateType';
import {CheckboxStoreType, PriceStoreType} from './app-filter';
import {SortDirect, SortKey} from '../../common/const';

export const getUserPrice = (state: StateType): PriceStoreType => state[NameSpace.filter].price.userPrice;
export const getCheckboxPrice = (state: StateType): PriceStoreType => state[NameSpace.filter].price.checkboxPrice;
export const getCheckboxStore = (state: StateType): CheckboxStoreType => state[NameSpace.filter].checkboxStore;
export const getGuitarsFilteredByCheckbox = (state: StateType): GuitarType[] => state[NameSpace.filter].guitarsFilteredByCheckbox;
export const getGuitars = (state: StateType): GuitarType[] => state[NameSpace.filter].guitars;
export const getIsLoading = (state: StateType): boolean => state[NameSpace.filter].isLoading;
export const getFilteredGuitars = (state: StateType): GuitarType[] => state[NameSpace.filter].filteredGuitars;
export const getGuitarsByPages = (state: StateType): GuitarType[][] => state[NameSpace.filter].guitarsByPages;
export const getPaginationPages = (state: StateType): number[] => state[NameSpace.filter].paginationPages;
export const getSearchedGuitars = (state: StateType): GuitarType[] => state[NameSpace.filter].searchedGuitars;
export const getCommentPost = (state: StateType): CommentPostType | null => state[NameSpace.filter].commentPost;
export const getCouponPost = (state: StateType): CouponPostType => state[NameSpace.filter].couponPost;
export const getOrderPost = (state: StateType): OrderPostType | null => state[NameSpace.filter].orderPost;
export const getSortKey = (state: StateType): SortKey => state[NameSpace.filter].sortKey;
export const getSortDirect = (state: StateType): SortDirect => state[NameSpace.filter].sortDirect;
export const getIsFilter = (state: StateType): boolean => state[NameSpace.filter].isFilter;
export const getCurrentGuitar = (state: StateType): GuitarType | null => state[NameSpace.filter].currentGuitar;
export const getCommentCount = (state: StateType): number => state[NameSpace.filter].commentCount;
export const getCurrentPage = (state: StateType): number => state[NameSpace.filter].currentPage;
export const getRedirectUrl = (state: StateType): string => state[NameSpace.filter].redirectUrl;
export const getCurrentNavigationLabel = (state: StateType): string => state[NameSpace.filter].currentNavigationLabel;
export const getSearchKey = (state: StateType): string => state[NameSpace.filter].searchKey;
