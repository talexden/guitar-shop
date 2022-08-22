import {AppFilterType, CheckboxStoreType, PriceStoreType} from '../app-filter/app-filter';
import {parseUrlParams} from '../../common/parse-url-params';
import {createUrlParams} from '../../common/create-url-params';
import {runCheckbox} from './logic/runCheckbox';
import {runPrice} from './logic/runPrice';
import {runSort} from './logic/runSort';
import {runPages} from './logic/runPages';

export class CatalogLogic {
  static checkboxChain = (state: AppFilterType) => {
    const resultRunCheckbox = runCheckbox(state.checkboxStore, state.guitars);
    const resultRunPrice = runPrice(resultRunCheckbox.filteredByCheckbox, state.price);
    const resultRunSort = runSort(resultRunPrice.filteredByPrice, state.sortKey, state.sortDirect, state.isFilter);
    const resultRunPages = runPages(state.currentPage, resultRunSort.sortedByPages);
    return Object.assign({}, resultRunCheckbox, resultRunPrice, resultRunSort, resultRunPages);
  };

  static priceChain = (state: AppFilterType) => {
    const resultRunPrice = runPrice(state.filteredByCheckbox, state.price);
    const resultRunSort = runSort(resultRunPrice.filteredByPrice, state.sortKey, state.sortDirect, state.isFilter);
    const resultRunPages = runPages(state.currentPage, resultRunSort.sortedByPages);
    return Object.assign({}, resultRunPrice, resultRunSort, resultRunPages);
  };

  static sortChain = (state: AppFilterType) => {
    const resultRunSort = runSort(state.filteredByPrice, state.sortKey, state.sortDirect, state.isFilter);
    const resultRunPages = runPages(state.currentPage, resultRunSort.sortedByPages);
    return Object.assign({}, resultRunSort, resultRunPages);
  };

  static pagesChain = (state: AppFilterType) => {
    const resultRunPages =  runPages(state.currentPage, state.sortedByPages);
    return Object.assign({}, resultRunPages);
  };

  static parseUrl = (searchUrl: string, checkbox: CheckboxStoreType) => parseUrlParams (searchUrl, checkbox);

  static createUrl = (price: PriceStoreType, checkbox: CheckboxStoreType) => createUrlParams (price, checkbox);

}
