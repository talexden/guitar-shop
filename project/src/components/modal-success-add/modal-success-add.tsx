import {useDispatch} from 'react-redux';
import {closeModal, redirectToRoute} from '../../store/action';
import {AppRoute} from '../../common/const';
import ModalCloseButton from '../modal-close-button/modal-close-button';
import {noScrollRemove} from '../../common/no-scroll';


function ModalSuccessAdd ():JSX.Element {
  const dispatch = useDispatch();

  const setCloseModal = () => {
    noScrollRemove();
    dispatch(closeModal());
  };

  const handleRedirectToCart  = () => {
    setCloseModal();
    dispatch(redirectToRoute(AppRoute.Cart));
  };

  const handleRedirectToCatalog = () => {
    setCloseModal();
    dispatch(redirectToRoute(AppRoute.Catalog));
  };

  return (
    <div className='modal__content'>
      <svg className='modal__icon' width='26' height='20' aria-hidden='true'>
        <use xlinkHref={'#icon-success'}></use>
      </svg>
      <p className='modal__message'>Товар успешно добавлен в корзину</p>
      <div className='modal__button-container modal__button-container--add'>
        <button
          className='button button--small modal__button'
          onClick={handleRedirectToCart}
          type='button'
        >
          Перейти в корзину
        </button>
        <button
          className='button button--black-border button--small modal__button modal__button--right'
          onClick={handleRedirectToCatalog}
          type='button'
        >
          Продолжить покупки
        </button>
      </div>
      <ModalCloseButton />
    </div>
  );
}

export default ModalSuccessAdd;
