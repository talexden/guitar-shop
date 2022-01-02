import {createAction} from '@reduxjs/toolkit';
import {ActionType} from '../types/action';
import {Guitar} from '../types/state';


export const setGuitars = createAction(
  ActionType.SetGuitars,
  (guitars: Guitar[])=>(
    {payload: {guitars}}
  ));

export const setSortedGuitars = createAction(
  ActionType.SetSortedGuitars,
  (guitars: Guitar[])=>(
    {payload: {guitars}}
  ));

export const setIsLoading = createAction(ActionType.SetIsLoading);
export const setIsLoaded = createAction(ActionType.SetIsLoaded);
