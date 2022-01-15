import {Link} from 'react-router-dom';
import {AppRoute} from '../../common/const';

function  Breadcrumbs(): JSX.Element {
  return (
    <ul className="breadcrumbs page-content__breadcrumbs">
      <li className="breadcrumbs__item">
        <Link className="link" to={AppRoute.Main}>Главная</Link>
      </li>
      <li className="breadcrumbs__item">
        <a className="link" href="#set">Каталог</a>
      </li>
    </ul>
  );
}

export default  Breadcrumbs;