import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {AxiosInstance} from 'axios';
import {StateType} from './stateType';
import {Action} from 'redux';

export enum ActionType {
  SetIsLoading = 'data/setIsLoading',
  SetIsLoaded = 'data/setIsLoaded',
  SetGuitars = 'data/setGuitars',
  SetFilteredGuitars = 'app/setFilteredGuitars',
  SetSortedGuitars = 'app/setSortedGuitars',
  SetGuitarsByPages = 'app/setGuitarsByPages',
  SetPaginationPages = 'app/setPaginationPages',
  SetCurrentGuitar = 'app/setCurrentGuitar',
  SetCurrentPage = 'app/setCurrentPage',
  SetSortKey = 'app/setSortKey',
  SetSortDirect = 'app/setSortDirect',
  SetCurrentNavigationLabel = 'app/setCurrentNavigationLabel',
  SetSearchKey = 'app/setSearchKey',
  SetSearchedGuitars = 'app/setSearchedGuitars',
  RedirectToRoute = 'route/redirectToRoute',
  SetCurrentPrice = 'filter/setCurrentPrice',
  SetFilteredPrice = 'filter/setFilteredPrice',
  SetCheckboxStore = 'filter/setCheckboxStore',
  SetGuitarStrings = 'filter/setGuitarStrings',
  SetGuitarsFilteredByCheckbox = 'filter/setGuitarsFilteredByCheckbox',
}

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, StateType, AxiosInstance, Action>;

export type ThunkAppDispatch = ThunkDispatch<StateType, AxiosInstance, Action>;

