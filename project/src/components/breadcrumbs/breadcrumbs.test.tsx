import {createMemoryHistory} from 'history';
import {render, screen} from '@testing-library/react';
import {Route, Router, Switch} from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import Breadcrumbs from './breadcrumbs';
import {AppRoute, NavigationLabel} from '../../common/const';

const history = createMemoryHistory();
describe('Component: Breadcrumbs', () => {
  it('should render correctly', () => {
    const GOOD = 'Товар';

    render(
      <Router history={history}>
        <Breadcrumbs breadcrumbs={GOOD}/>
      </Router>);


    expect(screen.getByRole('link', {name: NavigationLabel.Main})).toBeInTheDocument();
    expect(screen.getByRole('link', {name: NavigationLabel.Catalog})).toBeInTheDocument();
    expect(screen.getByRole('link', {name: NavigationLabel.About})).toBeInTheDocument();
  });

  it('should redirect to root url when user clicked to link', () => {
    const GOOD = 'Товар';
    render(
      <Router history={history}>
        <Switch>
          <Route path={AppRoute.Main} exact>
            <h1>This is main page</h1>
          </Route>
          <Route path={AppRoute.Catalog} exact>
            <h1>This is catalog page</h1>
          </Route>
          <Route path={AppRoute.About} exact>
            <h1>This is about page</h1>
          </Route>
          <Route>
            <Breadcrumbs breadcrumbs={GOOD}/>
          </Route>
        </Switch>
      </Router>);

    history.push('/fake');
    expect(screen.queryByText(/This is main page/i)).not.toBeInTheDocument();
    userEvent.click(screen.getByRole('link', {name: NavigationLabel.Main}));
    expect(screen.getByText(/This is main page/i)).toBeInTheDocument();
    history.push('/fake');
    expect(screen.queryByText(/This is catalog page/i)).not.toBeInTheDocument();
    userEvent.click(screen.getByRole('link', {name: NavigationLabel.Catalog}));
    expect(screen.getByText(/This is catalog page/i)).toBeInTheDocument();
    history.push('/fake');
    expect(screen.queryByText(/This is about page/i)).not.toBeInTheDocument();
    userEvent.click(screen.getByRole('link', {name: NavigationLabel.About}));
    expect(screen.getByText(/This is about page/i)).toBeInTheDocument();
  });
});
