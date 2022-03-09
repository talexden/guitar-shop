import {PaginationNavigationType} from '../../types/const-type';
import {useDispatch} from 'react-redux';
import {setCurrentPage} from '../../store/action';
import {MouseEvent} from 'react';

type PaginationNavigationProps = {
  navigation: PaginationNavigationType;
  pageIdx: number,
}


function PaginationNavigation ({navigation, pageIdx}: PaginationNavigationProps): JSX.Element {
  const {navigationClass, id, label} = navigation;
  const dispatch = useDispatch();
  const handleOnClick = (evt: MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    dispatch(setCurrentPage(pageIdx));
  };


  return (
    <li className={`pagination__page ${navigationClass}`}>
      <a
        className="link pagination__page-link"
        id={id}
        onClick={handleOnClick}
        href="#top"
      >
        {label}
      </a>
    </li>
  );
}

export default PaginationNavigation;
