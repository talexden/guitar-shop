import {createAction} from '@reduxjs/toolkit';
import {APIRoute, Modal, Quantity, SortDirect, SortKey} from '../common/const';
import {ActionType} from '../types/action-type';
import {GuitarType} from '../types/stateType';
import {CheckboxStoreType, PriceType} from './app-filter/app-filter';


export const closeModal = createAction(ActionType.CloseModal);

export const removeCardItem = createAction(
  ActionType.RemoveCardItem,
  (guitarId: number) => (
    {payload: guitarId}
  ));

export const redirectToRoute = createAction(
  ActionType.RedirectToRoute,
  (url: APIRoute | string) => (
    {payload: url}
  ));

export const addCartItem = createAction(ActionType.AddCartItem);

export const setCartItemQuantity = createAction(
  ActionType.SetCartItemQuantity,
  (guitarId: number, quantityCmd: Quantity, quantityCount: number | undefined)=>(
    {payload: {quantityCmd, quantityCount, guitarId}}
  ));


export const setGuitarForCart = createAction(
  ActionType.SetGuitarForCart,
  (guitar: GuitarType)=>(
    {payload: guitar}
  ));
export const setGuitars = createAction(
  ActionType.SetGuitars,
  (guitars: GuitarType[])=>(
    {payload: guitars}
  ));

export const setCurrentGuitar = createAction(
  ActionType.SetCurrentGuitar,
  (currentGuitar: GuitarType)=>(
    {payload: currentGuitar}
  ));

export const setCommentCount = createAction(
  ActionType.SetCommentCount,
  (commentCount: number)=>(
    {payload: commentCount}
  ));

export const setSearchedGuitars = createAction(
  ActionType.SetSearchedGuitars,
  (guitars: GuitarType[])=>(
    {payload: guitars}
  ));

export const setCurrentNavigationLabel = createAction(
  ActionType.SetCurrentNavigationLabel,
  (navigationLabel: string)=>(
    {payload: navigationLabel}
  ));

export const setSearchKey = createAction(
  ActionType.SetSearchKey,
  (searchKey: string)=>(
    {payload: searchKey}
  ));

export const setIsLoading = createAction(
  ActionType.SetIsLoading,
  (isLoading: boolean)=>(
    {payload: isLoading}
  ));

export const setIsCurrentGuitarLoading = createAction(
  ActionType.SetIsCurrentGuitarLoading,
  (isLoading: boolean)=>(
    {payload: isLoading}
  ));

export const setCheckboxStore = createAction(
  ActionType.SetCheckboxStore,
  (checkboxStore: CheckboxStoreType)=>(
    {payload: checkboxStore}
  ));

export type FilterType = {
  checkboxStore?: CheckboxStoreType,
  userPrice?: PriceType,
  isFilter?: boolean,
  sortKey?: SortKey,
  sortDirect?: SortDirect,
  currentPage?: number,
  locationSearch?: string,
  reset?: boolean,
}

export const setFilter = createAction(
  ActionType.SetFilter,
  (filter: FilterType)=>(
    {payload: filter}
  ));

export const openModal = createAction(
  ActionType.OpenModal,
  (modal: Modal) => ({payload: modal}));

