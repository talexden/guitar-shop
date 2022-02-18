import {combineReducers} from '@reduxjs/toolkit';
import {AppData} from './app-data/app-data';
import {AppProcess} from './app-process/app-process';
import {AppFilter} from './app-filter/app-filter';


export enum NameSpace {
  data = 'DATA',
  process = 'PROCESS',
  filter = 'FILTER',
}

export const rootReducer = combineReducers({
  [NameSpace.data]: AppData,
  [NameSpace.process]: AppProcess,
  [NameSpace.filter]: AppFilter,
});

export type RootState = ReturnType<typeof rootReducer>;
