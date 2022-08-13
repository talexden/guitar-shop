import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import App from './app';
import {AppRoute} from '../../common/const';
import {render, screen} from '@testing-library/react';
import {mockGuitars} from '../../common/mock-guitars';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Application Routing', () => {
  it('should render MainScreen when user navigate to / during loading', () => {
    const store = mockStore({
      DATA: {isLoading: true},
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>);

    history.push(AppRoute.Main);

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

  it('should render MainScreen when user navigate to /', () => {
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
          <App />
        </Router>
      </Provider>);

    history.push(AppRoute.Catalog);

    expect(screen.getByText(/Каталог гитар/i)).toBeInTheDocument();
  });
});
