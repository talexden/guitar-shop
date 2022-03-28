import {combineReducers} from '@reduxjs/toolkit';
import {AppProcess} from './app-process/app-process';
import {AppFilter} from './app-filter/app-filter';


export enum NameSpace {
  process = 'PROCESS',
  filter = 'FILTER',
}

export const rootReducer = combineReducers({
  [NameSpace.process]: AppProcess,
  [NameSpace.filter]: AppFilter,
});

export type RootState = ReturnType<typeof rootReducer>;
