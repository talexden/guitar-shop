import HeaderSearchForm from '../header-search-form/header-search-form';
import HeaderSearchList from '../header-search-list/header-search-list';
import {useSelector} from 'react-redux';
import {getSearchedGuitars} from '../../store/app-filter/selectors';

function HeaderSearch (): JSX.Element {
  const searchedGuitars = useSelector(getSearchedGuitars);

  return (
    <div className='form-search'>
      <HeaderSearchForm />
      {searchedGuitars.length > 0 && <HeaderSearchList/>}
    </div>
  );
}

export default HeaderSearch;
