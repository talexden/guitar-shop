import {GuitarType} from '../types/stateType';
import {SortDirect, SortKey} from './const';

export const sort = (guitars: GuitarType[], sortKey: SortKey, sortDirect: SortDirect): GuitarType[] => {
  const sortedGuitars = [...guitars].sort((a, b) => ((a[sortKey] > b[sortKey] ? 1 : -1) * sortDirect));
  return sortedGuitars;
};

