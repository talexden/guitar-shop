import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import {render, screen} from '@testing-library/react';
import PaginationNavigation from './pagination-navigation';

const mockStore = configureMockStore();
const history = createMemoryHistory();

const pageIdx = 23;
const fakeNavigation = {
  label: 'fakeLabel',
  id: 'fakeId',
  navigationClass: 'fakeClass',
};

describe('Component: PaginationNavigation', () => {
  it('should render navigation correctly', () => {
    const store = mockStore({
      PROCESS: {
        currentPage: 1,
      },
    });
    render(
      <Provider store={store}>
        <Router history={history}>
          <PaginationNavigation navigation={fakeNavigation} pageIdx={pageIdx}/>
        </Router>
      </Provider>);

    expect(screen.getByText(/fakeLabel/i)).toBeInTheDocument();
  });

});
