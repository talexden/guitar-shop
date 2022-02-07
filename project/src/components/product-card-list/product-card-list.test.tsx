import {createMemoryHistory} from 'history';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {mockGuitars, mockGuitarsSortedByPages} from '../../common/mock-guitars';
import ProductCardList from './product-card-list';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: ProductCardList', () => {
  it('should render correctly', () => {
    const store = mockStore({
      PROCESS: {
        guitarsByPages: mockGuitarsSortedByPages,
        sortedGuitars: mockGuitars,
        currentPage: 1,
      },
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <ProductCardList />
        </Router>
      </Provider>);


    expect(screen.getByAltText(/Честер Bass/i)).toBeInTheDocument();
  });
});
