import {ChangeEvent, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {search} from '../../common/search';
import {setSearchedGuitars, setSearchKey} from '../../store/action';
import {getGuitars, getSearchedGuitars} from '../../store/app-filter/selectors';
import {getSearchKey} from '../../store/app-filter/selectors';

function HeaderSearchForm (): JSX.Element {
  const dispatch = useDispatch();
  const guitars = useSelector(getGuitars);
  const searchKey = useSelector(getSearchKey);
  const searchedGuitars = useSelector(getSearchedGuitars);


  useEffect(() => {
    if (searchKey !== '') {
      const searchedGuitars = search(guitars, searchKey);
      dispatch(setSearchedGuitars(searchedGuitars));
    } else {
      if (searchedGuitars.length) {
        dispatch(setSearchedGuitars([]));
      }

    }
  },[searchKey, guitars, dispatch]);

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const {value} = evt.target;
    dispatch(setSearchKey(value));
  };


  return (
    <form className="form-search__form">
      <button className="form-search__submit" type="submit">
        <svg className="form-search__icon" width="14" height="15" aria-hidden="true">
          <use xlinkHref="img/sprite_auto.svg#icon-search" />
        </svg>
        <span className="visually-hidden">Начать поиск</span>
      </button>
      <input
        className="form-search__input"
        id="search"
        type="text"
        autoComplete="off"
        placeholder="что вы ищите?"
        onChange={handleChange}
        value={searchKey}
        data-testid="search-input"
      />
      <label className="visually-hidden" htmlFor="search">Поиск</label>
    </form>
  );
}

export default HeaderSearchForm;
