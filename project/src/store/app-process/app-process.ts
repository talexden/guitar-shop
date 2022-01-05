import {createReducer} from '@reduxjs/toolkit';
import {SortDirect, SortKey} from '../../common/const';
import {OrderPostType, CommentPostType, CouponPostType, GuitarType} from '../../types/stateType';
import {setSortedGuitars, setSortKey, setSortDirect, setSearchedGuitars} from '../action';

export type AppProcessType = {
  sortedGuitars: GuitarType[],
  searchedGuitars: GuitarType[],
  commentPost: CommentPostType | null,
  couponPost: CouponPostType,
  orderPost: OrderPostType | null,
  sortKey: SortKey,
  sortDirect: SortDirect,
  isFilter: boolean,
}

const initialState: AppProcessType = {
  sortedGuitars: [],
  searchedGuitars: [],
  commentPost: null,
  couponPost: '',
  orderPost: null,
  sortKey: SortKey.Price,
  sortDirect: SortDirect.LowToHigh,
  isFilter: false,
};

export const appProcess = createReducer(initialState, (builder)=>{
  builder

    .addCase(setSortedGuitars, (state, action) => {
      const {guitars} = action.payload;
      state.sortedGuitars = guitars;
    })

    .addCase(setSearchedGuitars, (state, action) => {
      const {guitars} = action.payload;
      state.searchedGuitars = guitars;
    })

    .addCase(setSortKey, (state, action) => {
      state.sortKey = action.payload;
      state.isFilter = true;
    })

    .addCase(setSortDirect, (state, action) => {
      state.sortDirect = action.payload;
      state.isFilter = true;
    });
});


