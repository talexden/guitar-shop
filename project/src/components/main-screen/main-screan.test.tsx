import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import {render, screen} from '@testing-library/react';
import {mockGuitar, mockGuitars} from '../../common/mock/mock-guitars';
import MainScreen from './main-screen';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: CatalogSort', () => {
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
        price: {
          userPrice: {
            priceMin: '',
            priceMax: '',
          },
          checkboxPrice: {
            priceMin: '',
            priceMax: '',
          },
        },
      },
      PROCESS: {
        modal: '',
      },
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <MainScreen />
        </Router>
      </Provider>);

    expect(screen.getByText(/Начать поиск/i)).toBeInTheDocument();
    expect(screen.getByTestId(/breadcrumbs/i)).toBeInTheDocument();
    expect(screen.getByText(/Каталог гитар/i)).toBeInTheDocument();
    expect(screen.getByText(/Информация/i)).toBeInTheDocument();
  });
});
