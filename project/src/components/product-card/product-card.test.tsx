import {createMemoryHistory} from 'history';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import ProductCard from './product-card';
import {mockGuitar} from '../../common/mock-guitars';

const history = createMemoryHistory();
describe('Component: ProductCard', () => {
  it('should render correctly', () => {

    render(
      <Router history={history}>
        <ProductCard guitar={mockGuitar}/>
      </Router>);

    expect(screen.getByAltText(/CURT Z300 electric/i)).toBeInTheDocument();
    expect(screen.getByText(/Рейтинг:/i)).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText(/CURT Z300 Electric/i)).toBeInTheDocument();
    expect(screen.getByText(/Цена:/i)).toBeInTheDocument();
    expect(screen.getByText(/29 500/i)).toBeInTheDocument();
    expect(screen.getByText(/Подробнее/i)).toBeInTheDocument();
    expect(screen.getByText(/Купить/i)).toBeInTheDocument();
  });
});
