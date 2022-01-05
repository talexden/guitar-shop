import {StyleClassName} from '../../common/const';
import HeaderSearch from '../header-search/header-search';
import Logo from '../logo/logo';

function Header (): JSX.Element {
  return (
    <header className="header" id="header">
      <div className="container header__wrapper">

        <Logo className={StyleClassName.HeaderLogo}/>

        <nav className="main-nav">
          <ul className="main-nav__list">
            <li>
              <a className="link main-nav__link link--current" href="#top">Каталог</a>
            </li>
            <li>
              <a className="link main-nav__link" href="#top">Где купить?</a>
            </li>
            <li>
              <a className="link main-nav__link" href="#top">О компании</a>
            </li>
          </ul>
        </nav>

        <HeaderSearch />

        <a className="header__cart-link" href="#top" aria-label="Корзина">
          <svg className="header__cart-icon" width="14" height="14" aria-hidden="true">
            <use xlinkHref="img/sprite_auto.svg#icon-basket" />
          </svg>
          <span className="visually-hidden">Перейти в корзину</span>
          <span className="header__cart-count">2</span>
        </a>
      </div>
    </header>
  );
}

export default Header;
