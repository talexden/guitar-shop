import {GuitarType} from '../types/stateType';

export const search = (guitars: GuitarType[], searchKey: string): GuitarType[] => {
  const searchGuitars = guitars.filter((guitar) => (
    guitar.name
      .toLowerCase()
      .includes(searchKey.toLowerCase())
  ));
  return searchGuitars;
};


