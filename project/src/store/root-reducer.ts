import {combineReducers} from '@reduxjs/toolkit';
import {appData} from './app-data/app-data';
import {appProcess} from './app-process/app-process';


export enum NameSpace {
  data = 'DATA',
  process = 'PROCESS',
}

export const rootReducer = combineReducers({
  [NameSpace.data]: appData,
  [NameSpace.process]: appProcess,
});

export type RootState = ReturnType<typeof rootReducer>;
