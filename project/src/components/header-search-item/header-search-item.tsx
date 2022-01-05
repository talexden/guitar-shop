import {useDispatch} from 'react-redux';
import {FORM_SEARCH_ITEM_TAB_INDEX} from '../../common/const';
import {fetchGuitarById} from '../../store/api-action';


type HeaderSearchItem = {
  guitarName: string;
  guitarId: number;
}

function HeaderFormSearchItem ({guitarName, guitarId}: HeaderSearchItem): JSX.Element {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(fetchGuitarById(guitarId));
  };

  return (
    <li
      className="form-search__select-item"
      tabIndex={FORM_SEARCH_ITEM_TAB_INDEX}
      onClick={handleClick}
    >
      {guitarName}
    </li>
  );
}

export default HeaderFormSearchItem;
