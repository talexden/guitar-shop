import {AppFilterType, CheckboxStoreType} from '../app-filter/app-filter';
import {parseUrlParams} from '../../common/parse-url-params';
import {disableCheckbox} from '../../common/disable-checkbox';
import {CARD_COUNT, CHECKBOX_GUITAR_TYPE, CHECKBOX_STRING_TYPE} from '../../common/const';
import {getCheckboxStrings} from '../../common/get-checkbox-strings';
import {getGuitarsByCheckbox} from '../../common/get-guitars-by-checkbox';
import {getMinMaxPrice} from '../../common/get-min-max-price';
import {correctUserPrice} from '../../common/correct-user-price';
import {filterByPrice} from '../../common/filter-by-price';
import {sort, sortByPages} from '../../common/sort';
import {getStartEndPage} from '../../common/get-start-end-pages';
import {getIntegersArrayFromTo} from '../../common/utils';

export class Filter {
  static checkbox = ({checkboxStore, guitars}: AppFilterType, checkboxState = checkboxStore) => {
    const checkboxString = getCheckboxStrings(CHECKBOX_GUITAR_TYPE, checkboxState);
    checkboxStore = disableCheckbox(checkboxState, CHECKBOX_STRING_TYPE, checkboxString);
    const filteredByCheckbox = getGuitarsByCheckbox(guitars, checkboxStore);
    return {checkboxStore, filteredByCheckbox};
  };

  static price = ({filteredByCheckbox, price}: AppFilterType, priceState = price.userPrice) => {
    const checkboxPrice = getMinMaxPrice(filteredByCheckbox);
    const {userPrice, realUserPrice} =  correctUserPrice({...priceState}, checkboxPrice);
    const filteredByPrice = filterByPrice(filteredByCheckbox, realUserPrice);
    price = {userPrice, checkboxPrice};
    return {price, filteredByPrice};
  };

  static sort = ({filteredByPrice, isFilter, sortKey, sortDirect}: AppFilterType) => {
    const sortedGuitars = sort(filteredByPrice, isFilter, sortKey, sortDirect);
    const sortedByPages = sortByPages(sortedGuitars, CARD_COUNT);
    return {sortedGuitars, sortedByPages};
  };

  static pagination = (state: AppFilterType, currentPage = state.currentPage) => {
    const sortedByPages = state.sortedByPages;
    if (sortedByPages.length > 0 && sortedByPages.length < currentPage) {
      currentPage = sortedByPages.length;
    }
    const startEndPage = getStartEndPage(currentPage, sortedByPages);
    const paginationPages = getIntegersArrayFromTo(startEndPage.startPage, startEndPage.endPage);
    return {currentPage, paginationPages};
  };

  static parseUrl = (searchUrl: string, checkbox: CheckboxStoreType) => parseUrlParams (searchUrl, checkbox);

}
