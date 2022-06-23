import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {AxiosInstance} from 'axios';
import {StateType} from './stateType';
import {Action} from 'redux';

export enum ActionType {
  SetIsLoading = '/setIsLoading',
  SetIsLoaded = '/setIsLoaded',
  SetGuitars = '/setGuitars',
  SetFilteredGuitars = '/setFilteredGuitars',
  SetSortedGuitars = '/setSortedGuitars',
  SetGuitarsByPages = '/setGuitarsByPages',
  SetPaginationPages = '/setPaginationPages',
  SetCurrentGuitar = '/setCurrentGuitar',
  SetCommentCount = '/setCommentCount',
  SetCurrentPage = '/setCurrentPage',
  SetRedirectUrl = '/setRedirectUrl',
  SetSortKey = '/setSortKey',
  SetSortDirect = '/setSortDirect',
  SetCurrentNavigationLabel = '/setCurrentNavigationLabel',
  SetSearchKey = '/setSearchKey',
  SetSearchedGuitars = '/setSearchedGuitars',
  RedirectToRoute = '/redirectToRoute',
  SetUserPrice = '/setUserPrice',
  SetCheckboxStore = '/setCheckboxStore',
  SetCheckboxPrice = '/setCheckboxPrice',
  SetGuitarStrings = '/setGuitarStrings',
  SetSearchUrl = '/setSearchUrl',
}

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, StateType, AxiosInstance, Action>;

export type ThunkAppDispatch = ThunkDispatch<StateType, AxiosInstance, Action>;

