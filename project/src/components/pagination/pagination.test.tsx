import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import {render, screen} from '@testing-library/react';
import {mockGuitarsSortedByPages} from '../../common/mock/mock-guitars';
import Pagination from './pagination';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: Pagination', () => {
  it('should render pagination numbers correctly', () => {
    const store = mockStore({
      PROCESS: {
        guitarsByPages: mockGuitarsSortedByPages,
        currentPage: 1,
        paginationPages: [1, 2, 3],
      },
    });
    render(
      <Provider store={store}>
        <Router history={history}>
          <Pagination />
        </Router>
      </Provider>);

    expect(screen.getByText(/1/i)).toBeInTheDocument();
    expect(screen.getByText(/2/i)).toBeInTheDocument();
    expect(screen.getByText(/3/i)).toBeInTheDocument();
  });
  it('should render navigation correctly with currentPage 1', () => {
    const store = mockStore({
      PROCESS: {
        guitarsByPages: mockGuitarsSortedByPages,
        currentPage: 1,
        paginationPages: [1, 2, 3],
      },
    });
    render(
      <Provider store={store}>
        <Router history={history}>
          <Pagination />
        </Router>
      </Provider>);

    expect(screen.queryByText(/Назад/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Далее/i)).toBeInTheDocument();
  });
  it('should render navigation correctly with currentPage 2', () => {
    const store = mockStore({
      PROCESS: {
        guitarsByPages: mockGuitarsSortedByPages,
        currentPage: 2,
        paginationPages: [1, 2, 3],
      },
    });
    render(
      <Provider store={store}>
        <Router history={history}>
          <Pagination />
        </Router>
      </Provider>);

    expect(screen.getByText(/Назад/i)).toBeInTheDocument();
    expect(screen.getByText(/Далее/i)).toBeInTheDocument();
  });
  it('should render navigation correctly with currentPage 3', () => {
    const store = mockStore({
      PROCESS: {
        guitarsByPages: mockGuitarsSortedByPages,
        currentPage: 3,
        paginationPages: [1, 2, 3],
      },
    });
    render(
      <Provider store={store}>
        <Router history={history}>
          <Pagination />
        </Router>
      </Provider>);

    expect(screen.getByText(/Назад/i)).toBeInTheDocument();
    expect(screen.queryByText(/Далее/i)).not.toBeInTheDocument();
  });
});
