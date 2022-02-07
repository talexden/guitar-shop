import {createMemoryHistory} from 'history';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import ProductContainer from './product-container';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import {mockGuitar} from '../../common/mock-guitars';

const history = createMemoryHistory();
const mockStore = configureMockStore();

describe('Component: ProductContainer', () => {
  it('should render correctly', () => {
    const store = mockStore({
      PROCESS: {currentGuitar: mockGuitar},
    });
    render(
      <Provider store={store}>
        <Router history={history}>
          <ProductContainer />
        </Router>
      </Provider>);

    expect(screen.getByText(/CURT Z300/i)).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText(/Характеристики/i)).toBeInTheDocument();
    expect(screen.getByText(/Характеристики/i)).toBeInTheDocument();
    expect(screen.getByText(/Описание/i)).toBeInTheDocument();
    expect(screen.getByText(/Артикул:/i)).toBeInTheDocument();
    expect(screen.getByText('TK129049')).toBeInTheDocument();
    expect(screen.getByText(/Тип:/i)).toBeInTheDocument();
    expect(screen.getByText(/electric/i)).toBeInTheDocument();
    expect(screen.getByText(/Количество струн:/i)).toBeInTheDocument();
    expect(screen.getByText('7 струнная')).toBeInTheDocument();
    expect(screen.getByText(/Эргономичность гитары и качество сборки являются, пожалуй, её главными преимуществами. Идеальное расположение в руках музыканта дополняется прочностью конструкции из клёна./i)).toBeInTheDocument();
    expect(screen.getByText(/Цена:/i)).toBeInTheDocument();
    expect(screen.getByText(/29 500/i)).toBeInTheDocument();
    expect(screen.getByText(/Добавить в корзину/i)).toBeInTheDocument();

  });

  it('should render correctly with loading', () => {
    const store = mockStore({
      PROCESS: {currentGuitar: null},
    });
    render(
      <Provider store={store}>
        <Router history={history}>
          <ProductContainer />
        </Router>
      </Provider>);

    expect(screen.getByText(/Loading .../i)).toBeInTheDocument();
  });
});
