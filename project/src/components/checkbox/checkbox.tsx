import {CheckboxType} from '../../types/const-type';
import {useSelector} from 'react-redux';
import {getCheckboxStore} from '../../store/app-filter/selectors';

type CheckboxProps = {
  checkbox: CheckboxType,
  cb: () => void;
}


function Checkbox ({checkbox, cb}: CheckboxProps): JSX.Element {
  const {label, name} = checkbox;
  const checkboxStore = useSelector(getCheckboxStore);

  return (
    <div className="form-checkbox catalog-filter__block-item">
      <input
        className="visually-hidden"
        type="checkbox"
        id={name}
        name={name}
        checked={checkboxStore[name].isChecked}
        disabled={checkboxStore[name].isDisabled}
        onChange={cb}
        data-testid={`checkbox-${name}`}
      />
      <label htmlFor={name}>{label}</label>
    </div>
  );
}

export default Checkbox;
