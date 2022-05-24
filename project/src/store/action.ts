import {createAction} from '@reduxjs/toolkit';
import {APIRoute, SortDirect, SortKey} from '../common/const';
import {ActionType} from '../types/action-type';
import {GuitarType} from '../types/stateType';
import {CheckboxStoreType, GuitarStringsType, PriceStoreType} from './app-filter/app-filter';


export const redirectToRoute = createAction(
  ActionType.RedirectToRoute,
  (url: APIRoute | string) => (
    {payload: url}
  ));

export const setGuitars = createAction(
  ActionType.SetGuitars,
  (guitars: GuitarType[])=>(
    {payload: {guitars}}
  ));

export const setFilteredGuitars = createAction(
  ActionType.SetFilteredGuitars,
  (guitars: GuitarType[])=>(
    {payload: guitars}
  ));

export const setSortedGuitars = createAction(
  ActionType.SetSortedGuitars,
  (guitars: GuitarType[])=>(
    {payload: guitars}
  ));

export const setGuitarsByPages = createAction(
  ActionType.SetGuitarsByPages,
  (guitarsByPages: GuitarType[][])=>(
    {payload: guitarsByPages}
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


export const setRedirectUrl = createAction(
  ActionType.SetRedirectUrl,
  (redirectUrl: string)=>(
    {payload: redirectUrl}
  ));

export const setCurrentGuitar = createAction(
  ActionType.SetCurrentGuitar,
  (currentGuitar: GuitarType)=>(
    {payload: currentGuitar}
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
  (price: PriceStoreType)=>(
    {payload: price}
  ));

export const setCheckboxStore = createAction(
  ActionType.SetCheckboxStore,
  (checkboxStore: CheckboxStoreType)=>(
    {payload: checkboxStore}
  ));

export const setCheckboxPrice = createAction(
  ActionType.SetCheckboxPrice,
  (correctedCheckboxState: CheckboxStoreType)=>(
    {payload: correctedCheckboxState}
  ));

export const setGuitarStrings = createAction(
  ActionType.SetGuitarStrings,
  (guitarStrings: GuitarStringsType)=>(
    {payload: guitarStrings}
  ));

export const setSearchUrl = createAction(
  ActionType.SetSearchUrl,
  (searchUrl: string)=>(
    {payload: searchUrl}
  ));
