import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {AxiosInstance} from 'axios';
import {StateType} from './stateType';
import {Action} from 'redux';

export enum ActionType {
  AddCartItem = '/addCartItem',
  CloseModal = '/closeModalReview',
  RedirectToRoute = '/redirectToRoute',
  RemoveCardItem = '/removeCardItem',
  SetCartItemQuantity = '/setCartItemQuantity',
  SetFilter = '/setFilter',
  SetIsLoading = '/setIsLoading',
  SetIsCurrentGuitarLoading = '/setIsCurrentGuitarLoading',
  SetGuitarForCart = '/setGuitarForCart',
  SetGuitars = '/setGuitars',
  SetCurrentGuitar = '/setCurrentGuitar',
  SetCommentCount = '/setCommentCount',
  SetCurrentNavigationLabel = '/setCurrentNavigationLabel',
  SetSearchKey = '/setSearchKey',
  SetSearchedGuitars = '/setSearchedGuitars',
  SetCheckboxStore = '/setCheckboxStore',
  OpenModal = '/openModalReview',
}

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, StateType, AxiosInstance, Action>;

export type ThunkAppDispatch = ThunkDispatch<StateType, AxiosInstance, Action>;

