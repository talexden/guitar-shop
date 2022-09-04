import {createMemoryHistory} from 'history';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import * as Redux from 'react-redux';
import userEvent from '@testing-library/user-event';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import {mockGuitar, mockGuitarsLongArray} from '../../common/mock-guitars';
import CatalogSort from './catalog-sort';
import {SortDirect, SortKey} from '../../common/const';
import {ActionType} from '../../types/action-type';

const history = createMemoryHistory();
const mockStore = configureMockStore();


describe('Component: CatalogSort', () => {
  it('should render correctly', () => {
    const store = mockStore({
      'PROCESS': {
        filteredGuitars: mockGuitarsLongArray,
        sortKey: SortKey.Price,
        sortDirect: SortDirect.LowToHigh,
        isFilter: true,
      },
    });
    render(
      <Provider store={store}>
        <Router history={history}>
          <CatalogSort />
        </Router>
      </Provider>);

    expect(screen.getByText(/Сортировать:/i)).toBeInTheDocument();
    expect(screen.getByText(/по цене/i)).toBeInTheDocument();
    expect(screen.getByText(/по популярности/i)).toBeInTheDocument();
    expect(screen.getByTestId(/sortDirectLowToHigh/i)).toBeInTheDocument();
    expect(screen.getByTestId(/sortDirectHighToLow/i)).toBeInTheDocument();
  });

  it('should check clicks', () => {
    const dispatch = jest.fn();
    const mockSortedGuitars = [mockGuitar];
    jest.mock('../../common/sort', () => mockSortedGuitars);
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    const store = mockStore({
      'PROCESS': {
        filteredGuitars: [mockGuitar],
        sortedGuitars: [],
        sortKey: SortKey.Price,
        sortDirect: SortDirect.LowToHigh,
        isFilter: true,
      },
    });
    render(
      <Provider store={store}>
        <Router history={history}>
          <CatalogSort />
        </Router>
      </Provider>);

    userEvent.click(screen.getByText(/по цене/i));

    expect(useDispatch).toBeCalledTimes(1);
    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).nthCalledWith(2,
      {
        type: ActionType.SetFilter,
        payload: {sortKey: SortKey.Price},
      },
    );

    userEvent.click(screen.getByText(/по популярности/i));
    expect(dispatch).nthCalledWith(3,
      {
        type: ActionType.SetFilter,
        payload: {sortKey: SortKey.Rating},
      },
    );

    userEvent.click(screen.getByTestId(/sortDirectLowToHigh/i));
    expect(dispatch).nthCalledWith(4,
      {
        type: ActionType.SetFilter,
        payload: {sortDirect: SortDirect.LowToHigh},
      },
    );

    userEvent.click(screen.getByTestId(/sortDirectLowToHigh/i));
    expect(dispatch).nthCalledWith(4,
      {
        type: ActionType.SetFilter,
        payload: {sortDirect: SortDirect.LowToHigh},
      },
    );
  });
});

