import {ChangeEvent} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setSearchKey} from '../../store/action';
import {getSearchKey} from '../../store/app-filter/selectors';

function HeaderSearchForm (): JSX.Element {
  const dispatch = useDispatch();
  const searchKey = useSelector(getSearchKey);

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const {value} = evt.target;
    dispatch(setSearchKey(value));
  };

  return (
    <form className='form-search__form'>
      <button className='form-search__submit' type='submit'>
        <svg className='form-search__icon' width='14' height='15' aria-hidden='true'>
          <use xlinkHref='/img/sprite_auto.svg#icon-search' />
        </svg>
        <span className='visually-hidden'>Начать поиск</span>
      </button>
      <input
        className='form-search__input'
        id='search'
        type='text'
        autoComplete='off'
        placeholder='что вы ищите?'
        onChange={handleChange}
        value={searchKey}
        data-testid='search-input'
      />
      <label className='visually-hidden' htmlFor='search'>Поиск</label>
    </form>
  );
}

export default HeaderSearchForm;
