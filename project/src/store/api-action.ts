import {toast} from 'react-toastify';
import {mockGuitarsLongArray} from '../common/mock-guitars';
import {Adapter} from '../components/adapter/adapter';
import {APIRoute, ErrorTexts} from '../common/const';
import {ThunkActionResult} from '../types/action-type';
import {setCurrentGuitar, setGuitars, setIsLoaded, setIsLoading} from './action';

export const fetchGuitars = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try{
      dispatch(setIsLoading());
      const {data} = await api.get(`${APIRoute.Guitars}?_embed=comments`);
      const guitars = data.map(Adapter.adaptToClient);
      dispatch(setGuitars(guitars));
      dispatch(setIsLoaded());
    } catch (error) {
      dispatch(setGuitars(mockGuitarsLongArray)); // моки, удалить
      dispatch(setIsLoaded()); // моки, удалить
      toast.info(ErrorTexts.LoadGuitarsFailMessage);
    }
  };

export const fetchCurrentGuitar = (guitarId: string): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try{
      dispatch(setIsLoading());
      const {data} = await api.get(`${APIRoute.Guitars}/${guitarId}?_embed=comments`);
      const currentGuitar = Adapter.adaptToClient(data);
      dispatch(setCurrentGuitar(currentGuitar));
      dispatch(setIsLoaded());
    } catch (error) {
      const mockCurrentGuitar = mockGuitarsLongArray.find(guitar => guitar.id === Number(guitarId))
      dispatch(setCurrentGuitar(mockCurrentGuitar !== undefined ? mockCurrentGuitar : mockGuitarsLongArray[1])); // моки, удалить
      dispatch(setIsLoaded()); // моки, удалить
      toast.info(ErrorTexts.LoadGuitarsFailMessage);
    }
  };
