import {AppFilterType, CheckboxStoreType} from '../app-filter/app-filter';
import {parseUrlParams} from './logic/parse-url-params';
import {runCheckbox} from './logic/runCheckbox';
import {runPrice} from './logic/runPrice';
import {runSort} from './logic/runSort';
import {createPagination} from './logic/createPagination';

export class Filter {
  static checkbox = (state: AppFilterType) => runCheckbox(state.checkboxStore, state.guitars);

  static price = (state: AppFilterType) => runPrice(state.filteredByCheckbox, state.price);

  static sort = (state: AppFilterType) => runSort(state.filteredByPrice, state.sortKey, state.sortDirect, state.isFilter);

  static pagination = (state: AppFilterType) => createPagination(state.currentPage, state.sortedByPages);

  static parseUrl = (searchUrl: string, checkbox: CheckboxStoreType) => parseUrlParams (searchUrl, checkbox);

}
