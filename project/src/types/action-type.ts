import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {AxiosInstance} from 'axios';
import {StateType} from './stateType';
import {Action} from 'redux';

export enum ActionType {
  RedirectToRoute = '/redirectToRoute',
  ResetFilters = '/resetFilters',
  SetIsLoading = '/setIsLoading',
  SetIsLoaded = '/setIsLoaded',
  SetCartItem = '/setCartItem',
  SetSelectGuitar = '/setSelectGuitar',
  SetGuitars = '/setGuitars',
  SetPaginationPages = '/setPaginationPages',
  SetCurrentGuitar = '/setCurrentGuitar',
  SetCommentCount = '/setCommentCount',
  SetCurrentPage = '/setCurrentPage',
  SetSortKey = '/setSortKey',
  SetSortDirect = '/setSortDirect',
  SetCurrentNavigationLabel = '/setCurrentNavigationLabel',
  SetSearchKey = '/setSearchKey',
  SetSearchedGuitars = '/setSearchedGuitars',
  SetUserPrice = '/setUserPrice',
  SetCheckboxStore = '/setCheckboxStore',
  SetSearchUrl = '/setSearchUrl',
  OpenModal = '/openModalReview',
  CloseModal = '/closeModalReview',
}

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, StateType, AxiosInstance, Action>;

export type ThunkAppDispatch = ThunkDispatch<StateType, AxiosInstance, Action>;

