import {createReducer} from '@reduxjs/toolkit';
import {CheckboxType} from '../../types/const-type';
import {CARD_COUNT, CHECKBOX_GUITAR_TYPE, CHECKBOX_STRING_TYPE, SortDirect, SortKey} from '../../common/const';
import {CommentPostType, CouponPostType, GuitarType, OrderPostType} from '../../types/stateType';

import {
  disableCheckbox,
  filterByString,
  getCheckboxString, getFilterByPrice, getMinMaxPrice,
  isCheckboxTypeChecked
} from '../../common/filter';

import {
  setCheckboxStore,
  setUserPrice,
  setGuitars,
  setIsLoading,
  setIsLoaded,
  setFilteredGuitars,
  setSortedGuitars,
  setPaginationPages,
  setCurrentGuitar,
  setCurrentPage,
  setRedirectUrl,
  setSearchedGuitars,
  setSortKey,
  setSortDirect,
  setCurrentNavigationLabel,
  setSearchKey,
  setSearchUrl
} from '../action';
import {sortGuitarsByPages} from '../../common/sort';


export type CheckboxStoreType = {
    [key: string]: {
      name: string,
      isChecked: boolean,
      isDisabled: boolean,
  },
};

export type PriceStoreType = {
  [key:string] : string,
}

export type GuitarStringsType = number[]

export type AppFilterType = {
  guitars: GuitarType[],
  isLoading: boolean,
  price: {
    userPrice: PriceStoreType,
    filteredPrice:PriceStoreType,
  },
  guitarsFilteredByCheckbox: GuitarType[],
  checkboxStore: CheckboxStoreType,
  isStringChecked: boolean,
  isTypeChecked: boolean,
  filteredGuitars: GuitarType[];
  sortedGuitars: GuitarType[],
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

const initialStore: AppFilterType = {
  guitars: [],
  isLoading: false,
  price: {
    userPrice: {
      priceMin: '',
      priceMax: '',
    },
    filteredPrice: {
      priceMin: '',
      priceMax: '',
    },
  },
  guitarsFilteredByCheckbox: [],
  checkboxStore: checkboxStoreInit,
  isStringChecked: false,
  isTypeChecked: false,
  filteredGuitars: [],
  sortedGuitars: [],
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

export const AppFilter = createReducer(initialStore, (builder)=>{
  builder

    .addCase(setGuitars, (state, action) => {
      const {guitars} = action.payload;
      state.price.filteredPrice = getMinMaxPrice(guitars);
      state.guitarsFilteredByCheckbox = guitars;
      state.guitars = guitars;
    })

    .addCase(setIsLoading, (state) => {state.isLoading = true;})

    .addCase(setIsLoaded, (state) => {state.isLoading = false;})

    .addCase(setUserPrice, (state, action) => {
      const price = action.payload;
      const filteredPrice = state.price.filteredPrice;
      const guitars = state.guitarsFilteredByCheckbox;

      if (price.priceMin === '') {
        price.priceMin = filteredPrice.priceMin;
      }
      if (price.priceMax === '') {
        price.priceMax = filteredPrice.priceMax;
      }

      if (Number(price.priceMin) > Number(price.priceMax)) {
        [price.priceMin, price.priceMax] = [price.priceMax, price.priceMin];
      }

      if (Number(price.priceMin) < Number(filteredPrice.priceMin)) {
        price.priceMin = filteredPrice.priceMin;
      }
      if (Number(price.priceMin) > Number(filteredPrice.priceMax)) {
        price.priceMin = filteredPrice.priceMax;
      }
      if (Number(price.priceMax) < Number(filteredPrice.priceMin)) {
        price.priceMax = filteredPrice.priceMin;
      }
      if (Number(price.priceMax) > Number(filteredPrice.priceMax)) {
        price.priceMax = filteredPrice.priceMax;
      }

      state.filteredGuitars = getFilterByPrice(guitars, Number(price.priceMin), Number(price.priceMax));

      if (price.priceMin === filteredPrice.priceMin) {
        price.priceMin = '';
      }
      if (price.priceMax === filteredPrice.priceMax) {
        price.priceMax = '';
      }

      state.price.userPrice = price;
    })

    .addCase(setCheckboxStore, (state, action) => {
      const checkboxState = action.payload;
      const isGuitarTypeChecked = isCheckboxTypeChecked(CHECKBOX_GUITAR_TYPE, checkboxState);
      const isStringTypeChecked = isCheckboxTypeChecked(CHECKBOX_STRING_TYPE, checkboxState);
      let currentGuitars: GuitarType[] = state.guitars;
      const checkboxGuitarTypeStrings = getCheckboxString(checkboxState, CHECKBOX_GUITAR_TYPE);
      const correctedCheckboxState = disableCheckbox(checkboxState, CHECKBOX_STRING_TYPE, checkboxGuitarTypeStrings);
      const checkboxGuitarStrings = getCheckboxString(correctedCheckboxState, CHECKBOX_STRING_TYPE);

      if (isGuitarTypeChecked){
        currentGuitars = [];
        CHECKBOX_GUITAR_TYPE.forEach((type) => {
          if (correctedCheckboxState[type.name].isChecked) {
            const checkedTypeGuitars = state.guitars.filter((guitar) => correctedCheckboxState[type.name] && guitar.type === type.name);
            currentGuitars = [...new Set([...currentGuitars, ...checkedTypeGuitars])];
          }
        });
      }

      if (isStringTypeChecked){
        currentGuitars = filterByString(currentGuitars, checkboxGuitarStrings);
      }

      state.checkboxStore = correctedCheckboxState;

      // if (!isGuitarTypeChecked && !isStringTypeChecked) {
      //   state.price.userPrice = {
      //     priceMin: '',
      //     priceMax: '',
      //   };
      // }

      const price = getMinMaxPrice(currentGuitars);
      const filteredPrice = state.price.filteredPrice;
      if (price.priceMin !== filteredPrice.priceMin || price.priceMax !== filteredPrice.priceMax) {
        state.price.filteredPrice = price;
      }
      state.guitarsFilteredByCheckbox = currentGuitars;
    })

    .addCase(setFilteredGuitars, (state, action) => {
      state.filteredGuitars = action.payload;
    })

    .addCase(setSortedGuitars, (state, action) => {
      const sortedGuitars = action.payload;
      const guitarsSortedByPages = sortGuitarsByPages(sortedGuitars, CARD_COUNT);
      state.sortedGuitars = sortedGuitars;
      state.guitarsByPages = guitarsSortedByPages;
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
    })

    .addCase(setSearchUrl, (state, action) => {
      const searchUrl = action.payload;

      const urlSearchParams = new URLSearchParams(searchUrl);
      const params = Object.fromEntries(urlSearchParams.entries());
      let checkbox = state.checkboxStore;
      if (params !== {}) {
        Object.keys(params).forEach((param)=>{
          const checkboxIsChecked = {...checkbox[param], isChecked: true};
          checkbox = {...checkbox, [param]: checkboxIsChecked};
        });
      } else {
        checkbox = {...checkboxStoreInit};
      }

      const urlPriceMin = params.priceMin ? params.priceMin : '';
      const urlPriceMax = params.priceMax ? params.priceMin : '';
      const price = {
        priceMin: urlPriceMin,
        priceMax: urlPriceMax,
      };
      delete params.priceMin;
      delete params.priceMax;

      state.checkboxStore = checkbox;
      state.price.userPrice = price;
    });
});
