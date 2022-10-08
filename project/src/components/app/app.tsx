import {Redirect, Route, Router as BrowserRouter, Switch} from 'react-router-dom';
import ScreenTemplate from '../screen-template/screen-template';
import ErrorScreen from '../error-screen/error-screen';
import browserHistory from '../../browser-history';
import {AppRoute, CURRENT_PAGE_INIT, ScreenTemplateTitle} from '../../common/const';
import ProductScreen from '../product-screen/product-screen';
import Catalog from '../catalog/catalog';
import CartScreen from '../cart-screen/cart-screen';

function App(): JSX.Element {
  return (
    <BrowserRouter history={browserHistory}>
      <Switch>
        <Route exact path={`${AppRoute.Catalog}:pageIdx`}>
          <ScreenTemplate title={ScreenTemplateTitle.Catalog}>
            <Catalog />
          </ScreenTemplate>
        </Route>
        <Route exact path={AppRoute.Catalog}>
          <Redirect to={`${AppRoute.Catalog}${CURRENT_PAGE_INIT}`} />
        </Route>
        <Route exact path={AppRoute.Main}>
          <Redirect to={AppRoute.Catalog} />
        </Route>
        <Route exact path={`${AppRoute.ProductInfo}/:guitarId`}>
          <ScreenTemplate title={ScreenTemplateTitle.Product}>
            <ProductScreen />
          </ScreenTemplate>
        </Route>
        <Route exact path={AppRoute.Cart}>
          <ScreenTemplate title={ScreenTemplateTitle.Cart}>
            <CartScreen />
          </ScreenTemplate>
        </Route>
        <Route>
          <ErrorScreen />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}


export default App;
