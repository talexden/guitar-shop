import {useSelector} from 'react-redux';
import {getIsLoading} from '../../store/app-filter/selectors';
import Breadcrumbs from '../breadcrumbs/breadcrumbs';
import Header from '../header/header';
import Footer from '../footer/footer';
import LoadingScreen from '../loading-screen/loading-screen';
import ModalScreen from '../modal-screen/modal-screen';
import {getModal} from '../../store/app-process/selector';
import {ReactNode} from 'react';
import {ScreenTemplateTitle} from '../../common/const';

type MainScreenProps = {
  children?: ReactNode,
  title: ScreenTemplateTitle,
}

function  ScreenTemplate({children, title}: MainScreenProps): JSX.Element {
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
            <h1 className='page-content__title title title--bigger'>{title}</h1>
            <Breadcrumbs screenTemplateTitle={title}/>
            {children}
          </div>
        </main>
        <Footer />
        {modal && <ModalScreen />}
      </>
    );
  }
}

export default  ScreenTemplate;
