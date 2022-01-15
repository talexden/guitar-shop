import {toast} from 'react-toastify';
import {mockGuitars} from '../common/mock-guitars';
import {Adapter} from '../components/adapter/adapter';
import {APIRoute, ErrorTexts} from '../common/const';
import {ThunkActionResult} from '../types/action-type';
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
      dispatch(setGuitars(mockGuitars)); // моки, удалить
      dispatch(setIsLoaded()); // моки, удалить
      toast.info(ErrorTexts.LoadGuitarsFailMessage);
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
      toast.info(ErrorTexts.LoadGuitarsFailMessage);
    }
  };
