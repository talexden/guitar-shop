import {createAction} from '@reduxjs/toolkit';
import {APIRoute, Modal, SortDirect, SortKey} from '../common/const';
import {ActionType} from '../types/action-type';
import {GuitarType} from '../types/stateType';
import {CheckboxStoreType, PriceType} from './app-filter/app-filter';


export const redirectToRoute = createAction(
  ActionType.RedirectToRoute,
  (url: APIRoute | string) => (
    {payload: url}
  ));

export const resetFilters = createAction(ActionType.ResetFilters);

export const setGuitars = createAction(
  ActionType.SetGuitars,
  (guitars: GuitarType[])=>(
    {payload: {guitars}}
  ));

export const setPaginationPages = createAction(
  ActionType.SetPaginationPages,
  (paginationPages: number[])=>(
    {payload: paginationPages}
  ));

export const setCurrentPage = createAction(
  ActionType.SetCurrentPage,
  (currentPage: number)=>(
    {payload: currentPage}
  ));

export const setCurrentGuitar = createAction(
  ActionType.SetCurrentGuitar,
  (currentGuitar: GuitarType | null)=>(
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

export const setSortKey = createAction(
  ActionType.SetSortKey,
  (sortKey: SortKey)=>(
    {payload: sortKey}
  ));

export const setSortDirect = createAction(
  ActionType.SetSortDirect,
  (sortDirect: SortDirect)=>(
    {payload: sortDirect}
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

export const setIsLoading = createAction(ActionType.SetIsLoading);
export const setIsLoaded = createAction(ActionType.SetIsLoaded);

export const setUserPrice = createAction(
  ActionType.SetUserPrice,
  (price: PriceType)=>(
    {payload: price}
  ));

export const setCheckboxStore = createAction(
  ActionType.SetCheckboxStore,
  (checkboxStore: CheckboxStoreType)=>(
    {payload: checkboxStore}
  ));

export const setSearchUrl = createAction(
  ActionType.SetSearchUrl,
  (searchUrl: string)=>(
    {payload: searchUrl}
  ));

export const closeModal = createAction(ActionType.CloseModal);
export const openModal = createAction(
  ActionType.OpenModal,
  (modal: Modal) => ({payload: modal}));

