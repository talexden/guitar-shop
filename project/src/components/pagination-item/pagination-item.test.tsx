import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import {render, screen} from '@testing-library/react';
import PaginationItem from './pagination-item';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: PaginationItem', () => {
  it('should render pagination-item numbers correctly', () => {
    const store = mockStore({
      PROCESS: {
        currentPage: 1,
      },
    });

    const isActive = false;
    const pageIdx = 23;

    render(
      <Provider store={store}>
        <Router history={history}>
          <PaginationItem isActive={isActive} pageIdx={pageIdx}/>
        </Router>
      </Provider>);

    expect(screen.getByText(/23/i)).toBeInTheDocument();
  });
});
