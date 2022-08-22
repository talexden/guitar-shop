import {createReducer} from '@reduxjs/toolkit';
import {CheckboxType} from '../../types/const-type';
import {
  CHECKBOX_GUITAR_TYPE,
  CHECKBOX_STRING_TYPE,
  SortDirect,
  SortKey
} from '../../common/const';
import {CommentPostType, CouponPostType, GuitarType, OrderPostType} from '../../types/stateType';

import {
  setCheckboxStore,
  setUserPrice,
  setGuitars,
  setIsLoading,
  setIsLoaded,
  setPaginationPages,
  setCurrentGuitar,
  setCurrentPage,
  setSearchedGuitars,
  setSortKey,
  setSortDirect,
  setCurrentNavigationLabel,
  setSearchKey,
  setSearchUrl,
  setCommentCount, resetFilters, redirectToRoute
} from '../action';
import {sortCommentsByDate} from '../../common/sort';
import {CatalogLogic} from '../store-logic/catalog-logic';
import {search} from '../../common/search';


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

const priceInit = {
  userPrice: {
    priceMin: '',
    priceMax: '',
  },
  checkboxPrice: {
    priceMin: '',
    priceMax: '',
  },
};

const initialStore: AppFilterType = {
  guitars: [],
  isLoading: false,
  price: priceInit,
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
  commentCount: 0,
  currentPage: 1,
  redirectUrl: '',
  paginationPages: [],
  currentNavigationLabel: '',
  searchKey: '',
  urlSearch: '',
};

export const AppFilter = createReducer(initialStore, (builder)=>{
  builder

    .addCase(redirectToRoute, (state) => {
      state.currentGuitar = null;
    })

    .addCase(setGuitars, (state, action) => {
      state.guitars = action.payload;
    })

    .addCase(resetFilters, (state) => {
      state.isFilter = false;
      state.price = priceInit;
      state.currentPage = 1;
    })

    .addCase(setCheckboxStore, (state, action) => {
      state.checkboxStore = action.payload;
      const resultCheckboxChain = CatalogLogic.checkboxChain(state);
      state.filteredByCheckbox = resultCheckboxChain.filteredByCheckbox;
      state.checkboxStore = resultCheckboxChain.checkboxStore;
      state.price = resultCheckboxChain.price;
      state.filteredByPrice = resultCheckboxChain.filteredByPrice;
      state.sortedGuitars = resultCheckboxChain.sortedGuitars;
      state.sortedByPages = resultCheckboxChain.sortedByPages;
      state.currentPage = resultCheckboxChain.page;
      state.paginationPages = resultCheckboxChain.paginationPages;
    })

    .addCase(setUserPrice, (state, action) => {
      state.price.userPrice = action.payload;
      const resultPriceChain = CatalogLogic.priceChain(state);
      state.price = resultPriceChain.price;
      state.filteredByPrice = resultPriceChain.filteredByPrice;
      state.sortedGuitars = resultPriceChain.sortedGuitars;
      state.sortedByPages = resultPriceChain.sortedByPages;
      state.currentPage = resultPriceChain.page;
      state.paginationPages = resultPriceChain.paginationPages;
    })

    .addCase(setSortKey, (state, action) => {
      state.sortKey = action.payload;
      state.isFilter = true;
      const resultSortChain = CatalogLogic.sortChain(state);
      state.sortedGuitars = resultSortChain.sortedGuitars;
      state.sortedByPages = resultSortChain.sortedByPages;
      state.currentPage = resultSortChain.page;
      state.paginationPages = resultSortChain.paginationPages;
    })

    .addCase(setSortDirect, (state, action) => {
      state.sortDirect = action.payload;
      state.isFilter = true;
      const resultRunSort = CatalogLogic.sortChain(state);
      state.sortedGuitars = resultRunSort.sortedGuitars;
      state.sortedByPages = resultRunSort.sortedByPages;
      state.currentPage = resultRunSort.page;
      state.paginationPages = resultRunSort.paginationPages;
    })

    .addCase(setIsLoading, (state) => {state.isLoading = true;})

    .addCase(setIsLoaded, (state) => {state.isLoading = false;})

    .addCase(setPaginationPages, (state, action) => {
      state.paginationPages = action.payload;
    })

    .addCase(setCurrentGuitar, (state, action) => {
      const currentGuitar = action.payload;
      const comments = sortCommentsByDate(currentGuitar.comments);
      state.currentGuitar = {...currentGuitar, comments};
    })

    .addCase(setCommentCount, (state, action) => {
      state.commentCount = action.payload;
    })

    .addCase(setCurrentPage, (state, action) => {
      state.currentPage = action.payload;
      const resultPagesChain = CatalogLogic.pagesChain(state);
      state.currentPage = resultPagesChain.page;
      state.paginationPages = resultPagesChain.paginationPages;
    })


    .addCase(setSearchedGuitars, (state, action) => {
      state.searchedGuitars = action.payload;
    })

    .addCase(setCurrentNavigationLabel, (state, action) => {
      state.currentNavigationLabel = action.payload;
    })

    .addCase(setSearchKey, (state, action) => {
      const searchKey = action.payload;
      state.searchKey = searchKey;
      state.searchedGuitars = searchKey ? search(state.guitars, searchKey) : [];
    })

    .addCase(setSearchUrl, (state) => {
      state.urlSearch = '';
    });
});
