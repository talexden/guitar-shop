import {toast} from 'react-toastify';
import {mockGuitarsLongArray} from '../common/mock-guitars';
import {Adapter} from '../components/adapter/adapter';
import {APIRoute, CARD_COUNT, ErrorTexts} from '../common/const';
import {ThunkActionResult} from '../types/action-type';
import {setGuitars, setIsLoading, setIsLoaded, setGuitarsByPages, setFilteredGuitars} from './action';
import {sortGuitarsByPages} from '../common/sort';

export const fetchGuitars = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try{
      dispatch(setIsLoading());
      const {data} = await api.get(`${APIRoute.Guitars}?_embed=comments`);
      const guitars = data.map(Adapter.adaptToClient);
      dispatch(setGuitars(guitars));
      // dispatch(setGuitarsByPages(sortGuitarsByPages([...guitars], CARD_COUNT)));
      dispatch(setFilteredGuitars(guitars));
      dispatch(setIsLoaded());
    } catch (error) {
      dispatch(setGuitars(mockGuitarsLongArray)); // моки, удалить
      dispatch(setIsLoaded()); // моки, удалить
      toast.info(ErrorTexts.LoadGuitarsFailMessage);
    }
  };
