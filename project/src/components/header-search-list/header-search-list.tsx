import {getSearchedGuitars} from '../../store/app-filter/selectors';
import HeaderSearchItem from '../header-search-item/header-search-item';
import {useDispatch, useSelector} from 'react-redux';
import {setSearchKey} from '../../store/action';

function HeaderSearchList (): JSX.Element {
  const searchedGuitars = useSelector(getSearchedGuitars);
  const dispatch = useDispatch();

  const handleCloseSearchList = () => {
    dispatch(setSearchKey(''));
    window.removeEventListener('keydown', handleEsc);
    window.removeEventListener('click', handleCloseSearchList);
  };

  const handleEsc = (evt: KeyboardEvent) => {
    if (evt.key === 'Escape') {
      handleCloseSearchList();
    }
  };

  const searchListClass = 'form-search__select-list';
  const searchInputClass = 'form-search__input';

  const handleClickOutside = (evt: Event) => {
    const target = evt.target as HTMLElement;
    const isClickOnForm =
      target.className === searchListClass ||
      target.className === searchInputClass;
    if (!isClickOnForm) {
      handleCloseSearchList();
    }
  };

  window.addEventListener('click', handleClickOutside);
  window.addEventListener('keydown', handleEsc);

  return (
    <ul className='form-search__select-list'>
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
