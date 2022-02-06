import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {SortDirect, SortKey} from '../../common/const';
import {sort} from '../../common/sort';
import {setSortDirect, setSortedGuitars, setSortKey} from '../../store/action';
import {getFilteredGuitars, getIsFilter, getSortDirect, getSortKey} from '../../store/app-process/selectors';

const SORT_TYPE_BUTTON_ACTIVE = ' catalog-sort__type-button--active';
const SORT_ORDER_BUTTON_ACTIVE = ' catalog-sort__order-button--active';

function  CatalogSort(): JSX.Element {
  const dispatch = useDispatch();
  const filteredGuitars = useSelector(getFilteredGuitars);
  const sortKey = useSelector(getSortKey);
  const sortDirect = useSelector(getSortDirect);
  const isFilter = useSelector(getIsFilter);

  useEffect(()=> {
    let sortGuitars = [...filteredGuitars];
    if (isFilter) {
      sortGuitars = sort(filteredGuitars, sortKey, sortDirect);
    }
    dispatch(setSortedGuitars(sortGuitars));
  }, [filteredGuitars, sortKey, sortDirect, dispatch, isFilter]);


  return (
    <div className="catalog-sort">
      <h2 className="catalog-sort__title">Сортировать:</h2>
      <div className="catalog-sort__type">
        <button
          className={`catalog-sort__type-button${sortKey === SortKey.Price && isFilter ? SORT_TYPE_BUTTON_ACTIVE : ''}`}
          aria-label="по цене"
          onClick={() => dispatch(setSortKey(SortKey.Price))}
        >
          по цене
        </button>
        <button
          className={`catalog-sort__type-button${sortKey === SortKey.Rating && isFilter ? SORT_TYPE_BUTTON_ACTIVE : ''}`}
          aria-label="по популярности"
          onClick={() => dispatch(setSortKey(SortKey.Rating))}
        >
          по популярности
        </button>
      </div>
      <div className="catalog-sort__order">
        <button
          className={`catalog-sort__order-button catalog-sort__order-button--up${sortDirect === SortDirect.LowToHigh && isFilter ? SORT_ORDER_BUTTON_ACTIVE : ''}`}
          aria-label="По возрастанию"
          // tabIndex={SORT_TAB_INDEX}
          onClick={() => dispatch(setSortDirect(SortDirect.LowToHigh))}
          data-testid = 'sortDirectLowToHigh'
        />
        <button
          className={`catalog-sort__order-button catalog-sort__order-button--down${sortDirect === SortDirect.HighToLow && isFilter ? SORT_ORDER_BUTTON_ACTIVE : ''}`}
          aria-label="По убыванию"
          onClick={() => dispatch(setSortDirect(SortDirect.HighToLow))}
          data-testid = 'sortDirectHighToLow'

        />
      </div>
    </div>
  );
}

export default  CatalogSort;
