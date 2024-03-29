import { Link } from 'react-router-dom';
import { AppRoute } from '../../common/const';
import {useSelector} from 'react-redux';
import {getCartItems} from '../../store/app-cart/selector';

function HeaderCart(): JSX.Element {
  const cartItems = useSelector(getCartItems);
  return (
    <Link className='header__cart-link' to={AppRoute.Cart} aria-label='Корзина'>
      <svg className='header__cart-icon' width='14' height='14' aria-hidden='true'>
        <use xlinkHref='/img/sprite_auto.svg#icon-basket' />
      </svg>
      <span className='visually-hidden'>Перейти в корзину</span>
      <span className='header__cart-count' data-testid='basket-count'>{cartItems.length}</span>
    </Link>
  );
}

export default HeaderCart;
