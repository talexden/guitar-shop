import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {Route, Router, Switch} from 'react-router-dom';
import ErrorScreen from './error-screen';
import {createMemoryHistory} from 'history';

const history = createMemoryHistory();

describe('Component: ErrorScreen', () => {
  it('should render correctly', () => {
    render(
      <Router history={history}>
        <ErrorScreen />
      </Router>);

    expect(screen.getByText(/404 Not Found/i)).toBeInTheDocument();
    expect(screen.getByText(/Перейти на главную страницу/i)).toBeInTheDocument();
    expect(screen.getByRole('link')).toBeInTheDocument();
  });

  it('should redirect to root url when user clicked to link', () => {
    history.push('/fake');

    render(
      <Router history={history}>
        <Switch>
          <Route path="/" exact>
            <h1>This is main page</h1>
          </Route>
          <Route>
            <ErrorScreen />
          </Route>
        </Switch>
      </Router>);

    expect(screen.queryByText(/This is main page/i)).not.toBeInTheDocument();
    userEvent.click(screen.getByRole('link'));
    expect(screen.getByText(/This is main page/i)).toBeInTheDocument();
  });
});
