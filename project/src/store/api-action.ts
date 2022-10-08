import {toast} from 'react-toastify';
import {mockGuitarsLongArray} from '../common/mock/mock-guitars';
import {Adapter} from '../components/adapter/adapter';
import {APIRoute, ErrorTexts, NO_PARAMS} from '../common/const';
import {ThunkActionResult} from '../types/action-type';
import {
  setCheckboxStore,
  setCurrentGuitar,
  setFilter,
  setGuitars,
  setIsCurrentGuitarLoading,
  setIsLoading
} from './action';
import {checkboxStoreInit} from './app-filter/app-filter';

export const fetchGuitars = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try{
      dispatch(setIsLoading(true));
      const {data} = await api.get(`${APIRoute.Guitars}?_embed=comments`);
      const guitars = data.map(Adapter.adaptToClient);
      dispatch(setGuitars(guitars));
      const locationSearch = window.location.search || NO_PARAMS;
      dispatch(setFilter({locationSearch}));
      dispatch(setIsLoading(false));
    } catch (error) {
      dispatch(setGuitars(mockGuitarsLongArray)); // моки, удалить
      dispatch(setCheckboxStore(checkboxStoreInit));
      dispatch(setIsLoading(false)); // моки, удалить
      toast.info(ErrorTexts.LoadGuitarsFailMessage);
    }
  };

export const fetchCurrentGuitar = (guitarId: number): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try{
      dispatch(setIsCurrentGuitarLoading(true));
      const {data} = await api.get(`${APIRoute.Guitars}/${guitarId}?_embed=comments`);
      const currentGuitar = Adapter.adaptToClient(data);
      dispatch(setCurrentGuitar(currentGuitar));
      dispatch(setIsCurrentGuitarLoading(false));
    } catch (error) {
      const mockCurrentGuitar = mockGuitarsLongArray.find((guitar) => guitar.id === Number(guitarId));
      dispatch(setCurrentGuitar(mockCurrentGuitar !== undefined ? mockCurrentGuitar : mockGuitarsLongArray[1])); // моки, удалить
      dispatch(setIsCurrentGuitarLoading(false)); // моки, удалить
      toast.info(ErrorTexts.LoadGuitarsFailMessage);
    }
  };
