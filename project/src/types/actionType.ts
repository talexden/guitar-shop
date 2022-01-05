import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {AxiosInstance} from 'axios';
import {StateType} from './stateType';
import {Action} from 'redux';

export enum ActionType {
  SetIsLoading = 'data/setIsLoading',
  SetIsLoaded = 'data/setIsLoaded',
  SetGuitars = 'data/setGuitars',
  SetGuitarById = 'app/setGuitarById',
  SetSortedGuitars = 'data/setSortedGuitars',
  RedirectToRoute = 'app/redirectToRoute',
  SetSortKey = 'app/setSortKey',
  SetSortDirect = 'app/setSortDirect',
  SetSearchedGuitars = 'app/setSearchedGuitars',
}

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, StateType, AxiosInstance, Action>;

export type ThunkAppDispatch = ThunkDispatch<StateType, AxiosInstance, Action>;

