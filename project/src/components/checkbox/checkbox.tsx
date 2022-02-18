import {ChangeEvent} from 'react';
import {CheckboxType} from '../../types/const-type';

type CheckboxProps = {
  checkbox: CheckboxType,
}

function Checkbox ({checkbox}: CheckboxProps): JSX.Element {
  const {label, name} = checkbox;
  return (
    <div className="form-checkbox catalog-filter__block-item">
      <input
        className="visually-hidden"
        type="checkbox"
        id={name}
        name={name}
        checked={isChecked}
        disabled={isDisabled}
        onChange={}
        data-testid={`checkbox-${name}`}
      />
      <label htmlFor={name}>{label}</label>
    </div>
  );
}

export default Checkbox;
