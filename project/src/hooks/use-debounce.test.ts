import useDebounce from './use-debounce';
import {renderHook} from '@testing-library/react-hooks';

describe('Function: useDebounce', () => {
  const DEBOUNCE_TIME = 300;
  let tester = 0;
  const handleFunction = () => {
    tester = 312;
  };
  const {result} = renderHook(() =>
    useDebounce(handleFunction, DEBOUNCE_TIME),
  );

  const testFunction = () => {
    result.current();
    return tester;
  };
  it('should be return string with number, grouping by 3', () => {
    expect(testFunction())
      .toEqual(312);
  });
});
