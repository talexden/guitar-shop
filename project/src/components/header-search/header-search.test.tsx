import {createMemoryHistory} from 'history';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {configureMockStore} from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import HeaderSearch from './header-search';
import {mockGuitars} from '../../common/mock/mock-guitars';

const history = createMemoryHistory();
const mockStore = configureMockStore();

describe('Component: HeaderSearch', () => {
  it('should render correctly', () => {
    const store = mockStore({
      'PROCESS': {
        searchedGuitars: [],
      },
      'DATA': {guitars: mockGuitars},
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <HeaderSearch />
        </Router>
      </Provider>);

    expect(screen.getByText(/Начать поиск/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Поиск/i)).toBeInTheDocument();
  });
});
