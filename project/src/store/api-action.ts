import {Adapter} from '../components/adapter/adapter';
import {APIRoute} from '../common/const';
import {ThunkActionResult} from '../types/action';
import {setGuitars, setIsLoading, setSortedGuitars, setIsLoaded} from './action';

export const fetchGuitars = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try{
      dispatch(setIsLoading());
      const {data} = await api.get(APIRoute.Guitars);
      const guitars = data.map(Adapter.adaptToClient);
      dispatch(setGuitars(guitars));
      dispatch(setSortedGuitars(guitars));
      dispatch(setIsLoaded());
    } catch (error) {
      // alert(ErrorTexts.LoadQuestFailMessage);
    }
  };
