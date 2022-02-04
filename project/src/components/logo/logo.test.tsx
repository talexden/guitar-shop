import {createMemoryHistory} from 'history';
import {render, screen} from '@testing-library/react';
import {Route, Router, Switch} from 'react-router-dom';
import Logo from './logo';
import userEvent from '@testing-library/user-event';


const history = createMemoryHistory();
describe('Component: Logo', () => {
  it('should render correctly', () => {
    const styleClassName = 'logo__fake';

    render(
      <Router history={history}>
        <Logo className={styleClassName}/>
      </Router>);

    expect(screen.getByAltText(/Логотип/i)).toBeInTheDocument();
    expect(screen.getByRole('link')).toBeInTheDocument();
  });

  it('should redirect to root url when user clicked to link', () => {
    history.push('/fake');
    const styleClassName = 'logo__fake';

    render(
      <Router history={history}>
        <Switch>
          <Route path="/" exact>
            <h1>This is main page</h1>
          </Route>
          <Route>
            <Logo className={styleClassName}/>
          </Route>
        </Switch>
      </Router>);

    expect(screen.queryByText(/This is main page/i)).not.toBeInTheDocument();
    userEvent.click(screen.getByRole('link'));
    expect(screen.queryByText(/This is main page/i)).toBeInTheDocument();
  });
});
