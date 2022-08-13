import {navigationItems} from '../../common/const';
import HeaderNavigationItem from '../header-navigation-item/header-navigation-item';

function HeaderNavigation(): JSX.Element {
  return (
    <nav className='main-nav'>
      <ul className='main-nav__list'>
        {navigationItems.map((item)=>(
          <HeaderNavigationItem
            key={`navigationItems-${item.url}`}
            url={item.url}
            label={item.label}
          />
        ))}
      </ul>
    </nav>
  );
}

export default HeaderNavigation;
