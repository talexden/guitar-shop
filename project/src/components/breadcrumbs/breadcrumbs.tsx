import {Link} from 'react-router-dom';
import {AppRoute, NavigationLabel, RESET_FILTER, ScreenTemplateTitle} from '../../common/const';
import {useDispatch, useSelector} from 'react-redux';
import {getCurrentGuitar} from '../../store/app-filter/selectors';
import {setFilter} from '../../store/action';

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
  const dispatch = useDispatch();
  let breadcrumbsTitle = '';

  const  handleOnClick = (route: AppRoute) => {
    if (route === AppRoute.Catalog) {
      dispatch(setFilter(RESET_FILTER));

    }
  };

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
          <Link
            className='link'
            to={item.route}
            onClick={() => handleOnClick(item.route)}
          >
            {item.label}
          </Link>
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
