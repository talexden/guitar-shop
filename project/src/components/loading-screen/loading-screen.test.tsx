import {createMemoryHistory} from 'history';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import LoadingScreen from './loading-screen';

const history = createMemoryHistory();
describe('Component: LoadingScreen', () => {
  it('should render correctly', () => {

    render(
      <Router history={history}>
        <LoadingScreen />
      </Router>);


    expect(screen.getByText(/Loading .../i)).toBeInTheDocument();
  });
});
