import {Link} from 'react-router-dom';
import {AppRoute, NavigationLabel} from '../../common/const';
import {useDispatch} from 'react-redux';
import {MouseEvent} from 'react';
import {redirectToRoute} from '../../store/action';

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
  const dispatch = useDispatch();

  const handleRedirectToCatalog = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    dispatch(redirectToRoute(AppRoute.Catalog));
  };

  return (
    <ul className='breadcrumbs page-content__breadcrumbs' data-testid={'breadcrumbs'}>
      {BreadcrumbsItem.map((item) => (
        <li className='breadcrumbs__item' key={`BreadcrumbsItem-${item.route}`}>
          <Link className='link' to={item.route}>{item.label}</Link>
        </li>
      ))}
      <li className='breadcrumbs__item'>
        <a
          className='link'
          onClick={handleRedirectToCatalog}
          href={'#top'}
        >
          {breadcrumbs}
        </a>
      </li>
    </ul>
  );
}

export default  Breadcrumbs;
