import {getSearchedGuitars} from '../../store/app-filter/selectors';
import HeaderSearchItem from '../header-search-item/header-search-item';
import {useSelector} from 'react-redux';

const STYLE = {
  zIndex: 10,
};


function HeaderSearchList (): JSX.Element {
  const searchedGuitars = useSelector(getSearchedGuitars);

  return (
    <ul
      className={`form-search__select-list${searchedGuitars.length > 0 ? '' : ' hidden'}`}
      style={STYLE}
    >
      {searchedGuitars.map((guitar) => (
        <HeaderSearchItem
          key={`searchedGuitars-${guitar.id}`}
          guitarId={guitar.id}
          guitarName={guitar.name}
        />
      ))}
    </ul>
  );
}

export default HeaderSearchList;
