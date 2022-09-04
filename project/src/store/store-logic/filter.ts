import {AppFilterType, CheckboxStoreType} from '../app-filter/app-filter';
import {parseUrlParams} from '../../common/parse-url-params';
import {disableCheckbox} from '../../common/disable-checkbox';
import {CARD_COUNT, CHECKBOX_GUITAR_TYPE, CHECKBOX_STRING_TYPE} from '../../common/const';
import {getCheckboxStrings} from '../../common/get-checkbox-strings';
import {getGuitarsByCheckbox} from '../../common/get-guitars-by-checkbox';
import {getMinMaxPrice} from '../../common/get-min-max-price';
import {getUserPrice} from '../../common/get-user-price';
import {filterByPrice} from '../../common/filter-by-price';
import {sort, sortByPages} from '../../common/sort';
import {getStartEndPage} from '../../common/get-start-end-pages';
import {getIntegersArrayFromTo} from '../../common/utils';

export class Filter {
  static checkbox = (state: AppFilterType) => {
    const checkboxString = getCheckboxStrings(CHECKBOX_GUITAR_TYPE, state.checkboxStore);
    const checkboxStore = disableCheckbox(state.checkboxStore, CHECKBOX_STRING_TYPE, checkboxString);
    const filteredByCheckbox = getGuitarsByCheckbox(state.guitars, checkboxStore);
    return {checkboxStore, filteredByCheckbox};
  };

  static price = (state: AppFilterType) => {
    const checkboxPrice = getMinMaxPrice(state.filteredByCheckbox);
    const {userPrice, realUserPrice} =  getUserPrice({...state.price.userPrice}, checkboxPrice);
    const filteredByPrice = filterByPrice(state.filteredByCheckbox, realUserPrice);
    const price = {userPrice, checkboxPrice};
    return {price, filteredByPrice};
  };

  static sort = (state: AppFilterType) => {
    const sortedGuitars = sort(state.filteredByPrice, state.sortKey, state.sortDirect, state.isFilter);
    const sortedByPages = sortByPages(sortedGuitars, CARD_COUNT);
    return {sortedGuitars, sortedByPages};
  };

  static pagination = (state: AppFilterType) => {
    const sortedByPages = state.sortedByPages;
    let page = state.currentPage;
    if (sortedByPages.length > 0 && sortedByPages.length < page) {
      page = sortedByPages.length;
    }
    const startEndPage = getStartEndPage(page, sortedByPages);
    const paginationPages = getIntegersArrayFromTo(startEndPage.startPage, startEndPage.endPage);
    return {page, paginationPages};
  };

  static parseUrl = (searchUrl: string, checkbox: CheckboxStoreType) => parseUrlParams (searchUrl, checkbox);

}
