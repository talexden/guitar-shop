import {Link} from 'react-router-dom';
import {AppRoute, NavigationLabel} from '../../common/const';

const BreadcrumbsItem = [
  {
    route: AppRoute.Main,
    label: NavigationLabel.Main,
  },
  {
    route: AppRoute.Catalog,
    label: NavigationLabel.Catalog,
  },
  {
    route: AppRoute.About,
    label: NavigationLabel.About,
  },
];


function  Breadcrumbs(): JSX.Element {
  return (
    <ul className="breadcrumbs page-content__breadcrumbs" data-testid={'breadcrumbs'}>
      {BreadcrumbsItem.map((item) => (
        <li className="breadcrumbs__item" key={`BreadcrumbsItem-${item.route}`}>
          <Link className="link" to={item.route}>{item.label}</Link>
        </li>
      ))}
    </ul>
  );
}

export default  Breadcrumbs;
