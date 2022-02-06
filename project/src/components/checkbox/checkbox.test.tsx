import {render, screen} from '@testing-library/react';
import Checkbox from './checkbox';
import {CheckboxType} from '../../types/const-type';
import userEvent from '@testing-library/user-event';


describe('Component: Checkbox', () => {
  it('should render correctly', () => {
    const checkbox: CheckboxType = {
      label: 'fake-label',
      name: 'fake-name',
      string: [3, 5, 6],
    };

    const handleChangeCheckbox = jest.fn();

    render(
      <Checkbox
        isChecked={false}
        isDisabled={false}
        checkbox={checkbox}
        cb={handleChangeCheckbox}
      />,
    );

    expect(screen.getByText(/fake-label/i)).toBeInTheDocument();
    expect(screen.getByTestId(/checkbox-fake-name/i)).toBeInTheDocument();
  });
  it('should check clicks', () => {
    const checkbox: CheckboxType = {
      label: 'fake-label',
      name: 'fake-name',
      string: [3, 5, 6],
    };

    const handleChangeCheckbox = jest.fn();

    render(
      <Checkbox
        isChecked={false}
        isDisabled={false}
        checkbox={checkbox}
        cb={handleChangeCheckbox}
      />,
    );

    userEvent.click(screen.getByTestId(/checkbox-fake-name/i));
    expect(handleChangeCheckbox).toHaveBeenCalledTimes(1);
    userEvent.click(screen.getByLabelText('fake-label'));
    expect(handleChangeCheckbox).toHaveBeenCalledTimes(2);
  });

});
