import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {CARD_COUNT} from '../../common/const';
import {sortGuitarsByPages} from '../../common/sort';
import {setGuitarsByPages} from '../../store/action';
import {getCurrentPage, getGuitarsByPages, getSortedGuitars} from '../../store/app-process/selectors';
import ProductCard from '../product-card/product-card';

function ProductCardList (): JSX.Element {
  const guitarsByPages = useSelector(getGuitarsByPages);
  const currentPage = useSelector(getCurrentPage);
  const sortedGuitars = useSelector(getSortedGuitars);
  const dispatch = useDispatch();


  useEffect(() => {
    const guitarsSortedByPages = sortGuitarsByPages(sortedGuitars, CARD_COUNT);
    dispatch(setGuitarsByPages(guitarsSortedByPages));
  }, [sortedGuitars, dispatch]);


  return (
    <div className="cards catalog__cards">
      {
        guitarsByPages.length >= currentPage
        && guitarsByPages[currentPage - 1].map((guitar)=>(
          <ProductCard key={`ProductCard-${guitar.id}`} guitar={guitar}/>))
      }
    </div>
  );
}

export default ProductCardList;
