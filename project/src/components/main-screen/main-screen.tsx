import {useSelector} from 'react-redux';
import {getIsLoading} from '../../store/app-data/selectors';
import Breadcrumbs from '../breadcrumbs/breadcrumbs';
import Header from '../header/header';
import Footer from '../footer/footer';
import CatalogFilter from '../catalog-filter/catalog-filter';
import CatalogSort from '../catalog-sort/catalog-sort';
import LoadingScreen from '../loading-screen/loading-screen';
import Pagination from '../pagination/pagination';
import ProductCardList from '../product-card-list/product-card-list';


function  MainScreen(): JSX.Element {
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
              <ProductCardList />
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
