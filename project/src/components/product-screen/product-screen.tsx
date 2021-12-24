import Breadcrumbs from '../breadcrumbs/breadcrumbs';
import Footer from '../footer/footer';
import Header from '../header/header';
import ProductContainer from '../product-container/product-container';
import ReviewsList from '../reviews-list/reviews-list';

function  ProductScreen(): JSX.Element {
  return (
    <>
      <Header />
      <main className="page-content">
        <div className="container">
          <h1 className="page-content__title title title--bigger">Товар</h1>
          <Breadcrumbs />
          <ProductContainer />
          <ReviewsList />
        </div>
      </main>
      <Footer />
    </>
  );
}

export default  ProductScreen;
