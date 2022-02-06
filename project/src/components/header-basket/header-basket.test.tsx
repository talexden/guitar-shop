import {createMemoryHistory} from 'history';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import HeaderCart from './header-cart';

const history = createMemoryHistory();

describe('Component: HeaderBasket', () => {
  it('should render correctly', () => {

    render(
      <Router history={history}>
        <HeaderCart />
      </Router>);

    expect(screen.getByText(/Перейти в корзину/i)).toBeInTheDocument();
    expect(screen.getByTestId('basket-count')).toBeInTheDocument();
  });
});
