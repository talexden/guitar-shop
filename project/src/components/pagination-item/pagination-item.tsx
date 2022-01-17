import { Link } from 'react-router-dom';
import {AppRoute} from '../../common/const';

type PaginationItemProps = {
  isActive: boolean,
  pageIdx: number,
}

function PaginationItem ({isActive, pageIdx}: PaginationItemProps): JSX.Element {
  return (
    <li className={`pagination__page${isActive ? ' pagination__page--active' : ''}`}>
      <Link
        className="link pagination__page-link"
        to={`${AppRoute.Catalog}${pageIdx}`}
      >
        {pageIdx}
      </Link>
    </li>
  );
}

export default PaginationItem;
