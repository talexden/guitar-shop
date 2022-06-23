import {CommentType, GuitarType} from '../types/stateType';
import {SortDirect, SortKey} from './const';

export const sort = (guitars: GuitarType[], sortKey: SortKey, sortDirect: SortDirect): GuitarType[] => (
  [...guitars].sort((a, b) => (a[sortKey] > b[sortKey] ? 1 : -1) * sortDirect )
);


export const sortGuitarsByPages = (guitars: GuitarType[], cardCount: number): GuitarType[][]  => {
  const guitarsByPages: GuitarType[][] = [];
  for (let j = 0; j < guitars.length; j += cardCount) {
    guitarsByPages.push(guitars.slice(j, j + cardCount));
  }
  return guitarsByPages;
};

export const sortCommentsByDate = (comments: CommentType[]) => (
  [...comments].sort((a, b) => (a.createAt > b.createAt ? 1 : -1))
);
