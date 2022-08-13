import {getCheckboxStrings} from './get-checkbox-strings';

describe('Function: getCheckboxStrings', () => {
  const CHECKBOX_GUITAR_TYPE = [
    {
      label: 'Акустические гитары',
      name: 'acoustic',
      string: [6, 7, 12],
    },
    {
      label: 'Электрогитары',
      name: 'electric',
      string: [4, 6, 7],
    },
    {
      label: 'Укулеле',
      name: 'ukulele',
      string: [4],
    },
  ];
  it('should be return string array for UNKNOWN type', () => {
    const state = {};
    expect(getCheckboxStrings(CHECKBOX_GUITAR_TYPE, state)).toEqual([]);
  });
  it('should be return string array for ukulele type', () => {
    const state = {
      ukulele: {
        name: 'GUI',
        isChecked: true,
        isDisabled: false,
      },
      acoustic: {
        name: 'GUI',
        isChecked: false,
        isDisabled: false,
      },
      electric: {
        name: 'GUI',
        isChecked: false,
        isDisabled: false,
      },
    };
    expect(getCheckboxStrings(CHECKBOX_GUITAR_TYPE, state)).toEqual([4]);
  });
  it('should be return string array for acoustic type', () => {
    const state = {
      ukulele: {
        name: 'GUI',
        isChecked: false,
        isDisabled: false,
      },
      acoustic: {
        name: 'GUI',
        isChecked: true,
        isDisabled: false,
      },
      electric: {
        name: 'GUI',
        isChecked: false,
        isDisabled: false,
      },
    };
    expect(getCheckboxStrings(CHECKBOX_GUITAR_TYPE, state)).toEqual([6, 7, 12]);
  });
  it('should be return string array for electric type', () => {
    const state = {
      ukulele: {
        name: 'GUI',
        isChecked: false,
        isDisabled: false,
      },
      acoustic: {
        name: 'GUI',
        isChecked: false,
        isDisabled: false,
      },
      electric: {
        name: 'GUI',
        isChecked: true,
        isDisabled: false,
      },
    };
    expect(getCheckboxStrings(CHECKBOX_GUITAR_TYPE, state)).toEqual([4, 6, 7]);
  });
  it('should be return string array for electric & ukulele types', () => {
    const state = {
      ukulele: {
        name: 'GUI',
        isChecked: true,
        isDisabled: false,
      },
      acoustic: {
        name: 'GUI',
        isChecked: false,
        isDisabled: false,
      },
      electric: {
        name: 'GUI',
        isChecked: true,
        isDisabled: false,
      },
    };
    expect(getCheckboxStrings(CHECKBOX_GUITAR_TYPE, state)).toEqual([4, 6, 7]);
  });
  it('should be return string array for electric & acoustic types', () => {
    const state = {
      ukulele: {
        name: 'GUI',
        isChecked: false,
        isDisabled: false,
      },
      acoustic: {
        name: 'GUI',
        isChecked: true,
        isDisabled: false,
      },
      electric: {
        name: 'GUI',
        isChecked: true,
        isDisabled: false,
      },
    };
    expect(getCheckboxStrings(CHECKBOX_GUITAR_TYPE, state)).toEqual([6, 7, 12, 4]);
  });
  it('should be return string array for ukulele & acoustic types', () => {
    const state = {
      ukulele: {
        name: 'GUI',
        isChecked: true,
        isDisabled: false,
      },
      acoustic: {
        name: 'GUI',
        isChecked: true,
        isDisabled: false,
      },
      electric: {
        name: 'GUI',
        isChecked: false,
        isDisabled: false,
      },
    };
    expect(getCheckboxStrings(CHECKBOX_GUITAR_TYPE, state)).toEqual([6, 7, 12, 4]);
  });
  it('should be return string array for ukulele & acoustic & electric types', () => {
    const state = {
      ukulele: {
        name: 'GUI',
        isChecked: true,
        isDisabled: false,
      },
      acoustic: {
        name: 'GUI',
        isChecked: true,
        isDisabled: false,
      },
      electric: {
        name: 'GUI',
        isChecked: true,
        isDisabled: false,
      },
    };
    expect(getCheckboxStrings(CHECKBOX_GUITAR_TYPE, state)).toEqual([6, 7, 12, 4]);
  });
});
