import {Link} from 'react-router-dom';
import {AppRoutes} from '../../const';

function ErrorScreen(): JSX.Element {
  return (
    <h1>
      <b className="not-found__status">404 Not Found</b>
      <p className="not-found__status-description">
        <Link to={AppRoutes.Main}>Перейти на главную страницу</Link>
      </p>
    </h1>
  );
}

export default ErrorScreen;
