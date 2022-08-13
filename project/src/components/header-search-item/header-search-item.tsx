import {useDispatch} from 'react-redux';
import {AppRoute, FORM_SEARCH_ITEM_TAB_INDEX} from '../../common/const';
import {redirectToRoute, setSearchKey} from '../../store/action';


type HeaderSearchItemProps = {
  guitarName: string;
  guitarId: number;
}

function  HeaderSearchItem ({guitarName, guitarId}: HeaderSearchItemProps): JSX.Element {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setSearchKey(''));
    dispatch(redirectToRoute(`${AppRoute.ProductInfo}/${guitarId}`));
  };

  return (
    <li
      className='form-search__select-item'
      tabIndex={FORM_SEARCH_ITEM_TAB_INDEX}
      onClick={handleClick}
    >
      {guitarName}
    </li>
  );
}

export default HeaderSearchItem;
