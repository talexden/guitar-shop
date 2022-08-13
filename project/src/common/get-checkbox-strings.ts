import {CheckboxType, StringsType} from '../types/const-type';
import {CheckboxStoreType} from '../store/app-filter/app-filter';

export const getCheckboxStrings = (checkboxType: CheckboxType[], checkboxStore: CheckboxStoreType): StringsType => {
  let checkboxStrings: StringsType = [];
  checkboxType.forEach((checkbox) => {
    if (checkboxStore[checkbox.name] && checkboxStore[checkbox.name].isChecked) {
      checkboxStrings = [...new Set([...checkboxStrings, ...checkbox.string])];
    }
  });
  return checkboxStrings;
};
