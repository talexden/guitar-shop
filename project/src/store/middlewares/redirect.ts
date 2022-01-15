import browserHistory from '../../browser-history';
import {Middleware} from 'redux';
import {StateType} from '../../types/stateType';
import {ActionType} from '../../types/action-type';

export const redirect: Middleware<unknown, StateType> =
  (_store) =>
    (next) =>
      (action) => {

        if (action.type === ActionType.RedirectToRoute) {
          browserHistory.push(action.payload);
        }

        return next(action);
      };
