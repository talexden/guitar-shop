import {CheckboxType} from '../../types/const-type';
import Checkbox from '../checkbox/checkbox';

type CheckboxListProps = {
  checkboxType: CheckboxType[],
}

function CheckboxList ({checkboxType}: CheckboxListProps):JSX.Element {
  return (
    <fieldset className="catalog-filter__block">
      <legend className="catalog-filter__block-title">Тип гитар</legend>
      {checkboxType.map((checkbox) => (
        <Checkbox key={checkbox.name} checkbox={checkbox} />
      ))}
    </fieldset>
  );
}

export default CheckboxList;
