import {GuitarType} from '../types/stateType';

export const search = (guitars: GuitarType[], searchKey: string): GuitarType[] => (
  guitars.filter((guitar) => guitar.name
    .toLowerCase()
    .includes(searchKey.toLowerCase()))
);
