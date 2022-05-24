import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {CURRENT_PAGE_INIT, PAGINATION_COUNT, PaginationNav} from '../../common/const';
import {getIntegersArrayFromTo} from '../../common/utils';
import {setPaginationPages} from '../../store/action';
import {getCurrentPage, getGuitarsByPages, getPaginationPages} from '../../store/app-filter/selectors';
import PaginationItem from '../pagination-item/pagination-item';
import PaginationNavigation from '../pagination-navigation/pagination-navigation';


function  Pagination(): JSX.Element {
  const currentPage = useSelector(getCurrentPage);
  const guitarsByPages = useSelector(getGuitarsByPages);
  const paginationPages = useSelector(getPaginationPages);
  const dispatch = useDispatch();
  const paginationCenter = Math.round(PAGINATION_COUNT / 2);

  useEffect(() => {
    const guitarsByPagesSize = guitarsByPages.length;
    let startPage = CURRENT_PAGE_INIT;
    let endPage = guitarsByPagesSize;
    if (guitarsByPagesSize > PAGINATION_COUNT) {
      if (currentPage === guitarsByPagesSize) {
        startPage = currentPage - paginationCenter;
        endPage = currentPage;
      } else {
        startPage = currentPage - (PAGINATION_COUNT - paginationCenter);
        endPage = currentPage + (PAGINATION_COUNT - paginationCenter);
      }
    }
    const pages = getIntegersArrayFromTo(startPage, endPage);
    dispatch(setPaginationPages(pages));
  }, [currentPage, guitarsByPages, dispatch, paginationCenter]);

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
