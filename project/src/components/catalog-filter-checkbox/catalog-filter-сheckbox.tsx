import {nanoid} from '@reduxjs/toolkit';
import Checkbox from '../checkbox/checkbox';
import {CheckboxType} from '../../types/const-type';

type CatalogFilterCheckboxProps = {
  checkboxType: CheckboxType[],
}

function  CatalogFilterCheckbox ({checkboxType}: CatalogFilterCheckboxProps): JSX.Element {

  return(
    <fieldset className="catalog-filter__block">
      <legend className="catalog-filter__block-title">Тип гитар</legend>
      {checkboxType.map((checkbox) => (
        <Checkbox
          key={nanoid()}
          checkbox={checkbox}
        />
      ))}
    </fieldset>
  );
}

export default CatalogFilterCheckbox;
