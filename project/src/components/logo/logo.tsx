import {Link} from 'react-router-dom';
import {AppRoute, RESET_FILTER} from '../../common/const';
import {useDispatch} from 'react-redux';
import {setFilter} from '../../store/action';

type LogoProps = {
  className: string,
}

function  Logo({className}: LogoProps): JSX.Element {
  const dispatch = useDispatch();
  const handleResetFilter = () => {
    dispatch(setFilter(RESET_FILTER));
  };

  return (
    <Link
      className={`${className} logo`}
      to={AppRoute.Main}
      onClick={handleResetFilter}
    >
      <img className='logo__img' width='70' height='70' src='/img/svg/logo.svg' alt='Логотип' />
    </Link>
  );
}

export default  Logo;
