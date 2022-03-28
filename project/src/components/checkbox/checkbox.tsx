import {CheckboxType} from '../../types/const-type';
import {useDispatch, useSelector} from 'react-redux';
import {getCheckboxStore} from '../../store/app-filter/selectors';
import {setCheckboxStore} from '../../store/action';

type CheckboxProps = {
  checkbox: CheckboxType,
}


function Checkbox ({checkbox}: CheckboxProps): JSX.Element {
  const {label, name} = checkbox;
  const checkboxStore = useSelector(getCheckboxStore);
  const dispatch = useDispatch();

  const handleOnChange = () => {
    if (!checkboxStore[name].isDisabled) {
      const currentCheckbox = {...checkboxStore[name], isChecked: !checkboxStore[name].isChecked};
      const state = {...checkboxStore, [name]: currentCheckbox};
      dispatch(setCheckboxStore(state));
    }
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
