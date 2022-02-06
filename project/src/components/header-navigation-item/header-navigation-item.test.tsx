import {createMemoryHistory} from 'history';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {configureMockStore} from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import HeaderNavigationItem from './header-navigation-item';

const history = createMemoryHistory();
const mockStore = configureMockStore();

describe('Component: HeaderNavigationItem', () => {
  it('should render correctly', () => {
    const store = mockStore({
      'PROCESS': {
        currentNavigationLabel: 'home',
      },
    });

    const fakeUrl = '/home';
    const fakeLabel = 'Вязанные вазы';

    render(
      <Provider store={store}>
        <Router history={history}>
          <HeaderNavigationItem url={fakeUrl} label={fakeLabel}/>
        </Router>
      </Provider>);

    expect(screen.getByText(/Вязанные вазы/i)).toBeInTheDocument();
  });


});
