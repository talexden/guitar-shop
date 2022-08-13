import {GuitarType} from '../types/stateType';
import {StringsType} from '../types/const-type';

export const filterByString = (guitars: GuitarType[], strings: StringsType) => {
  let filteredGuitars = [...guitars];
  if (strings.length > 0) {
    filteredGuitars = guitars.filter((guitar) => {
      let isGuitar = false;
      strings.forEach((string) => {
        if (guitar.stringCount === string) {
          isGuitar = true;
        }
      });
      return isGuitar;
    });
  }
  return filteredGuitars;
};
