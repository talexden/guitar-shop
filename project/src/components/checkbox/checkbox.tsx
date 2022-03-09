import {CheckboxType} from '../../types/const-type';
import {useDispatch, useSelector} from 'react-redux';
import {getCheckboxStore, getGuitarStrings} from '../../store/app-filter/selectors';
import {setCheckboxStore} from '../../store/action';
import {CHECKBOX_STRING_TYPE} from '../../common/const';
import {useEffect} from 'react';

type CheckboxProps = {
  checkbox: CheckboxType,
}

type checkboxStringType = {
  [key:string]: number,
}

let checkboxString: checkboxStringType = {};

CHECKBOX_STRING_TYPE.forEach((checkbox)=> {
  checkboxString = {...checkboxString, [checkbox.name]: checkbox.string[0]};
});

function Checkbox ({checkbox}: CheckboxProps): JSX.Element {
  const {label, name} = checkbox;
  const dispatch = useDispatch();
  const checkboxStore = useSelector(getCheckboxStore);
  const guitarStrings = useSelector(getGuitarStrings);


  useEffect(()=>{
    const isStringCheckboxDisable = !guitarStrings.includes(checkboxString[name]);
    const isDisableFlag = checkboxString[name] && guitarStrings.length > 0 ?  isStringCheckboxDisable : false;
    const isCheckedFlag = isDisableFlag ? false : checkboxStore[name].isChecked;
    let currentCheckbox = {...checkboxStore[name], isDisabled: isDisableFlag};
    currentCheckbox = {...currentCheckbox, isChecked: isCheckedFlag};

    const changedCheckbox = {...checkboxStore, [name]: currentCheckbox};
    if (checkboxStore[name].isDisabled !== isDisableFlag){
      dispatch(setCheckboxStore(changedCheckbox));
    }
  }, [dispatch, checkboxStore, guitarStrings, name]);


  const handleOnChange = () => {
    const currentCheckbox = {...checkboxStore[name], isChecked: !checkboxStore[name].isChecked};
    const changedCheckbox = {...checkboxStore, [name]: currentCheckbox};
    dispatch(setCheckboxStore(changedCheckbox));
  };


  return (
    <div className="form-checkbox catalog-filter__block-item">
      <input
        className="visually-hidden"
        type="checkbox"
        id={name}
        name={name}
        checked={checkboxStore[name].isChecked}
        disabled={checkboxStore[name].isDisabled}
        onChange={handleOnChange}
        data-testid={`checkbox-${name}`}
      />
      <label htmlFor={name}>{label}</label>
    </div>
  );
}

export default Checkbox;
