import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {PaginationNav} from '../../common/const';
import {setCurrentPage} from '../../store/action';
import {getCurrentPage, getGuitarsByPages, getPaginationPages} from '../../store/app-filter/selectors';
import PaginationItem from '../pagination-item/pagination-item';
import PaginationNavigation from '../pagination-navigation/pagination-navigation';
import {useParams} from 'react-router-dom';


function  Pagination(): JSX.Element {
  const currentPage = useSelector(getCurrentPage);
  const guitarsByPages = useSelector(getGuitarsByPages);
  const paginationPages = useSelector(getPaginationPages);
  const dispatch = useDispatch();
  const page: {pageIdx: string}  = useParams();

  // set page
  useEffect(() => {
    dispatch(setCurrentPage(Number(page.pageIdx)));
  }, [dispatch, page, guitarsByPages]);


  return (
    <div className="pagination page-content__pagination">
      <ul className="pagination__list">

        {
          currentPage > 1 &&
          <PaginationNavigation
            navigation={PaginationNav.Previous}
            pageIdx={currentPage - 1}
          />
        }


        {paginationPages.map((pageIdx) => (
          <PaginationItem
            key={`paginationPages-${pageIdx}`}
            isActive={currentPage === pageIdx}
            pageIdx={pageIdx}
          />
        ))}

        {
          currentPage < guitarsByPages.length &&
          <PaginationNavigation
            navigation={PaginationNav.Next}
            pageIdx={currentPage + 1}
          />
        }

      </ul>
    </div>
  );
}

export default  Pagination;
