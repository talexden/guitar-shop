import React from 'react';
import ReactDOM from 'react-dom';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import App from './components/app/app';
import {createAPI} from './services/api';
import {fetchGuitars} from './store/api-action';
import {redirect} from './store/middlewares/redirect';
import {rootReducer} from './store/root-reducer';
import {configureStore} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';


const api = createAPI();

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }).concat(redirect),
});

store.dispatch(fetchGuitars());

ReactDOM.render(
  <React.StrictMode>
    <Provider store = {store}>
      <div className="wrapper">
        <ToastContainer />
        <App />
      </div>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
