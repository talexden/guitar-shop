import {mockGuitars} from '../common/mock-guitars';
import {Adapter} from '../components/adapter/adapter';
import {APIRoute} from '../common/const';
import {ThunkActionResult} from '../types/actionType';
import {setGuitars, setIsLoading, setIsLoaded, setGuitarById} from './action';

export const fetchGuitars = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try{
      dispatch(setIsLoading());
      const {data} = await api.get(APIRoute.Guitars);
      const guitars = data.map(Adapter.adaptToClient);
      dispatch(setGuitars(guitars));
      dispatch(setIsLoaded());
    } catch (error) {
      dispatch(setGuitars(mockGuitars));
      dispatch(setIsLoaded());
      // alert(ErrorTexts.LoadQuestFailMessage);
    }
  };

export const fetchGuitarById = (guitarId: number): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try{
      dispatch(setIsLoading());
      const {data} = await api.get(`${APIRoute.Guitars}/${guitarId}`);
      const guitar = data.map(Adapter.adaptToClient);
      dispatch(setGuitarById(guitar));
      dispatch(setIsLoaded());
    } catch (error) {
      // alert(ErrorTexts.LoadQuestFailMessage);
    }
  };
