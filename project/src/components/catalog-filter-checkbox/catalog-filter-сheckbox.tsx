import {CHECKBOX_GUITAR_TYPE} from '../../common/const';
import {nanoid} from '@reduxjs/toolkit';
import Checkbox from '../checkbox/checkbox';

function  CatalogFilterCheckbox (): JSX.Element {
  return(
    <fieldset className="catalog-filter__block">
      <legend className="catalog-filter__block-title">Тип гитар</legend>
      {CHECKBOX_GUITAR_TYPE.map((checkbox) => (
        <Checkbox
          key={nanoid()}
          isChecked={filtersState[checkbox.name]}
          isDisabled={false}
          checkbox={checkbox}
        />
      ))}
    </fieldset>
  );
}

export default CatalogFilterCheckbox;
