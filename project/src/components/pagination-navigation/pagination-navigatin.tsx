import {PaginationNavigationType} from '../../types/const-type';
import {useDispatch} from 'react-redux';
import {setCurrentPage} from '../../store/action';

type PaginationNavigationProps = {
  navigator: PaginationNavigationType;
  pageIdx: number,
}


function PaginationNavigation ({navigator, pageIdx}: PaginationNavigationProps): JSX.Element {
  const {navigationClass, id, label} = navigator;
  const dispatch = useDispatch();
  const handleOnClick = (page: number) => {
    dispatch(setCurrentPage(page));
  };


  return (
    <li className={`pagination__page ${navigationClass}`}>
      <a
        className="link pagination__page-link"
        id={id}
        onClick={() => handleOnClick(pageIdx)}
        href="#top"
      >
        {label}
      </a>
    </li>
  );
}

export default PaginationNavigation;
