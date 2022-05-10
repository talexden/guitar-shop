import {useSelector} from 'react-redux';
import {getCurrentPage, getGuitarsByPages} from '../../store/app-process/selectors';
import ProductCard from '../product-card/product-card';

function ProductCardList (): JSX.Element {
  const guitarsByPages = useSelector(getGuitarsByPages);
  const currentPage = useSelector(getCurrentPage);

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
