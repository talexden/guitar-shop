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
  setCurrentGuitar
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
  paginationPages: number[],
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
  paginationPages: [],
};

export const appProcess = createReducer(initialState, (builder)=>{
  builder

    .addCase(setFilteredGuitars, (state, action) => {
      const {guitars} = action.payload;
      state.filteredGuitars = guitars;
    })

    .addCase(setSortedGuitars, (state, action) => {
      const {guitars} = action.payload;
      state.sortedGuitars = guitars;
    })

    .addCase(setGuitarsByPages, (state, action) => {
      const {guitarsByPages} = action.payload;
      state.guitarsByPages = guitarsByPages;
    })

    .addCase(setPaginationPages, (state, action) => {
      const {paginationPages} = action.payload;
      state.paginationPages = paginationPages;
    })

    .addCase(setCurrentGuitar, (state, action) => {
      const {currentGuitar} = action.payload;
      state.currentGuitar = currentGuitar;
    })

    .addCase(setCurrentPage, (state, action) => {
      const {currentPage} = action.payload;
      state.currentPage = currentPage;
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


