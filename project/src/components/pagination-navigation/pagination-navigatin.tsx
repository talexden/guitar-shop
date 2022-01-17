import { Link } from 'react-router-dom';
import {PaginationNavigationType} from '../../types/const-type';

type PaginationNavigationProps = {
  navigator: PaginationNavigationType;
  url: string,
}


function PaginationNavigation ({navigator, url}: PaginationNavigationProps): JSX.Element {
  const {navigationClass, id, label} = navigator;

  return (
    <li className={`pagination__page ${navigationClass}`}>
      <Link
        className="link pagination__page-link"
        id={id}
        to={url}
      >
        {label}
      </Link>
    </li>
  );
}

export default PaginationNavigation;
