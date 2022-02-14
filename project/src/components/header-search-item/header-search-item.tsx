import {useDispatch, useSelector} from 'react-redux';
import {FORM_SEARCH_ITEM_TAB_INDEX} from '../../common/const';
import {setCurrentGuitar, setSearchKey} from '../../store/action';
import {getGuitars} from '../../store/app-data/selectors';
import {useOnClick} from '../../hooks/use-on-click';
import {useRef} from 'react';


type HeaderSearchItemProps = {
  guitarName: string;
  guitarId: number;
}

function HeaderSearchItem ({guitarName, guitarId}: HeaderSearchItemProps): JSX.Element {
  const guitars = useSelector(getGuitars);
  const dispatch = useDispatch();
  const node = useRef<HTMLLIElement>(null);

  const handleClick = () => {
    const selectedGuitar = guitars.find((guitar) => guitar.id === guitarId);

    if (selectedGuitar !== undefined) {
      dispatch(setCurrentGuitar(selectedGuitar));
    }
  };


  useOnClick(node, handleClick, () => dispatch(setSearchKey('')));

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
