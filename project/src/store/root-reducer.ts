import {combineReducers} from '@reduxjs/toolkit';
import {AppFilter} from './app-filter/app-filter';
import {AppProcess} from './app-process/app-process';
import {AppCart} from './app-cart/app-cart';


export enum NameSpace {
  Cart = 'CART',
  Filter = 'FILTER',
  Process = 'PROCESS',
}

export const rootReducer = combineReducers({
  [NameSpace.Cart]: AppCart,
  [NameSpace.Filter]: AppFilter,
  [NameSpace.Process]: AppProcess,
});

export type RootState = ReturnType<typeof rootReducer>;
