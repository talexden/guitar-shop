import { configureMockStore } from "@jedmao/redux-mock-store";
import { createMemoryHistory } from "history";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import App from './app';
import {AppRoute} from '../../common/const';
import {render, screen} from '@testing-library/react';

const mockStore = configureMockStore();


const store = mockStore({
  DATA: {isLoading: true},
});

const history = createMemoryHistory();
const fakeApp = (
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>
);

describe('Application Routing', () => {
  it('should render "MainScreen" when user navigate to "/"', () => {
    history.push(AppRoute.Main);
    render(fakeApp);

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

  it('should render "MainScreen" when user navigate to "/page1"', () => {
    history.push(AppRoute.Catalog);
    render(fakeApp);

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });
});
