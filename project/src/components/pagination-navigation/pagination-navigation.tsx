import {PaginationNavigationType} from '../../types/const-type';
import {AppRoute} from '../../common/const';
import {Link} from 'react-router-dom';

type PaginationNavigationProps = {
  navigation: PaginationNavigationType;
  pageIdx: number,
}


function PaginationNavigation ({navigation, pageIdx}: PaginationNavigationProps): JSX.Element {
  const {navigationClass, label} = navigation;

  return (
    <li className={`pagination__page ${navigationClass}`}>
      <Link to={`${AppRoute.Catalog}${pageIdx}`} className="link pagination__page-link" >{label}</Link>
    </li>
  );
}

export default PaginationNavigation;
