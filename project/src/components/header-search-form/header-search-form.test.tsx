import {createMemoryHistory} from 'history';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {configureMockStore} from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import {mockGuitars} from '../../common/mock/mock-guitars';
import HeaderSearchForm from './header-search-form';

const history = createMemoryHistory();
const mockStore = configureMockStore();

describe('Component: HeaderSearchForm', () => {
  it('should render correctly', () => {
    const store = mockStore({
      'PROCESS': {
        searchedGuitars: [],
      },
      'DATA': {guitars: mockGuitars},
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <HeaderSearchForm />
        </Router>
      </Provider>);

    expect(screen.getByText(/Начать поиск/i)).toBeInTheDocument();
    expect(screen.getByTestId(/search-input/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Поиск/i)).toBeInTheDocument();
  });
});
