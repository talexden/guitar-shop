import {useDispatch, useSelector} from 'react-redux';
import {AppRoute, FORM_SEARCH_ITEM_TAB_INDEX} from '../../common/const';
import {redirectToRoute, setSearchKey} from '../../store/action';
import {useRef} from 'react';
import {getSearchKey} from '../../store/app-filter/selectors';


type HeaderSearchItemProps = {
  guitarName: string;
  guitarId: number;
}

function HeaderSearchItem ({guitarName, guitarId}: HeaderSearchItemProps): JSX.Element {
  const searchKey = useSelector(getSearchKey);
  const dispatch = useDispatch();
  const node = useRef<HTMLLIElement>(null);

  const handleClick = () => {
    if (searchKey !== '') {
      dispatch(setSearchKey(''));
    }
    dispatch(redirectToRoute(`${AppRoute.ProductInfo}/${guitarId}`));
  };

  return (
    <li
      ref={node}
      className="form-search__select-item"
      tabIndex={FORM_SEARCH_ITEM_TAB_INDEX}
      onClick={handleClick}
    >
      {guitarName}
    </li>
  );
}

export default HeaderSearchItem;
