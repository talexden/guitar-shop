import {CheckboxStoreType} from '../store/app-filter/app-filter';
import {CheckboxType} from '../types/const-type';

export const disableCheckbox = (checkboxState: CheckboxStoreType, checkboxType: CheckboxType[], guitarStrings: number[]): CheckboxStoreType => {
  let state = {...checkboxState};
  checkboxType.forEach((type) => {
    const checkboxName = type.name;
    const checkboxString = type.string[0];
    const isDisableFlag = guitarStrings.length > 0 ? !guitarStrings.includes(checkboxString) : false;
    const isCheckedFlag = isDisableFlag ? false : state[checkboxName].isChecked;

    const currentCheckbox = {
      name: checkboxName,
      isDisabled: isDisableFlag,
      isChecked: isCheckedFlag,
    };

    state = {...state, [checkboxName]: currentCheckbox};
  });

  return state;
};
