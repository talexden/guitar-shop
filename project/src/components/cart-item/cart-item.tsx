import {CartItemType} from '../../store/app-cart/app-cart';
import {capitalizedString, getTripleNumberString} from '../../common/utils';
import {useDispatch} from 'react-redux';
import {removeCardItem, setCartItemQuantity} from '../../store/action';
import {Quantity} from '../../common/const';
import {ChangeEvent, KeyboardEvent, useEffect, useState} from 'react';

type CartItemProps = {
  cartItem: CartItemType;
}

function CartItem ({cartItem}: CartItemProps): JSX.Element {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState(1);
  const {quantity, guitar} = cartItem;
  const {id, name, type, previewImg, stringCount, price, vendorCode} = guitar;

  useEffect(() => {
    setInputValue(quantity);
  }, [quantity]);

  const handleRemoveCardItem = () => {
    dispatch(removeCardItem(id));
  };

  const handleSetQuantity = (quantityCmd: Quantity, quantityCount?: number) => {
    dispatch(setCartItemQuantity(id, quantityCmd, quantityCount));
  };

  const handleChangeQuantityValue = (evt: ChangeEvent<HTMLInputElement>) => {
    let {value} = evt.target;
    value = value.replace(/\D/g, ''); // '[^0-9]' === '\D'
    while (value[0] === '0' && value.length > 1) {
      value = value.replace(/^0/, '');
    }
    setInputValue(Number(value));
  };

  const handleQuantityPressEnter = (evt: KeyboardEvent<HTMLInputElement> ) => {
    if (evt.key === 'Enter') {
      handleSetQuantity(Quantity.Set, inputValue);
    }
  };

  const handleQuantityBlur = () => {
    handleSetQuantity(Quantity.Set, inputValue);
  };

  return (
    <div className='cart-item'>
      <button
        className='cart-item__close-button button-cross'
        type='button'
        aria-label='Удалить'
        onClick={handleRemoveCardItem}
      >
        <span className='button-cross__icon'></span>
        <span className='cart-item__close-button-interactive-area'></span>
      </button>
      <div className='cart-item__image'>
        <img src={previewImg} width='55' height='130' alt={`${name} ${capitalizedString(type)}`} />
      </div>
      <div className='product-info cart-item__info'>
        <p className='product-info__title'>{`${name} ${capitalizedString(type)}`}</p>
        <p className='product-info__info'>{`Артикул: ${vendorCode}`}</p>
        <p className='product-info__info'>{`${type}, ${stringCount} струнная`}</p>
      </div>
      <div className='cart-item__price'>{getTripleNumberString(price)} ₽</div>
      <div className='quantity cart-item__quantity'>
        <button
          className='quantity__button'
          aria-label='Уменьшить количество'
          type='button'
          onClick={() => handleSetQuantity(Quantity.Dec)}
        >
          <svg width='8' height='8' aria-hidden='true'>
            <use xlinkHref='/img/sprite_auto.svg#icon-minus'></use>
          </svg>
        </button>
        <input
          className='quantity__input'
          type='text'
          placeholder='1'
          id='2-count'
          name='2-count'
          max='99'
          tabIndex={-1}
          value={inputValue}
          onChange={handleChangeQuantityValue}
          onKeyDown={handleQuantityPressEnter}
          onBlur={handleQuantityBlur}
        />
        <button
          className='quantity__button'
          aria-label='Увеличить количество'
          type='button'
          onClick={() => handleSetQuantity(Quantity.Inc)}
        >
          <svg width='8' height='8' aria-hidden='true'>
            <use xlinkHref='/img/sprite_auto.svg#icon-plus'></use>
          </svg>
        </button>
      </div>
      <div className='cart-item__price-total'>{getTripleNumberString(price * quantity)}</div>
    </div>
  );
}

export default CartItem;
