import {combineReducers} from '@reduxjs/toolkit';
import {AppFilter} from './app-filter/app-filter';


export enum NameSpace {
  filter = 'FILTER',
}

export const rootReducer = combineReducers({
  [NameSpace.filter]: AppFilter,
});

export type RootState = ReturnType<typeof rootReducer>;
