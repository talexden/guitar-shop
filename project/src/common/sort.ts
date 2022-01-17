import {GuitarType} from '../types/stateType';
import {SortDirect, SortKey} from './const';

export const sort = (guitars: GuitarType[], sortKey: SortKey, sortDirect: SortDirect): GuitarType[] => {
  const sortedGuitars = [...guitars].sort((a, b) => ((a[sortKey] > b[sortKey] ? 1 : -1) * sortDirect));
  return sortedGuitars;
};


export const sortGuitarsByPages = (guitars: GuitarType[], cardCount: number): GuitarType[][]  => {
  const guitarsByPages: GuitarType[][] = [];
  for (let j = 0; j < guitars.length; j += cardCount) {
    guitarsByPages.push(guitars.slice(j, j + cardCount));
  }
  return guitarsByPages;
};
