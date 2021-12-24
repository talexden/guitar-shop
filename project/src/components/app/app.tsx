import {Switch, Route, Router as BrowserRouter} from 'react-router-dom';
import MainScreen from '../main-screen/main-screen';
import ErrorScreen from '../error-screen/error-screen';
import browserHistory from '../../browser-history';
import {AppRoutes} from '../../const';

function App(): JSX.Element {
  return (
    <BrowserRouter history={browserHistory}>
      <Switch>
        <Route exact path={AppRoutes.Catalogue}>
          <MainScreen />
        </Route>
        <Route exact path={AppRoutes.Main}>
          <MainScreen />
        </Route>
        <Route>
          <ErrorScreen />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}


export default App;
