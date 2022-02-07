import {createMemoryHistory} from 'history';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import CatalogFilter from './catalog-filter';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import {mockGuitarsLongArray} from '../../common/mock-guitars';

const history = createMemoryHistory();
const mockStore = configureMockStore();

describe('Component: CatalogFilter', () => {
  it('should render correctly', () => {
    const store = mockStore({
      PROCESS: {currentPage: 1},
      DATA: {guitars: mockGuitarsLongArray},
    });
    render(
      <Provider store={store}>
        <Router history={history}>
          <CatalogFilter />
        </Router>
      </Provider>);

    expect(screen.getByText(/Фильтр/i)).toBeInTheDocument();
    expect(screen.getByText(/Цена, ₽/i)).toBeInTheDocument();
    expect(screen.getByText(/Минимальная цена/i)).toBeInTheDocument();
    expect(screen.getByTestId('inputPriceMin')).toBeInTheDocument();
    expect(screen.getByText(/Максимальная цена/i)).toBeInTheDocument();
    expect(screen.getByTestId('inputPriceMax')).toBeInTheDocument();
    expect(screen.getByText(/Тип гитар/i)).toBeInTheDocument();
    expect(screen.getByText(/Количество струн/i)).toBeInTheDocument();
  });

  it('should check price input field', () => {
    const store = mockStore({
      'PROCESS': {currentPage: 1},
      'DATA': {guitars: mockGuitarsLongArray},
    });

    const PRICE_LOW = '22000';
    const PRICE_HIGH = '25000';
    render(
      <Provider store={store}>
        <Router history={history}>
          <CatalogFilter />
        </Router>
      </Provider>);

    userEvent.type(screen.getByTestId('inputPriceMin'), PRICE_LOW);
    userEvent.type(screen.getByTestId('inputPriceMax'), PRICE_HIGH);
    expect(screen.getByDisplayValue(/22000/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/25000/i)).toBeInTheDocument();
  });
});

