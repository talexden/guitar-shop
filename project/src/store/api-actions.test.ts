import {Action} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createAPI} from '../services/api';
import {APIRoute, SUCCESSFUL_SENDING_CODE} from '../common/const';
import {RootState} from './root-reducer';
import {setGuitars, setIsLoaded, setIsLoading} from './action';
import {mockGuitarsLongArray} from '../common/mock-guitars';
import {fetchGuitars} from './api-action';

describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
    RootState,
      Action,
      ThunkDispatch<RootState, typeof api, Action>
    >(middlewares);

  it('Тест получения данных с сервера', async () => {
    const store = mockStore();
    mockAPI
      .onGet(APIRoute.Guitars)
      .reply(SUCCESSFUL_SENDING_CODE, mockGuitarsLongArray);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchGuitars());

    expect(store.getActions()).toEqual([
      setIsLoading(),
      setGuitars(mockGuitarsLongArray),
      setIsLoaded(),
    ]);
  });
});
