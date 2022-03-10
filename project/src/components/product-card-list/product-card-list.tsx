import {nanoid} from '@reduxjs/toolkit';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {CARD_COUNT} from '../../common/const';
import {sortGuitarsByPages} from '../../common/sort';
import {setCurrentPage, setGuitarsByPages} from '../../store/action';
import {getCurrentPage, getGuitarsByPages, getSortedGuitars} from '../../store/app-process/selectors';
import ProductCard from '../product-card/product-card';

function ProductCardList (): JSX.Element {
  const guitarsByPages = useSelector(getGuitarsByPages);
  const currentPage = useSelector(getCurrentPage);
  const sortedGuitars = useSelector(getSortedGuitars);
  const dispatch = useDispatch();

  useEffect(() => {
    const guitarsSortedByPages = sortGuitarsByPages(sortedGuitars, CARD_COUNT);
    if (guitarsSortedByPages !== guitarsByPages) {
      dispatch(setGuitarsByPages(guitarsSortedByPages));
    } else { console.log('1'); }

  }, [sortedGuitars, dispatch]);

  let correctedPage = currentPage;
  if (guitarsByPages.length > 0 && guitarsByPages.length < currentPage) {
    correctedPage = guitarsByPages.length;
    dispatch(setCurrentPage(correctedPage));
  }

  console.log({correctedPage, guitarsByPages});
  return (
    <div className="cards catalog__cards">
      {guitarsByPages.length > 0 && guitarsByPages[correctedPage - 1].map((guitar)=>(
        <ProductCard key={nanoid()} guitar={guitar}/>
      ))}
    </div>
  );
}

export default ProductCardList;
