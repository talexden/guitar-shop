import {useSelector} from 'react-redux';
import {getIsLoading} from '../../store/app-filter/selectors';
import Breadcrumbs from '../breadcrumbs/breadcrumbs';
import Header from '../header/header';
import Footer from '../footer/footer';
import LoadingScreen from '../loading-screen/loading-screen';
import ModalScreen from '../modal-screen/modal-screen';
import {getModal} from '../../store/app-process/selector';
import Catalog from '../catalog/catalog';

const GOOD = 'Товар';

function  MainScreen(): JSX.Element {
  const isLoading = useSelector(getIsLoading);
  const modal = useSelector(getModal);
  if (isLoading) {
    return (<LoadingScreen />);
  } else {
    return (
      <>
        <Header />
        <main className='page-content'>
          <div className='container'>
            <h1 className='page-content__title title title--bigger'>Каталог гитар</h1>
            <Breadcrumbs breadcrumbs={GOOD}/>
            <Catalog />
          </div>
        </main>
        <Footer />
        {modal && <ModalScreen />}
      </>
    );
  }
}

export default  MainScreen;
