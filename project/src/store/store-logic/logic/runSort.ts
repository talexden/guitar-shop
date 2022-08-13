import {sort, sortByPages} from '../../../common/sort';
import {CARD_COUNT, SortDirect, SortKey} from '../../../common/const';
import {GuitarType} from '../../../types/stateType';

export const runSort = (filteredByPrice: GuitarType[], sortKey: SortKey, sortDirect: SortDirect, isFilter: boolean) => {
  const sortedGuitars = sort(filteredByPrice, sortKey, sortDirect, isFilter);
  const sortedByPages = sortByPages(sortedGuitars, CARD_COUNT);
  return {sortedGuitars, sortedByPages};
};
