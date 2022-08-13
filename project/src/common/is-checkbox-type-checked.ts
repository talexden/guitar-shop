import {CheckboxType} from '../types/const-type';
import {CheckboxStoreType} from '../store/app-filter/app-filter';

export const isCheckboxTypeChecked = (checkboxType: CheckboxType[], checkboxStore: CheckboxStoreType): boolean => {
  let isChecked = false;
  checkboxType.forEach((type) => {
    if (checkboxStore[type.name].isChecked) {
      isChecked = true;
    }
  });
  return isChecked;
};
