import {CheckboxStoreType} from '../../app-filter/app-filter';
import {disableCheckbox} from '../../../common/disable-checkbox';
import {CHECKBOX_GUITAR_TYPE, CHECKBOX_STRING_TYPE} from '../../../common/const';
import {getCheckboxStrings} from '../../../common/get-checkbox-strings';
import {getGuitarsByCheckbox} from '../../../common/get-guitars-by-checkbox';
import {GuitarType} from '../../../types/stateType';

export const runCheckbox = (checkboxState: CheckboxStoreType, guitars: GuitarType[]) => {
  const checkboxStore = disableCheckbox(checkboxState, CHECKBOX_STRING_TYPE, getCheckboxStrings(CHECKBOX_GUITAR_TYPE, checkboxState));
  const filteredByCheckbox = getGuitarsByCheckbox(guitars, checkboxStore);
  return {checkboxStore, filteredByCheckbox};
};
