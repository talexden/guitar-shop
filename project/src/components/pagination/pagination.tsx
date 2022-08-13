import {useSelector} from 'react-redux';
import {PaginationNav} from '../../common/const';
import {getCurrentPage, getSortedByPages, getPaginationPages} from '../../store/app-filter/selectors';
import PaginationItem from '../pagination-item/pagination-item';


function  Pagination(): JSX.Element {
  const currentPage = useSelector(getCurrentPage);
  const guitarsByPages = useSelector(getSortedByPages);
  const paginationPages = useSelector(getPaginationPages);

  return (
    <div className='pagination page-content__pagination'>
      <ul className='pagination__list'>

        {
          currentPage > 1 &&
          <PaginationItem
            paginationNav={PaginationNav.Previous}
            isActive={false}
            pageIdx={currentPage - 1}
          />
        }


        {paginationPages.map((pageIdx) => (
          <PaginationItem
            key={`paginationPages-${pageIdx}`}
            paginationNav={PaginationNav.PageNumber}
            isActive={currentPage === pageIdx}
            pageIdx={pageIdx}
          />
        ))}

        {
          currentPage < guitarsByPages.length &&
          <PaginationItem
            paginationNav={PaginationNav.Next}
            isActive={false}
            pageIdx={currentPage + 1}
          />
        }

      </ul>
    </div>
  );
}

export default  Pagination;
