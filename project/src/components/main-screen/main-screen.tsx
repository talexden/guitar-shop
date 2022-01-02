import {useSelector} from 'react-redux';
import {getIsLoading} from '../../store/app-data/selectors';
import {getSortedGuitars} from '../../store/app-process/selectors';
import Breadcrumbs from '../breadcrumbs/breadcrumbs';
import Header from '../header/header';
import Footer from '../footer/footer';
import CatalogFilter from '../catalog-filter/catalog-filter';
import CatalogSort from '../catalog-sort/catalog-sort';
import LoadingScreen from '../loading-screen/loading-screen';
import Pagination from '../pagination/pagination';
import ProductCard from '../product-card/product-card';
import { nanoid } from '@reduxjs/toolkit';


function  MainScreen(): JSX.Element {
  const sortedGuitars = useSelector(getSortedGuitars);
  const isLoading = useSelector(getIsLoading);

  if (isLoading) {
    return (<LoadingScreen />);
  } else {
    return (
      <>
        <Header />
        <main className="page-content">
          <div className="container">
            <h1 className="page-content__title title title--bigger">Каталог гитар</h1>
            <Breadcrumbs />
            <div className="catalog">
              <CatalogFilter />
              <CatalogSort />
              <div className="cards catalog__cards">
                {sortedGuitars.map((guitar)=>(<ProductCard key={nanoid()} guitar={guitar}/>))}
              </div>
              <Pagination />
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }
}

export default  MainScreen;
