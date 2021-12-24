import {Link} from 'react-router-dom';
import {AppRoutes} from '../../const';

function  Breadcrumbs(): JSX.Element {
  return (
    <ul className="breadcrumbs page-content__breadcrumbs">
      <li className="breadcrumbs__item">
        <Link className="link" to={AppRoutes.Main}>Главная</Link>
      </li>
      <li className="breadcrumbs__item">
        <a className="link" href="#set">Каталог</a>
      </li>
    </ul>
  );
}

export default  Breadcrumbs;
