import {nanoid} from '@reduxjs/toolkit';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import {CARD_COUNT} from '../../common/const';
import {sortGuitarsByPages} from '../../common/sort';
import {setCurrentPage, setGuitarsByPages} from '../../store/action';
import {getCurrentPage, getGuitarsByPages, getSortedGuitars} from '../../store/app-process/selectors';
import ProductCard from '../product-card/product-card';

function ProductCardList (): JSX.Element {
  const sortedGuitars = useSelector(getSortedGuitars);
  const guitarsByPages = useSelector(getGuitarsByPages);
  const dispatch = useDispatch();
  const currentPage = useSelector(getCurrentPage);

  useEffect(() => {
    dispatch(setGuitarsByPages(sortGuitarsByPages(sortedGuitars, CARD_COUNT)));
  }, [sortedGuitars, dispatch]);


  const pageIdx: {pageIdx: string} = useParams();
  useEffect(() => {
    let pageNumber = Number(pageIdx.pageIdx);
    const pageCatalogLength = guitarsByPages.length;
    if (pageCatalogLength > 0 && pageNumber > pageCatalogLength) {
      pageNumber = pageCatalogLength;
    }
    dispatch(setCurrentPage(pageNumber));
  }, [dispatch, pageIdx, guitarsByPages]);

  return (
    <div className="cards catalog__cards">
      {guitarsByPages.length > 0 && guitarsByPages[currentPage - 1].map((guitar)=>(<ProductCard key={nanoid()} guitar={guitar}/>))}
    </div>
  );
}

export default ProductCardList;
