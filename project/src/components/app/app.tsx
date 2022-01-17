import {Switch, Route, Router as BrowserRouter, Redirect} from 'react-router-dom';
import MainScreen from '../main-screen/main-screen';
import ErrorScreen from '../error-screen/error-screen';
import browserHistory from '../../browser-history';
import {AppRoute} from '../../common/const';

function App(): JSX.Element {
  return (
    <BrowserRouter history={browserHistory}>
      <Switch>
        <Route exact path={`${AppRoute.Catalog}:pageIdx`}>
          <MainScreen />
        </Route>
        <Route exact path={AppRoute.Main}>
          <Redirect to={`${AppRoute.Catalog}1`} />
        </Route>
        <Route>
          <ErrorScreen />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}


export default App;
