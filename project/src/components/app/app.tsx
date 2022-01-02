import {Switch, Route, Router as BrowserRouter} from 'react-router-dom';
import MainScreen from '../main-screen/main-screen';
import ErrorScreen from '../error-screen/error-screen';
import browserHistory from '../../browser-history';
import {AppRoute} from '../../common/const';

function App(): JSX.Element {
  return (
    <BrowserRouter history={browserHistory}>
      <Switch>
        <Route exact path={AppRoute.Catalogue}>
          <MainScreen />
        </Route>
        <Route exact path={AppRoute.Main}>
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
