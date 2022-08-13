import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import Footer from './footer';

const history = createMemoryHistory();

describe('Component: Footer', () => {
  it('should render correctly', () => {
    render(
      <Router history={history}>
        <Footer />
      </Router>);

    expect(screen.getByAltText(/Логотип/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/facebook/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/instagram/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/twitter/i)).toBeInTheDocument();
    expect(screen.getByText(/О нас/i)).toBeInTheDocument();
    expect(screen.getByText(/Магазин гитар/i)).toBeInTheDocument();
    expect(screen.getByText(/Информация/i)).toBeInTheDocument();
    expect(screen.getByText(/Где купить/i)).toBeInTheDocument();
    expect(screen.getByText(/Блог/i)).toBeInTheDocument();
    expect(screen.getByText(/Вопрос - ответ/i)).toBeInTheDocument();
    expect(screen.getByText(/Возврат/i)).toBeInTheDocument();
    expect(screen.getByText(/Сервис-центры/i)).toBeInTheDocument();
    expect(screen.getByText(/Контакты/i)).toBeInTheDocument();
    expect(screen.getByText(/г. Санкт-Петербург/i)).toBeInTheDocument();
    expect(screen.getByText(/8-812-500-50-50/i)).toBeInTheDocument();
    expect(screen.getByText(/Режим работы:/i)).toBeInTheDocument();
    expect(screen.getByText(/с 11:00 до 20:00/i)).toBeInTheDocument();
    expect(screen.getByText(/без выходных/i)).toBeInTheDocument();
  });

  // it('should redirect to root url when user clicked to link', () => {
  //   history.push('/fake');
  //
  //   render(
  //     <Router history={history}>
  //       <Switch>
  //         <Route path='/' exact>
  //           <h1>This is main page</h1>
  //         </Route>
  //         <Route>
  //           <ErrorScreen />
  //         </Route>
  //       </Switch>
  //     </Router>);
  //
  //   expect(screen.queryByText(/This is main page/i)).not.toBeInTheDocument();
  //   userEvent.click(screen.getByRole('link'));
  //   expect(screen.getByText(/This is main page/i)).toBeInTheDocument();
  // });
});
