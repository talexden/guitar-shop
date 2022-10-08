import {Link} from 'react-router-dom';
import {AppRoute, ScreenTemplateTitle, NavigationLabel} from '../../common/const';
import {useSelector} from 'react-redux';
import {getCurrentGuitar} from '../../store/app-filter/selectors';

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
  screenTemplateTitle: ScreenTemplateTitle;
}

function  Breadcrumbs({screenTemplateTitle}: breadcrumbsProps): JSX.Element {
  const currentGuitar = useSelector(getCurrentGuitar);
  let breadcrumbsTitle = '';

  switch (screenTemplateTitle) {
    case ScreenTemplateTitle.Catalog:
      breadcrumbsTitle = ScreenTemplateTitle.Catalog;
      break;
    case ScreenTemplateTitle.Product:
      if (currentGuitar) {
        breadcrumbsTitle = currentGuitar.name;
      }
      break;
  }


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
          href={'#top'}
        >
          {breadcrumbsTitle}
        </a>
      </li>
    </ul>
  );
}

export default  Breadcrumbs;
