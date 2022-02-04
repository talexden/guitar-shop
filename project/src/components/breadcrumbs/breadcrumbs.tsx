import {Link} from 'react-router-dom';
import {AppRoute, BreadcrumbsLabel} from '../../common/const';
import {nanoid} from '@reduxjs/toolkit';

const BreadcrumbsItem = [
  {
    route: AppRoute.Main,
    label: BreadcrumbsLabel.Main,
  },
  {
    route: AppRoute.Catalog,
    label: BreadcrumbsLabel.Catalog,
  },
  {
    route: AppRoute.About,
    label: BreadcrumbsLabel.About,
  },
];


function  Breadcrumbs(): JSX.Element {
  return (
    <ul className="breadcrumbs page-content__breadcrumbs">
      {BreadcrumbsItem.map((item) => (
        <li className="breadcrumbs__item" key={nanoid()}>
          <Link className="link" to={item.route}>{item.label}</Link>
        </li>
      ))}
    </ul>
  );
}

export default  Breadcrumbs;
