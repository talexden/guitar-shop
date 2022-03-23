import {CheckboxType} from '../../types/const-type';
import {CHECKBOX_STRING_TYPE} from '../../common/const';
import Checkbox from '../checkbox/checkbox';

type CheckboxListProps = {
  checkboxType: CheckboxType[],
  cb: (name: string) => void,
}

function CheckboxList ({checkboxType, cb}: CheckboxListProps):JSX.Element {
  return (
    <fieldset className="catalog-filter__block">
      <legend className="catalog-filter__block-title">Тип гитар</legend>
      {checkboxType.map((checkbox) => (
        <Checkbox
          key={checkbox.name}
          checkbox={checkbox}
          cb={() => cb(checkbox.name)}
        />
      ))}
    </fieldset>
  );
}

export default CheckboxList;
