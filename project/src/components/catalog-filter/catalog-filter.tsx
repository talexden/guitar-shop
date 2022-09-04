import {
  CHECKBOX_GUITAR_TYPE,
  CHECKBOX_STRING_TYPE,
  FilterBlockTitle,
  priceInput, RESET_FILTER
} from '../../common/const';

import CatalogFilterPrice from '../catalog-filter-price/catalog-filter-price';
import CheckboxList from '../checkbox-list/checkbox-list';
import CatalogFilterBlock from '../catalog-filter-block/catalog-filter-block';
import { useDispatch } from 'react-redux';
import {setFilter} from '../../store/action';

function    CatalogFilter(): JSX.Element {
  const dispatch = useDispatch();
  const handleResetFilters = () => {
    dispatch(setFilter(RESET_FILTER));
  };

  return (
    <form className='catalog-filter'>
      <h2 className='title title--bigger catalog-filter__title'>Фильтр</h2>

      <CatalogFilterBlock blockTitle={FilterBlockTitle.Price}>
        <div className='catalog-filter__price-range'>
          <CatalogFilterPrice inputType={priceInput.priceMin} />
          <CatalogFilterPrice inputType={priceInput.priceMax} />
        </div>
      </CatalogFilterBlock>

      <CatalogFilterBlock blockTitle={FilterBlockTitle.Type} >
        <CheckboxList checkboxType={CHECKBOX_GUITAR_TYPE} />
      </CatalogFilterBlock>

      <CatalogFilterBlock blockTitle={FilterBlockTitle.Strings} >
        <CheckboxList checkboxType={CHECKBOX_STRING_TYPE} />
      </CatalogFilterBlock>

      <button
        className="catalog-filter__reset-btn button button--black-border button--medium"
        onClick={handleResetFilters}
        type="button"
      >
        Очистить
      </button>
    </form>
  );
}

export default  CatalogFilter;
