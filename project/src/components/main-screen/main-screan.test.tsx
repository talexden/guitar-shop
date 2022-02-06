import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import {render, screen} from '@testing-library/react';
import {mockGuitars} from '../../common/mock-guitars';
import MainScreen from './main-screen';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: CatalogSort', () => {
  it('should render correctly', () => {
    const store = mockStore({
      PROCESS: {
        searchedGuitars: [],
        guitarsByPages: [],
        currentPage: 1,
        paginationPages: [],
        filteredGuitars: [],
        sortedGuitars: [],
      },
      DATA: {
        guitars: mockGuitars,
        isLoading: false,
      },
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <MainScreen />
        </Router>
      </Provider>);

    expect(screen.getByText(/Начать поиск/i)).toBeInTheDocument();
    expect(screen.getByText(/Каталог гитар/i)).toBeInTheDocument();
    expect(screen.getByText(/Информация/i)).toBeInTheDocument();
  });
});
