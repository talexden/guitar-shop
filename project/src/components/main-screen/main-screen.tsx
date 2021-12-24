import Breadcrumbs from '../breadcrumbs/breadcrumbs';
import Header from '../header/header';
import Footer from '../footer/footer';
import CatalogFilter from '../catalog-filter/catalog-filter';
import CatalogSort from '../catalog-sort/catalog-sort';
import Pagination from '../pagination/pagination';
import ProductCard from '../product-card/product-card';


function  MainScreen(): JSX.Element {
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
              <ProductCard />
              <ProductCard />
              <ProductCard />
            </div>
            <Pagination />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default  MainScreen;
