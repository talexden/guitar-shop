import {createMemoryHistory} from 'history';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import HeaderNavigation from './header-navigation';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';

const history = createMemoryHistory();
const mockStore = configureMockStore();

describe('Component: HeaderNavigation', () => {
  it('should render correctly', () => {
    const store = mockStore({
      'PROCESS': {
        currentNavigationLabel: 'home',
      },
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <HeaderNavigation />
        </Router>
      </Provider>);

    expect(screen.getByText(/Каталог/i)).toBeInTheDocument();
  });
});
