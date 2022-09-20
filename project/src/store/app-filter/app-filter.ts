import {createReducer} from '@reduxjs/toolkit';
import {CheckboxType} from '../../types/const-type';
import {
  AppRoute,
  CHECKBOX_GUITAR_TYPE,
  CHECKBOX_STRING_TYPE,
  COMMENT_COUNT_INIT,
  CURRENT_PAGE_INIT, NO_PARAMS,
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
import {parseUrlParams} from '../../common/parse-url-params';


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
      const {checkboxStore, userPrice, sortKey, sortDirect, currentPage, locationSearch, reset} = filter;
      const resetFilter = reset || false;
      let isFilterChain = false;


      if (locationSearch) {
        state.locationSearch = locationSearch;
        const parseResult = parseUrlParams(locationSearch);
        state.checkboxStore = parseResult.checkboxStore;
        state.price = {...state.price, userPrice: parseResult.userPrice};
        state.isFilter = parseResult.isFilter;
        state.sortKey = parseResult.sortKey;
        state.sortDirect = parseResult.sortDirect;
        state.currentPage = parseResult.currentPage;
        isFilterChain = true;
      }

      if (resetFilter) {
        state.checkboxStore = checkboxStoreInit;
        state.price = PRICE_STORE_INIT;
        state.isFilter = false;
        state.currentPage = CURRENT_PAGE_INIT;
        browserHistory.push(`${AppRoute.Catalog}${state.currentPage}`);
        isFilterChain = true;
      }

      if (checkboxStore || isFilterChain) {
        const resultCheckbox = Filter.checkbox(state, checkboxStore);
        state.checkboxStore = resultCheckbox.checkboxStore;
        state.filteredByCheckbox = resultCheckbox.filteredByCheckbox;
        isFilterChain = true;
      }

      if (userPrice || isFilterChain) {
        const resultPrice = Filter.price(state, userPrice);
        state.price = resultPrice.price;
        state.filteredByPrice = resultPrice.filteredByPrice;
        isFilterChain = true;
      }

      if (sortKey) {
        state.sortKey = sortKey;
        state.isFilter = true;
        isFilterChain = true;
      }
      if (sortDirect) {
        state.sortDirect = sortDirect;
        state.isFilter = true;
        isFilterChain = true;
      }

      if (isFilterChain) {
        const resultSort = Filter.sort(state);
        state.sortedGuitars = resultSort.sortedGuitars;
        state.sortedByPages = resultSort.sortedByPages;
      }

      const resultPagination = Filter.pagination(state, currentPage);
      state.currentPage = resultPagination.currentPage;
      state.paginationPages = resultPagination.paginationPages;
      state.urlSearch = createUrlSearch(state);
      if (locationSearch !== NO_PARAMS) {
        browserHistory.push(state.urlSearch);
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
