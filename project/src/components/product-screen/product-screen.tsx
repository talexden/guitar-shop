import ProductContainer from '../product-container/product-container';
import ReviewsList from '../reviews-list/reviews-list';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import {fetchCurrentGuitar} from '../../store/api-action';
import {getCurrentGuitar, getIsCurrentGuitarLoading, getIsLoading} from '../../store/app-filter/selectors';
import {useEffect} from 'react';
import LoadingScreen from '../loading-screen/loading-screen';


function  ProductScreen(): JSX.Element {
  const isCurrentGuitarLoading = useSelector(getIsCurrentGuitarLoading);
  const isLoading = useSelector(getIsLoading);
  const currentGuitar = useSelector(getCurrentGuitar);
  const dispatch = useDispatch();
  const params: {guitarId: string} = useParams();

  useEffect (() => {
    if (!currentGuitar) {
      dispatch(fetchCurrentGuitar(Number(params.guitarId)));
    }
  }, []);


  if (!isCurrentGuitarLoading) {
    return (
      <>
        {currentGuitar && <ProductContainer /> }
        <ReviewsList />
      </>
    );
  } else {

    //remove double loading
    if (isLoading) {
      return(
        <>
        </>);
    } else {
      return <LoadingScreen/>;
    }
  }
}


export default  ProductScreen;
