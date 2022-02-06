import {AppData, AppDataType} from './app-data';
import {setGuitars, setIsLoaded, setIsLoading} from '../action';
import {mockGuitarsLongArray} from '../../common/mock-guitars';

describe('Reducer', () => {
  describe('Reducer: AppData', () => {
    let state: AppDataType;
    beforeEach(() => {
      state = {
        guitars: [],
        isLoading: false,
      };
    });

    it('without additional parameters should return initial state', () => {
      expect(AppData(void 0, {type: 'UNKNOWN_ACTION '}))
        .toEqual(state);
    });

    it('setGuitars: should update guitars', () => {
      expect(AppData(state, setGuitars(mockGuitarsLongArray)))
        .toEqual({...state, guitars: mockGuitarsLongArray});
    });

    it('setIsLoading: should update isLoading: true', () => {
      expect(AppData(state, setIsLoading()))
        .toEqual({...state, isLoading: true});
    });
    it('setIsLoaded: should update isLoading: false', () => {
      expect(AppData(state, setIsLoaded()))
        .toEqual({...state, isLoading: false});
    });
  });
});
