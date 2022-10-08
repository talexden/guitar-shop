import {useSelector} from 'react-redux';
import {getCartItems} from '../../store/app-cart/selector';
import CartItem from '../cart-item/cart-item';
import {getTripleNumberString} from '../../common/utils';

const BONUS = 0.09357; // скидка в процентах

function CartScreen (): JSX.Element {
  const cartItems = useSelector(getCartItems);
  let totalValue = 0;
  cartItems.forEach((cartItem) => (
    totalValue+= cartItem.quantity * cartItem.guitar.price
  ));

  const totalValueBonus = Math.floor(totalValue * BONUS);
  const totalValuePayment = totalValue - totalValueBonus;

  return (
    <div className="cart">
      {cartItems.map((cartItem) => (
        <CartItem key={`cartItem-${cartItem.guitar.id}`} cartItem={cartItem}/>
      ))}
      <div className="cart__footer">
        <div className="cart__coupon coupon">
          <h2 className="title title--little coupon__title">Промокод на скидку</h2>
          <p className="coupon__info">Введите свой промокод, если он у вас есть.</p>
          <form className="coupon__form" id="coupon-form" method="post" action="/">
            <div className="form-input coupon__input">
              <label className="visually-hidden">Промокод</label>
              <input type="text" placeholder="Введите промокод" id="coupon" name="coupon" />
              <p className="form-input__message form-input__message--success">Промокод принят</p>
            </div>
            <button className="button button--big coupon__button">Применить</button>
          </form>
        </div>
        <div className="cart__total-info">
          <p className="cart__total-item">
            <span className="cart__total-value-name">Всего:</span>
            <span className="cart__total-value">{getTripleNumberString(totalValue)} ₽</span>
          </p>
          <p className="cart__total-item">
            <span className="cart__total-value-name">Скидка:</span>
            <span className="cart__total-value cart__total-value--bonus">- {getTripleNumberString(totalValueBonus)} ₽</span>
          </p>
          <p className="cart__total-item">
            <span className="cart__total-value-name">К оплате:</span>
            <span className="cart__total-value cart__total-value--payment">{getTripleNumberString(totalValuePayment)} ₽</span>
          </p>
          <button
            className="button button--red button--big cart__order-button"
            type='button'
          >
            Оформить заказ
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartScreen;
