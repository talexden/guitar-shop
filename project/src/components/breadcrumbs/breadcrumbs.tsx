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
];

type breadcrumbsProps = {
  breadcrumbs: string;
}

function  Breadcrumbs({breadcrumbs}: breadcrumbsProps): JSX.Element {
  return (
    <ul className='breadcrumbs page-content__breadcrumbs' data-testid={'breadcrumbs'}>
      {BreadcrumbsItem.map((item) => (
        <li className='breadcrumbs__item' key={`BreadcrumbsItem-${item.route}`}>
          <Link className='link' to={item.route}>{item.label}</Link>
        </li>
      ))}
      <li className='breadcrumbs__item'>
        <Link className='link' to=''>{breadcrumbs}</Link>
      </li>
    </ul>
  );
}

export default  Breadcrumbs;
