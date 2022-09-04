import {GuitarType} from '../../../types/stateType';
import {getStartEndPage} from './get-start-end-pages';
import {getIntegersArrayFromTo} from '../../../common/utils';

export const createPagination = (page: number, sortedByPages: GuitarType[][]) => {

  if (sortedByPages.length > 0 && sortedByPages.length < page) {
    page = sortedByPages.length;
  }

  const startEndPage = getStartEndPage(page, sortedByPages);

  const paginationPages = getIntegersArrayFromTo(startEndPage.startPage, startEndPage.endPage);

  return {page, paginationPages};
};
