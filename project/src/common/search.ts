import {GuitarType} from '../types/stateType';

export const search = (guitars: GuitarType[], searchKey: string): GuitarType[] => {
  let searchedGuitars: GuitarType[] = [];
  if (searchKey) {
    searchedGuitars = guitars.filter((guitar) => guitar.name.toLowerCase().includes(searchKey.toLowerCase()));
  }
  return searchedGuitars;
};

