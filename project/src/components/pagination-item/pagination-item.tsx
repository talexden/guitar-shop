import {AppRoute, PaginationNav} from '../../common/const';
import { useDispatch } from 'react-redux';
import {redirectToRoute, setFilter} from '../../store/action';
import {MouseEvent} from 'react';
import {PaginationNavigationType} from '../../types/const-type';

type PaginationItemProps = {
  isActive: boolean,
  pageIdx: number,
  paginationNav: PaginationNavigationType;
}


function PaginationItem ({isActive, pageIdx, paginationNav}: PaginationItemProps): JSX.Element {
  const dispatch = useDispatch();
  const handleOnClick = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    dispatch(redirectToRoute(`${AppRoute.Catalog}${pageIdx}`));
    dispatch(setFilter({currentPage: pageIdx}));
  };

  return (
    <li className={`pagination__page${paginationNav.navigationClass}${isActive ? ' pagination__page--active' : ''}`}>
      <a
        className='link pagination__page-link'
        onClick={handleOnClick}
        href={'#top'}
      >
        {paginationNav.label === PaginationNav.PageNumber.label ? pageIdx : paginationNav.label}
      </a>
    </li>
  );
}

export default PaginationItem;
