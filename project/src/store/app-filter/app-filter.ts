import {createReducer} from '@reduxjs/toolkit';
import {CheckboxType} from '../../types/const-type';
import {
  CHECKBOX_GUITAR_TYPE,
  CHECKBOX_STRING_TYPE,
  COMMENT_COUNT_INIT,
  CURRENT_PAGE_INIT,
  SortDirect,
  SortKey
} from '../../common/const';
import {CommentPostType, CouponPostType, GuitarType, OrderPostType} from '../../types/stateType';

import {
  setGuitars,
  setIsLoading,
  setIsLoaded,
  setCurrentGuitar,
  setSearchedGuitars,
  setCurrentNavigationLabel,
  setCommentCount, redirectToRoute, setFilter
} from '../action';
import {sortCommentsByDate} from '../../common/sort';
import {Filter} from '../store-logic/filter';
import {createUrlSearch} from '../../common/create-url-search';
import browserHistory from '../../browser-history';


export type CheckboxStoreType = {
  [key: string]: {
    name: string,
    isChecked: boolean,
    isDisabled: boolean,
  },
};

export type PriceType = {
  [key:string] : string,
}

export type PriceStoreType = {
  userPrice: PriceType,
  checkboxPrice:PriceType,
}

export type AppFilterType = {
  guitars: GuitarType[],
  isLoading: boolean,
  price: PriceStoreType
  filteredByCheckbox: GuitarType[],
  checkboxStore: CheckboxStoreType,
  isStringChecked: boolean,
  isTypeChecked: boolean,
  filteredByPrice: GuitarType[];
  sortedGuitars: GuitarType[],
  searchedGuitars: GuitarType[],
  commentPost: CommentPostType | null,
  couponPost: CouponPostType,
  orderPost: OrderPostType | null,
  sortKey: SortKey,
  sortDirect: SortDirect,
  isFilter: boolean,
  sortedByPages: GuitarType[][],
  currentGuitar: GuitarType | null,
  commentCount: number;
  currentPage: number,
  redirectUrl: string,
  paginationPages: number[],
  currentNavigationLabel: string
  searchKey: string,
  urlSearch: string,
  locationSearch: string,
}

const getCheckboxesInit = (checkboxTypes: CheckboxType[]) => {
  let checkboxes = {};
  checkboxTypes.forEach((type) => {
    checkboxes = {
      ...checkboxes,
      [type.name]: {
        name: type.name,
        isChecked: false,
        isDisabled: false,
      },
    };
  });
  return checkboxes;
};

export const checkboxStoreInit: CheckboxStoreType = {
  ...getCheckboxesInit(CHECKBOX_GUITAR_TYPE),
  ...getCheckboxesInit(CHECKBOX_STRING_TYPE),
};

export const PRICE_INIT: PriceType = {
  priceMin: '',
  priceMax: '',
};

export const PRICE_STORE_INIT: PriceStoreType = {
  userPrice: PRICE_INIT,
  checkboxPrice: PRICE_INIT,
};

const initialStore: AppFilterType = {
  guitars: [],
  isLoading: false,
  price: PRICE_STORE_INIT,
  filteredByCheckbox: [],
  checkboxStore: checkboxStoreInit,
  isStringChecked: false,
  isTypeChecked: false,
  filteredByPrice: [],
  sortedGuitars: [],
  searchedGuitars: [],
  commentPost: null,
  couponPost: '',
  orderPost: null,
  sortKey: SortKey.Price,
  sortDirect: SortDirect.LowToHigh,
  isFilter: false,
  sortedByPages: [],
  currentGuitar: null,
  commentCount: COMMENT_COUNT_INIT,
  currentPage: CURRENT_PAGE_INIT,
  redirectUrl: '',
  paginationPages: [],
  currentNavigationLabel: '',
  searchKey: '',
  urlSearch: '',
  locationSearch: '',
};

export const AppFilter = createReducer(initialStore, (builder)=>{
  builder

    .addCase(redirectToRoute, (state) => {
      if (!state.currentGuitar) {
        state.currentGuitar = null;
      }
    })

    .addCase(setGuitars, (state, action) => {
      state.guitars = action.payload;
    })

    .addCase(setFilter, (state, action) => {
      const filter = action.payload;
      const {checkboxStore, userPrice, isFilter, sortKey, sortDirect, currentPage, locationSearch, reset} = filter;
      let resetFilter = reset;

      if (locationSearch) {
        state.locationSearch = locationSearch;
        // state.checkboxStore = checkboxStoreInit;
        // state.price = PRICE_STORE_INIT;
        // state.isFilter = isFilter;
        // state.sortKey = sortKey;
        // state.sortDirect = sortDirect;
        // state.currentPage = CURRENT_PAGE_INIT;
      } else {
        state.locationSearch = '';
        resetFilter = true;
      }

      if (resetFilter) {
        state.checkboxStore = checkboxStoreInit;
        state.price = PRICE_STORE_INIT;
        state.isFilter = false;
        state.currentPage = CURRENT_PAGE_INIT;
      }

      if (checkboxStore) { state.checkboxStore = checkboxStore;}
      const resultCheckbox = Filter.checkbox(state);
      state.checkboxStore = resultCheckbox.checkboxStore;
      state.filteredByCheckbox = resultCheckbox.filteredByCheckbox;

      if (userPrice) { state.price = {...state.price, userPrice};}
      const resultPrice = Filter.price(state);
      state.price = resultPrice.price;
      state.filteredByPrice = resultPrice.filteredByPrice;

      if (isFilter) { state.isFilter = isFilter;}
      if (sortKey) { state.sortKey = sortKey;}
      if (sortDirect) { state.sortDirect = sortDirect;}
      const resultSort = Filter.sort(state);
      state.sortedGuitars = resultSort.sortedGuitars;
      state.sortedByPages = resultSort.sortedByPages;

      if (currentPage) { state.currentPage = currentPage;}
      const resultPagination = Filter.pagination(state);
      state.currentPage = resultPagination.page;
      state.paginationPages = resultPagination.paginationPages;
      state.urlSearch = createUrlSearch(state);
      if ( locationSearch && state.locationSearch !== state.urlSearch) {
        // eslint-disable-next-line no-console
        console.log('wrong parsing');
        // eslint-disable-next-line no-console
        console.log(state.locationSearch);
        // eslint-disable-next-line no-console
        console.log(state.urlSearch);
      } else {
        if (state.urlSearch && !locationSearch) {
          browserHistory.push(state.urlSearch);
        }
      }
    })

    .addCase(setIsLoading, (state) => {state.isLoading = true;})
    .addCase(setIsLoaded, (state) => {state.isLoading = false;})

    .addCase(setCurrentGuitar, (state, action) => {
      const currentGuitar = action.payload;
      const comments = sortCommentsByDate(currentGuitar.comments);
      state.currentGuitar = {...currentGuitar, comments};
    })

    .addCase(setCommentCount, (state, action) => {
      state.commentCount = action.payload;
    })

    .addCase(setSearchedGuitars, (state, action) => {
      state.searchedGuitars = action.payload;
    })

    .addCase(setCurrentNavigationLabel, (state, action) => {
      state.currentNavigationLabel = action.payload;
    });
});
