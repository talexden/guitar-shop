import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {getCurrentNavigationLabel} from '../../store/app-process/selectors';
import {setCurrentNavigationLabel} from '../../store/action';

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
