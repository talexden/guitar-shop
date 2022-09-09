import CatalogFilter from '../catalog-filter/catalog-filter';
import CatalogSort from '../catalog-sort/catalog-sort';
import ProductCardList from '../product-card-list/product-card-list';
import Pagination from '../pagination/pagination';
import {useDispatch, useSelector} from 'react-redux';
import {setFilter} from '../../store/action';
import {
  getUrlSearch
} from '../../store/app-filter/selectors';
import {NO_PARAMS} from '../../common/const';

function Catalog ():JSX.Element {
  const dispatch = useDispatch();
  const urlSearch = useSelector(getUrlSearch);

  // EventListener for parseUrlSearch
  window.onpopstate = function() {
    const locationSearch = window.location.search || NO_PARAMS;
    if (locationSearch !== urlSearch) {
      dispatch(setFilter({locationSearch}));
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
