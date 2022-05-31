import {Switch, Route, Router as BrowserRouter, Redirect} from 'react-router-dom';
import MainScreen from '../main-screen/main-screen';
import ErrorScreen from '../error-screen/error-screen';
import browserHistory from '../../browser-history';
import {AppRoute, CURRENT_PAGE_INIT} from '../../common/const';
import ProductScreen from '../product-screen/product-screen';

function App(): JSX.Element {
  return (
    <BrowserRouter history={browserHistory}>
      <Switch>
        <Route exact path={`${AppRoute.Catalog}:pageIdx`}>
          <MainScreen />
        </Route>
        <Route exact path={AppRoute.Catalog}>
          <Redirect to={`${AppRoute.Catalog}${CURRENT_PAGE_INIT}`} />
        </Route>
        <Route exact path={AppRoute.Main}>
          <Redirect to={AppRoute.Catalog} />
        </Route>
        <Route exact path={`${AppRoute.ProductInfo}/:guitarId`}>
          <ProductScreen />
        </Route>
        <Route>
          <ErrorScreen />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}


export default App;
