import {CommentType, GuitarType} from '../types/stateType';
import {SortDirect, SortKey} from './const';

export const sort = (guitars: GuitarType[], isFilter: boolean, sortKey: SortKey, sortDirect: SortDirect): GuitarType[] => {
  let sortedGuitars = [...guitars];
  if (isFilter) {
    sortedGuitars.sort((a, b) => (a[sortKey] > b[sortKey] ? 1 : -1) * sortDirect);
  }
  return sortedGuitars;
};


export const sortByPages = (guitars: GuitarType[], cardCount: number): GuitarType[][]  => {
  const guitarsByPages: GuitarType[][] = [];
  for (let j = 0; j < guitars.length; j += cardCount) {
    guitarsByPages.push(guitars.slice(j, j + cardCount));
  }
  return guitarsByPages;
};

export const sortCommentsByDate = (comments: CommentType[]) => (
  [...comments].sort((a, b) => (a.createAt < b.createAt ? 1 : -1))
);
