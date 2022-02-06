import {StyleClassName} from '../../common/const';
import HeaderSearch from '../header-search/header-search';
import Logo from '../logo/logo';
import HeaderCart from '../header-basket/header-cart';
import HeaderNavigation from '../header-navigation/header-navigation';

function Header (): JSX.Element {
  return (
    <header className="header" id="header">
      <div className="container header__wrapper">

        <Logo className={StyleClassName.HeaderLogo}/>

        <HeaderNavigation />

        <HeaderSearch />

        <HeaderCart />

      </div>
    </header>
  );
}

export default Header;
