import {nanoid} from '@reduxjs/toolkit';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {CARD_COUNT} from '../../common/const';
import {sortGuitarsByPages} from '../../common/sort';
import {setGuitarsByPages} from '../../store/action';
import {getCurrentPage, getGuitarsByPages, getSortedGuitars} from '../../store/app-process/selectors';
import ProductCard from '../product-card/product-card';

function ProductCardList (): JSX.Element {
  const guitarsByPages = useSelector(getGuitarsByPages);
  const sortedGuitars = useSelector(getSortedGuitars);
  const currentPage = useSelector(getCurrentPage);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setGuitarsByPages(sortGuitarsByPages(sortedGuitars, CARD_COUNT)));
  }, [sortedGuitars, dispatch]);


  return (
    <div className="cards catalog__cards">
      {guitarsByPages.length > 0 && guitarsByPages[currentPage - 1].map((guitar)=>(
        <ProductCard key={nanoid()} guitar={guitar}/>
      ))}
    </div>
  );
}

export default ProductCardList;
