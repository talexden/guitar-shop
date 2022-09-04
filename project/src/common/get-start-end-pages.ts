import {GuitarType} from '../types/stateType';
import {CURRENT_PAGE_INIT, PAGINATION_COUNT} from './const';

export const getStartEndPage = (page: number, sortedByPages: GuitarType[][]) => {
  const paginationCenter = Math.round(PAGINATION_COUNT / 2);
  const guitarsByPagesSize = sortedByPages.length;
  let startPage = CURRENT_PAGE_INIT;
  let endPage = guitarsByPagesSize;
  const isLastPage = page === guitarsByPagesSize;
  if (guitarsByPagesSize > PAGINATION_COUNT) {
    startPage = isLastPage ? page - paginationCenter : page - (PAGINATION_COUNT - paginationCenter);
    endPage = isLastPage ? page: page + (PAGINATION_COUNT - paginationCenter);
  }
  return {startPage, endPage};
};
