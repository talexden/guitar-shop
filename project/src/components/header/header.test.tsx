import {createMemoryHistory} from 'history';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import Header from './header';
import {configureMockStore} from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { mockGuitars } from '../../common/mock-guitars';

const history = createMemoryHistory();
const mockStore = configureMockStore();

describe('Component: Header', () => {
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
          <Header/>
        </Router>
      </Provider>);

    expect(screen.getByAltText(/Логотип/i)).toBeInTheDocument();
    expect(screen.getByText(/Каталог/i)).toBeInTheDocument();
    expect(screen.getByText(/Где купить?/i)).toBeInTheDocument();
    expect(screen.getByText(/О компании/i)).toBeInTheDocument();
    expect(screen.getByText(/Начать поиск/i)).toBeInTheDocument();
    expect(screen.getByText(/Перейти в корзину/i)).toBeInTheDocument();
  });
});
