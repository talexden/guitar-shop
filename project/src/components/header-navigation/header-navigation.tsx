import {navigationItems} from '../../common/const';
import HeaderNavigationItem from '../header-navigation-item/header-navigation-item';
import {nanoid} from '@reduxjs/toolkit';

function HeaderNavigation(): JSX.Element {
  return (
    <nav className="main-nav">
      <ul className="main-nav__list">
        {navigationItems.map((item)=>(
          <HeaderNavigationItem
            key={nanoid()}
            url={item.url}
            label={item.label}
          />
        ))}
      </ul>
    </nav>
  );
}

export default HeaderNavigation;
