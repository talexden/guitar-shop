import {checkboxStoreInit} from '../store/app-filter/app-filter';
import {CURRENT_PAGE_INIT, SortDirect, SortKey} from './const';
import {FilterType} from '../store/action';


export const parseUrlParams = (searchUrl: string): Required<FilterType> => {
  const urlSearchParams = new URLSearchParams(searchUrl);
  const params = Object.fromEntries(urlSearchParams.entries());
  let checkboxStore = checkboxStoreInit;
  if (params !== {}) {
    Object.keys(params).forEach((param)=>{
      const checkboxIsChecked = {...checkboxStore[param], isChecked: true};
      checkboxStore = {...checkboxStore, [param]: checkboxIsChecked};
    });
  }

  const urlPriceMin = params.priceMin ? params.priceMin : '';
  const urlPriceMax = params.priceMax ? params.priceMin : '';
  const isFilter = Boolean(params.isFilter);
  const sortKey = params.sortKey === 'rating' ? SortKey.Rating : SortKey.Price;
  const sortDirect = params.sortDirect === '-1' ? SortDirect.LowToHigh : SortDirect.HighToLow;
  const currentPage = params.currentPage ? Number(params.currentPage) : CURRENT_PAGE_INIT;

  const userPrice = {
    priceMin: urlPriceMin,
    priceMax: urlPriceMax,
  };

  // необходимо типизировать без "заглушки"
  return {checkboxStore, userPrice, isFilter, sortKey, sortDirect, currentPage, locationSearch: '', reset: false};
};
