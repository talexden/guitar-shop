import HeaderSearchForm from '../header-search-form/header-search-form';
import HeaderSearchList from '../header-search-list/header-search-list';

function HeaderSearch (): JSX.Element {

  return (
    <div className='form-search'>
      <HeaderSearchForm />
      <HeaderSearchList />
    </div>
  );
}

export default HeaderSearch;
