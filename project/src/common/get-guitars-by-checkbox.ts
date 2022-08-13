import {GuitarType} from '../types/stateType';
import {CheckboxStoreType} from '../store/app-filter/app-filter';
import {CHECKBOX_GUITAR_TYPE, CHECKBOX_STRING_TYPE} from './const';
import {filterByString} from './filter-by-string';
import {isCheckboxTypeChecked} from './is-checkbox-type-checked';
import {getCheckboxStrings} from './get-checkbox-strings';

export const getGuitarsByCheckbox = (storeGuitars: GuitarType[], checkboxState: CheckboxStoreType) => {
  let guitars = [...storeGuitars];
  const isGuitarTypeChecked = isCheckboxTypeChecked(CHECKBOX_GUITAR_TYPE, checkboxState);
  const isStringTypeChecked = isCheckboxTypeChecked(CHECKBOX_STRING_TYPE, checkboxState);
  const checkboxGuitarStrings = getCheckboxStrings(CHECKBOX_STRING_TYPE, checkboxState);

  if (isGuitarTypeChecked) {
    guitars = [];
    CHECKBOX_GUITAR_TYPE.forEach((type) => {
      if (checkboxState[type.name].isChecked) {
        const checkedTypeGuitars = [...storeGuitars].filter((guitar) => checkboxState[type.name] && guitar.type === type.name);
        guitars = [...new Set([...guitars, ...checkedTypeGuitars])];
      }
    });
  }

  if (isStringTypeChecked) {
    guitars = filterByString(guitars, checkboxGuitarStrings);
  }
  return guitars;
};
