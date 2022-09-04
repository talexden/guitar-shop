import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import {render, screen} from '@testing-library/react';
import {mockGuitar, mockGuitars} from '../../common/mock/mock-guitars';
import ProductScreen from './product-screen';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: ProductScreen', () => {
  it('should render correctly', () => {
    const store = mockStore({
      FILTER: {
        currentGuitar: mockGuitar,
        searchedGuitars: [],
        guitarsByPages: [],
        currentPage: 1,
        paginationPages: [],
        filteredGuitars: [],
        sortedGuitars: [],
        guitars: mockGuitars,
        isLoading: false,

      },
      PROCESS: {
        modal: '',
      },
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <ProductScreen />
        </Router>
      </Provider>);

    expect(screen.getByText(/Начать поиск/i)).toBeInTheDocument();
    expect(screen.getByText(/Товар/i)).toBeInTheDocument();
    expect(screen.getByTestId(/breadcrumbs/i)).toBeInTheDocument();
    expect(screen.getByText(/Характеристики/i)).toBeInTheDocument();
    expect(screen.getByText(/Оставить отзыв/i)).toBeInTheDocument();
    expect(screen.getByText(/Информация/i)).toBeInTheDocument();
  });
});
