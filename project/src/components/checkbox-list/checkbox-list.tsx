import {CheckboxType} from '../../types/const-type';
import Checkbox from '../checkbox/checkbox';

type CheckboxListProps = {
  checkboxType: CheckboxType[],
}

function CheckboxList ({checkboxType}: CheckboxListProps):JSX.Element {
  return (
    <>
      {checkboxType.map((checkbox) => <Checkbox key={checkbox.name} checkbox={checkbox} /> )}
    </>
  );
}

export default CheckboxList;
