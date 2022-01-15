import {ChangeEvent} from 'react';
import {CheckboxType} from '../../types/const-type';

type CheckboxProps = {
  checkbox: CheckboxType,
  isChecked: boolean
  isDisabled: boolean,
  cb: (evt: ChangeEvent<HTMLInputElement>) => void,
}

function Checkbox (props: CheckboxProps): JSX.Element {
  const {checkbox, isChecked, isDisabled, cb} = props;
  const {label, name} =  checkbox;
  return (
    <div className="form-checkbox catalog-filter__block-item">
      <input
        className="visually-hidden"
        type="checkbox"
        id={name}
        name={name}
        checked={isChecked}
        disabled={isDisabled}
        onChange={cb}
      />
      <label htmlFor={name}>{label}</label>
    </div>
  );
}

export default Checkbox;
