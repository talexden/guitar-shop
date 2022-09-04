import CatalogFilter from '../catalog-filter/catalog-filter';
import CatalogSort from '../catalog-sort/catalog-sort';
import ProductCardList from '../product-card-list/product-card-list';
import Pagination from '../pagination/pagination';
import {useDispatch, useSelector} from 'react-redux';
import {setUrlSearch} from '../../store/action';
import {
  getUrlSearch
} from '../../store/app-filter/selectors';

function Catalog ():JSX.Element {
  const dispatch = useDispatch();
  const urlSearch = useSelector(getUrlSearch);

  window.onpopstate = function() {
    const locationSearch = window.location.search;
    if (locationSearch !== urlSearch) {
      dispatch(setUrlSearch(locationSearch));
    }
  };

  return (
    <div className='catalog'>
      <CatalogFilter />
      <CatalogSort />
      <ProductCardList />
      <Pagination />
    </div>
  );
}

export default Catalog;
