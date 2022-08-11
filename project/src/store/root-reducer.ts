import {combineReducers} from '@reduxjs/toolkit';
import {AppFilter} from './app-filter/app-filter';
import {AppProcess} from './app-process/app-process';


export enum NameSpace {
  filter = 'FILTER',
  process = 'PROCESS',
}

export const rootReducer = combineReducers({
  [NameSpace.filter]: AppFilter,
  [NameSpace.process]: AppProcess,
});

export type RootState = ReturnType<typeof rootReducer>;
