import {useDispatch, useSelector} from 'react-redux';
import ModalCloseButton from '../modal-close-button/modal-close-button';
import {openModal, setCartItem} from '../../store/action';
import {Modal} from '../../common/const';
import {getSelectedGuitar} from '../../store/app-cart/selector';


function ModalCartAdd (): JSX.Element {
  const dispatch = useDispatch();
  const selectedGuitar = useSelector(getSelectedGuitar);

  const handleAddToCart = () => {
    dispatch(setCartItem);
    dispatch(openModal(Modal.SuccessAdd));
  };

  return (
    <div className='modal__content'>
      <h2 className='modal__header title title--medium'>Добавить товар в корзину</h2>
      <div className='modal__info'>
        <img className='modal__img' src={selectedGuitar.previewImg} width='67' height='137' alt={selectedGuitar.name} />
        <div className='modal__info-wrapper'>
          <h3 className='modal__product-name title title--little title--uppercase'>{`Гитара ${selectedGuitar.name}`}</h3>
          <p className='modal__product-params modal__product-params--margin-11'>{`Артикул: ${selectedGuitar.vendorCode}`}</p>
          <p className='modal__product-params'>{`${selectedGuitar.type}, ${selectedGuitar.stringCount} струнная`}</p>
          <p className='modal__price-wrapper'>
            <span className='modal__price'>Цена:</span>
            <span className='modal__price'>{selectedGuitar.price}</span>
          </p>
        </div>
      </div>
      <div className='modal__button-container'>
        <button
          className='button button--red button--big modal__button modal__button--add'
          onClick={handleAddToCart}
          type='button'
        >
          Добавить в корзину
        </button>
      </div>
      <ModalCloseButton />
    </div>
  );
}

export default ModalCartAdd;
