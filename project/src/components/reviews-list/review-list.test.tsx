import {createMemoryHistory} from 'history';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import ReviewsList from './reviews-list';

const history = createMemoryHistory();
describe('Component: ReviewsList', () => {
  it('should render correctly', () => {

    render(
      <Router history={history}>
        <ReviewsList />
      </Router>);

    expect(screen.getByText('Отзывы')).toBeInTheDocument();
    expect(screen.getByText(/Оставить отзыв/i)).toBeInTheDocument();
    expect(screen.getByText(/Достоинства:/i)).toBeInTheDocument();
    expect(screen.getByText(/Показать еще отзывы/i)).toBeInTheDocument();
    expect(screen.getByText(/Наверх/i)).toBeInTheDocument();
  });
});
