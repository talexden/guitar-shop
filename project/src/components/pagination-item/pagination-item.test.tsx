import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import {render, screen} from '@testing-library/react';
import PaginationItem from './pagination-item';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: PaginationItem', () => {
  const PaginationNav = Object.freeze({
    PageNumber: {
      navigationClass: '',
      label: 'pageNumber',
      id: 'pageNumber',
    },
    Next: {
      label: 'Далее',
      id: 'pageNext',
      navigationClass: ' pagination__page--next',
    },
    Previous: {
      label: 'Назад',
      id: 'pagePrev',
      navigationClass: ' pagination__page--prev',
    },
  });
  const store = mockStore({
    PROCESS: {
      currentPage: 1,
    },
  });
  const isActive = false;
  describe('Component: PaginationItem as PageNumber', () => {
    it('should render pagination-item textContent correctly', () => {
      const pageIdx = 23;

      render(
        <Provider store={store}>
          <Router history={history}>
            <PaginationItem isActive={isActive} pageIdx={pageIdx} paginationNav={PaginationNav.PageNumber}/>
          </Router>
        </Provider>);

      expect(screen.getByText(/23/i)).toBeInTheDocument();
    });
  });

  describe('Component: PaginationItem as Next', () => {
    it('should render pagination-item textContent correctly', () => {
      const pageIdx = 23;

      render(
        <Provider store={store}>
          <Router history={history}>
            <PaginationItem isActive={isActive} pageIdx={pageIdx} paginationNav={PaginationNav.Next}/>
          </Router>
        </Provider>);

      expect(screen.getByText(/Далее/i)).toBeInTheDocument();
    });
  });

  describe('Component: PaginationItem as Previous', () => {
    it('should render pagination-item textContent correctly', () => {
      const pageIdx = 23;

      render(
        <Provider store={store}>
          <Router history={history}>
            <PaginationItem isActive={isActive} pageIdx={pageIdx} paginationNav={PaginationNav.Previous}/>
          </Router>
        </Provider>);

      expect(screen.getByText(/Назад/i)).toBeInTheDocument();
    });
  });
});
