import {SortDirect, SortKey} from '../../common/const';
import {NameSpace} from '../root-reducer';
import {
  CommentPostType,
  CouponPostType,
  GuitarType,
  OrderPostType,
  StateType
} from '../../types/stateType';

export const getSortedGuitars = (state: StateType): GuitarType[] => state[NameSpace.process].sortedGuitars;
export const getFilteredGuitars = (state: StateType): GuitarType[] => state[NameSpace.process].filteredGuitars;
export const getSearchedGuitars = (state: StateType): GuitarType[] => state[NameSpace.process].searchedGuitars;
export const getCommentPost = (state: StateType): CommentPostType | null => state[NameSpace.process].commentPost;
export const getCouponPost = (state: StateType): CouponPostType => state[NameSpace.process].couponPost;
export const getOrderPost = (state: StateType): OrderPostType | null => state[NameSpace.process].orderPost;
export const getSortKey = (state: StateType): SortKey => state[NameSpace.process].sortKey;
export const getSortDirect = (state: StateType): SortDirect => state[NameSpace.process].sortDirect;
export const getIsFilter = (state: StateType): boolean => state[NameSpace.process].isFilter;
