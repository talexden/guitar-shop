import {
  setCurrentGuitar, setCurrentNavigationLabel,
  setCurrentPage,
  setFilteredGuitars,
  setGuitarsByPages,
  setPaginationPages,
  setSearchedGuitars,
  setSearchKey,
  setSortDirect,
  setSortedGuitars,
  setSortKey
} from '../action';
import {mockGuitarsLongArray, mockGuitarsSortedByPages} from '../../common/mock-guitars';
import {AppProcess, AppProcessType} from './app-process';
import {SortDirect, SortKey} from '../../common/const';

describe('Reducer', () => {
  describe('Reducer: AppProcess', () => {
    let state: AppProcessType;
    beforeEach(() => {
      state = {
        sortedGuitars: [],
        filteredGuitars: [],
        searchedGuitars: [],
        commentPost: null,
        couponPost: '',
        orderPost: null,
        sortKey: SortKey.Price,
        sortDirect: SortDirect.LowToHigh,
        isFilter: false,
        guitarsByPages: [],
        currentGuitar: null,
        currentPage: 1,
        paginationPages: [],
        currentNavigationLabel: '',
        searchKey: '',
      };
    });

    it('without additional parameters should return initial state', () => {
      expect(AppProcess(void 0, {type: 'UNKNOWN_ACTION '}))
        .toEqual(state);
    });

    it('setFilteredGuitars: should update filteredGuitars', () => {
      expect(AppProcess(state, setFilteredGuitars(mockGuitarsLongArray)))
        .toEqual({...state, filteredGuitars: mockGuitarsLongArray});
    });

    it('setSortedGuitars: should update sortedGuitars', () => {
      expect(AppProcess(state, setSortedGuitars(mockGuitarsLongArray)))
        .toEqual({...state, sortedGuitars: mockGuitarsLongArray});
    });

    it('setGuitarsByPages: should update sortedGuitars', () => {
      expect(AppProcess(state, setGuitarsByPages(mockGuitarsSortedByPages)))
        .toEqual({...state, guitarsByPages: mockGuitarsSortedByPages});
    });

    it('setPaginationPages: should update paginationPages', () => {
      const paginationPages = [1, 2, 3];
      expect(AppProcess(state, setPaginationPages(paginationPages)))
        .toEqual({...state, paginationPages: paginationPages});
    });

    it('setCurrentGuitar: should update currentGuitar', () => {
      const guitar = mockGuitarsLongArray[1];
      expect(AppProcess(state, setCurrentGuitar(guitar)))
        .toEqual({...state, currentGuitar: guitar});
    });

    it('setCurrentPage: should update currentPage', () => {
      const pageNumber = 13;
      expect(AppProcess(state, setCurrentPage(pageNumber)))
        .toEqual({...state, currentPage: pageNumber});
    });

    it('setSearchedGuitars: should update searchedGuitars', () => {
      const guitars = mockGuitarsLongArray;
      expect(AppProcess(state, setSearchedGuitars(guitars)))
        .toEqual({...state, searchedGuitars: guitars});
    });

    describe('Reducer: setSortKey', () => {
      it('setSortKey: should update isFilter & sortKey by SortKey.Price', () => {
        expect(AppProcess(state, setSortKey(SortKey.Price)))
          .toEqual({...state, isFilter: true, sortKey: SortKey.Price});
      });
      it('setSortKey: should update isFilter & sortKey by SortKey.Rating', () => {
        expect(AppProcess(state, setSortKey(SortKey.Rating)))
          .toEqual({...state, isFilter: true, sortKey: SortKey.Rating});
      });
    });

    describe('Reducer: setSortDirect', () => {
      it('setSortDirect: should update isFilter & sortKey by SortDirect.LowToHigh', () => {
        expect(AppProcess(state, setSortDirect(SortDirect.LowToHigh)))
          .toEqual({...state, isFilter: true, sortDirect: SortDirect.LowToHigh});
      });
      it('setSortDirect: should update isFilter & sortKey by SortDirect.HighToLow', () => {
        expect(AppProcess(state, setSortDirect(SortDirect.HighToLow)))
          .toEqual({...state, isFilter: true, sortDirect: SortDirect.HighToLow});
      });
    });

    describe('Reducer: setCurrentNavigationPage', () => {
      it('setCurrentNavigationPage: should update currentNavigationPageLabel', () => {
        const pageLabel = 'Каталог';
        expect(AppProcess(state, setCurrentNavigationLabel(pageLabel)))
          .toEqual({...state, currentNavigationLabel: 'Каталог'});
      });
    });

    describe('Reducer: searchKey', () => {
      it('setSearchKey: should update searchKey with key', () => {
        const searchKey = 'Каталог';
        const resetSearchKey = '';
        expect(AppProcess(state, setSearchKey(searchKey)))
          .toEqual({...state, searchKey: 'Каталог'});
        expect(AppProcess(state, setSearchKey(resetSearchKey)))
          .toEqual({...state, searchKey: ''});
      });
    });
  });
});
