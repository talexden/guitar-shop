import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {setCurrentNavigationLabel} from '../../store/action';
import {getCurrentNavigationLabel} from '../../store/app-filter/selectors';

type HeaderNavigationItemProps = {
  url: string,
  label: string,
}

function HeaderNavigationItem({url, label}: HeaderNavigationItemProps): JSX.Element {
  const dispatch = useDispatch();
  const currentNavigationLabel = useSelector(getCurrentNavigationLabel);
  const isCurrent = currentNavigationLabel === label;
  const handlerOnclick = () => {
    if (!isCurrent) {
      dispatch(setCurrentNavigationLabel(label));
    }
  };
  return (
    <li>
      <Link
        className={`link main-nav__link${isCurrent ? ' link--current' : ''}`}
        onClick={handlerOnclick}
        to={url}
      >
        {label}
      </Link>
    </li>
  );
}

export default HeaderNavigationItem;
