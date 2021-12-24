import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {AxiosInstance} from 'axios';
import {State} from './state';
import {Action} from 'redux';

export enum ActionType {
  SetGuitars = 'data/setGuitars',
  SetSortedGuitars = 'data/setSortedGuitars',
  RedirectToRoute = 'game/redirectToRoute',
}

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Action>;

export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Action>;

