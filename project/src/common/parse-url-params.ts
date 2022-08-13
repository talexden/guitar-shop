import {checkboxStoreInit, CheckboxStoreType, PriceType} from '../store/app-filter/app-filter';

type getUrlParamsType = {
  checkbox: CheckboxStoreType,
  price: PriceType
}

export const parseUrlParams = (searchUrl: string, checkbox: CheckboxStoreType): getUrlParamsType => {
  const urlSearchParams = new URLSearchParams(searchUrl);
  const params = Object.fromEntries(urlSearchParams.entries());
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

  return {checkbox, price};
};
