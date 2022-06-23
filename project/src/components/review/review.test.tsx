import {createMemoryHistory} from 'history';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import Review from './review';
import {mockGuitar} from '../../common/mock-guitars';


const history = createMemoryHistory();
describe('Component: ReviewsList', () => {
  it('should render correctly', () => {

    render(
      <Router history={history}>
        <Review reviewComment={mockGuitar.comments[1]}/>
      </Router>);

    expect(screen.getByText(/Рейтинг:/i)).toBeInTheDocument();
    expect(screen.getByText(/Достоинства:/i)).toBeInTheDocument();
    expect(screen.getByText(/Хороший корпус, чистый звук, стурны хорошего качества/i)).toBeInTheDocument();
    expect(screen.getByText(/Недостатки:/i)).toBeInTheDocument();
    expect(screen.getByText(/Тугие колонки/i)).toBeInTheDocument();
    expect(screen.getByText(/Комментарий:/i)).toBeInTheDocument();
    expect(screen.getByText(/У гитары отличный цвет, хороше дерево. Тяжелая, в компдлекте неть чехла и ремня./i)).toBeInTheDocument();
  });
});
