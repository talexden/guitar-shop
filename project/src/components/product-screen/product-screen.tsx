import Breadcrumbs from '../breadcrumbs/breadcrumbs';
import Footer from '../footer/footer';
import Header from '../header/header';
import ProductContainer from '../product-container/product-container';
import ReviewsList from '../reviews-list/reviews-list';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import {fetchCurrentGuitar} from '../../store/api-action';
import {getCurrentGuitar, getIsLoading} from '../../store/app-filter/selectors';
import LoadingScreen from '../loading-screen/loading-screen';
import {useEffect} from 'react';
import ModalWindow from '../modal-window/modal-window';
import {getModal} from '../../store/app-process/selector';


function  ProductScreen(): JSX.Element {
  const dispatch = useDispatch();
  const params: {guitarId: string} = useParams();
  const isLoading = useSelector(getIsLoading);
  const modal = useSelector(getModal);
  const currentGuitar = useSelector(getCurrentGuitar);

  useEffect (() => {
    dispatch(fetchCurrentGuitar(params.guitarId));
  }, [dispatch, params]);

  if (!currentGuitar || isLoading) {
    return (<LoadingScreen/>);
  } else {
    return (
      <>
        <Header/>
        <main className="page-content">
          <div className="container">
            <h1 className="page-content__title title title--bigger">Товар</h1>
            <Breadcrumbs breadcrumbs={currentGuitar.name}/>
            <ProductContainer currentGuitar={currentGuitar}/>
            <ReviewsList />
          </div>
        </main>
        <Footer/>
        {modal && <ModalWindow />}
      </>
    );
  }
}


export default  ProductScreen;
