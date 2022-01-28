import {combineReducers} from '@reduxjs/toolkit';
import {AppData} from './app-data/app-data';
import {AppProcess} from './app-process/app-process';


export enum NameSpace {
  data = 'DATA',
  process = 'PROCESS',
}

export const rootReducer = combineReducers({
  [NameSpace.data]: AppData,
  [NameSpace.process]: AppProcess,
});

export type RootState = ReturnType<typeof rootReducer>;
