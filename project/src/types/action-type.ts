import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {AxiosInstance} from 'axios';
import {StateType} from './stateType';
import {Action} from 'redux';

export enum ActionType {
  SetIsLoading = 'data/setIsLoading',
  SetIsLoaded = 'data/setIsLoaded',
  SetGuitars = 'data/setGuitars',
  SetFilteredGuitars = 'app/setFilteredGuitars',
  SetGuitarById = 'app/setGuitarById',
  SetSortedGuitars = 'app/setSortedGuitars',
  SetGuitarsByPages = 'app/setGuitarsByPages',
  SetPaginationPages = 'app/setPaginationPages',
  SetCurrentPage = 'app/setCurrentPage',
  RedirectToRoute = 'app/redirectToRoute',
  SetSortKey = 'app/setSortKey',
  SetSortDirect = 'app/setSortDirect',
  SetSearchedGuitars = 'app/setSearchedGuitars',
}

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, StateType, AxiosInstance, Action>;

export type ThunkAppDispatch = ThunkDispatch<StateType, AxiosInstance, Action>;

