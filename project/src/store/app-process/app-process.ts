import {createReducer} from '@reduxjs/toolkit';
import {SortDirect, SortKey} from '../../common/const';
import {OrderPostType, CommentPostType, CouponPostType, GuitarType} from '../../types/stateType';
import {
  setSortedGuitars,
  setSortKey,
  setSortDirect,
  setSearchedGuitars,
  setFilteredGuitars,
  setGuitarsByPages,
  setPaginationPages,
  setCurrentPage,
  setCurrentGuitar,
  setCurrentNavigationLabel,
  setSearchKey, setRedirectUrl,
} from '../action';


export type AppProcessType = {
  sortedGuitars: GuitarType[],
  filteredGuitars: GuitarType[],
  searchedGuitars: GuitarType[],
  commentPost: CommentPostType | null,
  couponPost: CouponPostType,
  orderPost: OrderPostType | null,
  sortKey: SortKey,
  sortDirect: SortDirect,
  isFilter: boolean,
  guitarsByPages: GuitarType[][],
  currentGuitar: GuitarType | null,
  currentPage: number,
  redirectUrl: string,
  paginationPages: number[],
  currentNavigationLabel: string
  searchKey: string,
}

const initialState: AppProcessType = {
  sortedGuitars: [],
  filteredGuitars: [],
  searchedGuitars: [],
  commentPost: null,
  couponPost: '',
  orderPost: null,
  sortKey: SortKey.Price,
  sortDirect: SortDirect.LowToHigh,
  isFilter: false,
  guitarsByPages: [],
  currentGuitar: null,
  currentPage: 1,
  redirectUrl: '',
  paginationPages: [],
  currentNavigationLabel: '',
  searchKey: '',
};

export const AppProcess = createReducer(initialState, (builder)=>{
  builder

    .addCase(setFilteredGuitars, (state, action) => {
      state.filteredGuitars = action.payload;
    })

    .addCase(setSortedGuitars, (state, action) => {
      state.sortedGuitars = action.payload;
    })

    .addCase(setGuitarsByPages, (state, action) => {
      state.guitarsByPages = action.payload;
    })

    .addCase(setPaginationPages, (state, action) => {
      state.paginationPages = action.payload;
    })

    .addCase(setCurrentGuitar, (state, action) => {
      state.currentGuitar = action.payload;
    })

    .addCase(setCurrentPage, (state, action) => {
      state.currentPage = action.payload;
    })

    .addCase(setRedirectUrl, (state, action) => {
      state.redirectUrl = action.payload;
    })

    .addCase(setSearchedGuitars, (state, action) => {
      state.searchedGuitars = action.payload;
    })

    .addCase(setSortKey, (state, action) => {
      state.sortKey = action.payload;
      state.isFilter = true;
    })

    .addCase(setSortDirect, (state, action) => {
      state.sortDirect = action.payload;
      state.isFilter = true;
    })

    .addCase(setCurrentNavigationLabel, (state, action) => {
      state.currentNavigationLabel = action.payload;
    })

    .addCase(setSearchKey, (state, action) => {
      state.searchKey = action.payload;
    });
});


