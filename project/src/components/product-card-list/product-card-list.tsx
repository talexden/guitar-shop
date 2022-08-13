import {useSelector} from 'react-redux';
import {getCurrentPage, getSortedByPages} from '../../store/app-filter/selectors';
import ProductCard from '../product-card/product-card';

function ProductCardList (): JSX.Element {
  const guitarsByPages = useSelector(getSortedByPages);
  const currentPage = useSelector(getCurrentPage);

  return (
    <div className='cards catalog__cards'>
      {
        guitarsByPages.length >= currentPage
        && guitarsByPages[currentPage - 1].map((guitar)=>(
          <ProductCard key={`ProductCard-${guitar.id}`} guitar={guitar}/>))
      }
    </div>
  );
}

export default ProductCardList;
