import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {AxiosInstance} from 'axios';
import {StateType} from './stateType';
import {Action} from 'redux';

export enum ActionType {
  CloseModal = '/closeModalReview',
  OpenModal = '/openModalReview',
  RedirectToRoute = '/redirectToRoute',
  SetFilter = '/setFilter',
  SetIsLoading = '/setIsLoading',
  SetIsLoaded = '/setIsLoaded',
  SetCartItem = '/setCartItem',
  SetSelectGuitar = '/setSelectGuitar',
  SetGuitars = '/setGuitars',
  SetCurrentGuitar = '/setCurrentGuitar',
  SetCommentCount = '/setCommentCount',
  SetCurrentNavigationLabel = '/setCurrentNavigationLabel',
  SetSearchKey = '/setSearchKey',
  SetSearchedGuitars = '/setSearchedGuitars',
  SetCheckboxStore = '/setCheckboxStore',
}

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, StateType, AxiosInstance, Action>;

export type ThunkAppDispatch = ThunkDispatch<StateType, AxiosInstance, Action>;

