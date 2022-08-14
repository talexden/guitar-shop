import { useDispatch } from 'react-redux';
import ModalCloseButton from '../modal-close-button/modal-close-button';
import {openModal} from '../../store/action';
import {Modal} from '../../common/const';

function ModalCartAdd (): JSX.Element {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch();
    dispatch(openModal(Modal.SuccessAdd));
  };

  return (
    <div className='modal__content'>
      <h2 className='modal__header title title--medium'>Добавить товар в корзину</h2>
      <div className='modal__info'>
        <img className='modal__img' src='img/content/catalog-product-2.png' srcSet='img/content/catalog-product-2@2x.png 2x' width='67' height='137' alt='Честер bass' />
        <div className='modal__info-wrapper'>
          <h3 className='modal__product-name title title--little title--uppercase'>Гитара Честер bass</h3>
          <p className='modal__product-params modal__product-params--margin-11'>Артикул: SO757575</p>
          <p className='modal__product-params'>Электрогитара, 6 струнная</p>
          <p className='modal__price-wrapper'><span className='modal__price'>Цена:</span><span className='modal__price'>17 500 ₽</span>
          </p>
        </div>
      </div>
      <div className='modal__button-container'>
        <button
          className='button button--red button--big modal__button modal__button--add'
          onClick={}
          type='button'
        >
          Добавить в корзину
        </button>
      </div>
      <ModalCloseButton />
    </div>
  );
}
