import {checkboxStoreInit, CheckboxStoreType} from '../store/app-filter/app-filter';
import {FilterType} from '../store/action';
import {SortDirect, SortKey} from './const';


export const parseUrlParams = (searchUrl: string, checkboxStore: CheckboxStoreType): FilterType => {
  const urlSearchParams = new URLSearchParams(searchUrl);
  const params = Object.fromEntries(urlSearchParams.entries());
  if (params !== {}) {
    Object.keys(params).forEach((param)=>{
      const checkboxIsChecked = {...checkboxStore[param], isChecked: true};
      checkboxStore = {...checkboxStore, [param]: checkboxIsChecked};
    });
  } else {
    checkboxStore = {...checkboxStoreInit};
  }

  const urlPriceMin = params.priceMin ? params.priceMin : '';
  const urlPriceMax = params.priceMax ? params.priceMin : '';
  const userPrice = {
    priceMin: urlPriceMin,
    priceMax: urlPriceMax,
  };
  delete params.priceMin;
  delete params.priceMax;

  return {checkboxStore, userPrice, isFilter: true, sortKey: SortKey.Price, sortDirect: SortDirect.HighToLow, currentPage: 1};
};
