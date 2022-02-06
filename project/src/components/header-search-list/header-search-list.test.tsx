import {createMemoryHistory} from 'history';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {configureMockStore} from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import {mockGuitar, mockGuitars} from '../../common/mock-guitars';
import HeaderSearchList from './header-search-list';

const history = createMemoryHistory();
const mockStore = configureMockStore();

describe('Component: HeaderSearchList', () => {
  it('should render correctly', () => {
    const store = mockStore({
      'PROCESS': {searchedGuitars: [mockGuitar]},
      'DATA': {guitars: mockGuitars},
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <HeaderSearchList />
        </Router>
      </Provider>);

    expect(screen.getByText(/CURT Z300/i)).toBeInTheDocument();
  });
});
