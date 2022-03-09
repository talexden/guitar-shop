import {useDispatch} from 'react-redux';
import {MouseEvent} from 'react';
import {setCurrentPage} from '../../store/action';

type PaginationItemProps = {
  isActive: boolean,
  pageIdx: number,
}


function PaginationItem ({isActive, pageIdx}: PaginationItemProps): JSX.Element {
  const dispatch = useDispatch();
  const handleOnClick = (evt: MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    dispatch(setCurrentPage(pageIdx));
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
