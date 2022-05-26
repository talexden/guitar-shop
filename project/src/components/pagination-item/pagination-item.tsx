import {AppRoute} from '../../common/const';
import {Link} from 'react-router-dom';

type PaginationItemProps = {
  isActive: boolean,
  pageIdx: number,
}


function PaginationItem ({isActive, pageIdx}: PaginationItemProps): JSX.Element {
  return (
    <li className={`pagination__page${isActive ? ' pagination__page--active' : ''}`}>
      <Link to={`${AppRoute.Catalog}${pageIdx}`} className="link pagination__page-link" >{pageIdx}</Link>
    </li>
  );
}

export default PaginationItem;
