import {StyleClassName} from '../../common/const';
import Logo from '../logo/logo';

const TAB_INDEX = 0;

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
        <div className="form-search">
          <form className="form-search__form">
            <button className="form-search__submit" type="submit">
              <svg className="form-search__icon" width="14" height="15" aria-hidden="true">
                <use xlinkHref="img/sprite_auto.svg#icon-search" />
              </svg>
              <span className="visually-hidden">Начать поиск</span>
            </button>
            <input className="form-search__input" id="search" type="text" autoComplete="off" placeholder="что вы ищите?" />
            <label className="visually-hidden" htmlFor="search">Поиск</label>
          </form>
          <ul className="form-search__select-list hidden">
            <li className="form-search__select-item" tabIndex={TAB_INDEX}>Четстер Plus</li>
            <li className="form-search__select-item" tabIndex={TAB_INDEX}>Четстер UX</li>
            <li className="form-search__select-item" tabIndex={TAB_INDEX}>Четстер UX2</li>
            <li className="form-search__select-item" tabIndex={TAB_INDEX}>Четстер UX3</li>
            <li className="form-search__select-item" tabIndex={TAB_INDEX}>Четстер UX4</li>
            <li className="form-search__select-item" tabIndex={TAB_INDEX}>Четстер UX5</li>
          </ul>
        </div>
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
