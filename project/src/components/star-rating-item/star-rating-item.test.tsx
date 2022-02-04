import {createMemoryHistory} from 'history';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import {Router} from 'react-router-dom';
import StarRatingItem from './star-rating-item';

const history = createMemoryHistory();

describe('Component: StarRatingItem', () => {
  it('should render correctly', () => {
    const starNumber = 2;
    const rating = 3;

    render(
      <Router history={history}>
        <StarRatingItem starNumber={starNumber} rating={rating}/>
      </Router>);

    const starSvg = screen.getByTestId('starSvg');

    expect(starSvg).toBeInTheDocument();
  });
});
