import {createMemoryHistory} from 'history';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {configureMockStore} from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import {mockGuitars} from '../../common/mock/mock-guitars';
import HeaderSearchItem from './header-search-item';

const history = createMemoryHistory();
const mockStore = configureMockStore();

describe('Component: HeaderFormSearchItem', () => {
  it('should render correctly', () => {
    const store = mockStore({
      'DATA': {guitars: mockGuitars},
    });

    const guitarName =  'Appolo';
    const guitarId = 2;


    render(
      <Provider store={store}>
        <Router history={history}>
          <HeaderSearchItem
            guitarName={guitarName}
            guitarId={guitarId}
          />
        </Router>
      </Provider>);

    expect(screen.getByText('Appolo')).toBeInTheDocument();
  });
});
