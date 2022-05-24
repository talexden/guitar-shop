import {useDispatch} from 'react-redux';
import {MouseEvent} from 'react';
import {redirectToRoute} from '../../store/action';
import {AppRoute} from '../../common/const';

type PaginationItemProps = {
  isActive: boolean,
  pageIdx: number,
}


function PaginationItem ({isActive, pageIdx}: PaginationItemProps): JSX.Element {
  const dispatch = useDispatch();
  const handleOnClick = (evt: MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    dispatch(redirectToRoute(`${AppRoute.Catalog}${pageIdx}`));
  };

  return (
    <li className={`pagination__page${isActive ? ' pagination__page--active' : ''}`}>
      <a
        className="link pagination__page-link"
        onClick={handleOnClick}
        href="#top"
      >
        {pageIdx}
      </a>
    </li>
  );
}

export default PaginationItem;
