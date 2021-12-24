import {APIRoute} from '../const';
import {ThunkActionResult} from '../types/action';
import {setGuitars, setSortedGuitars} from './action';

export const fetchGuitars = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try{
      const {data} = await api.get(APIRoute.Guitars);
      dispatch(setGuitars(data));
      dispatch(setSortedGuitars(data));
    } catch (error) {
      // toast.warn(ErrorTexts.LoadQuestFailMessage);
    }
  };
