import {nanoid} from '@reduxjs/toolkit';
import {useSelector} from 'react-redux';
import {getSearchedGuitars} from '../../store/app-process/selectors';
import HeaderFormSearchItem from '../header-search-item/header-search-item';

function HeaderSearchList (): JSX.Element {
  const searchedGuitars = useSelector(getSearchedGuitars);

  return (
    <ul className={`form-search__select-list${searchedGuitars.length > 0 ? '' : ' hidden'}`}>
      {searchedGuitars.map((guitar) => (<HeaderFormSearchItem key={nanoid()} guitarId={guitar.id} guitarName={guitar.name} />))}
    </ul>
  );
}

export default HeaderSearchList;
