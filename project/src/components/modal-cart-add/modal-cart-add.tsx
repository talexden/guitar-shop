import {useDispatch, useSelector} from 'react-redux';
import ModalCloseButton from '../modal-close-button/modal-close-button';
import {openModal, addCartItem} from '../../store/action';
import {Modal} from '../../common/const';
import {getGuitarForCart} from '../../store/app-cart/selector';
import {getTripleNumberString} from '../../common/utils';


function ModalCartAdd (): JSX.Element {
  const dispatch = useDispatch();
  const {previewImg, name, type, vendorCode, stringCount, price} = useSelector(getGuitarForCart);

  const handleAddToCart = () => {
    dispatch(addCartItem());
    dispatch(openModal(Modal.SuccessAdd));
  };

  return (
    <div className='modal__content'>
      <h2 className='modal__header title title--medium'>Добавить товар в корзину</h2>
      <div className='modal__info'>
        <img className='modal__img' src={previewImg} width='67' height='137' alt={name} />
        <div className='modal__info-wrapper'>
          <h3 className='modal__product-name title title--little title--uppercase'>{`Гитара ${name}`}</h3>
          <p className='modal__product-params modal__product-params--margin-11'>{`Артикул: ${vendorCode}`}</p>
          <p className='modal__product-params'>{`${type}, ${stringCount} струнная`}</p>
          <p className='modal__price-wrapper'>
            <span className='modal__price'>Цена:</span>
            <span className='modal__price'>{getTripleNumberString(price)} ₽</span>
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
