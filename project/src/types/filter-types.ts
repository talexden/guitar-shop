export type priceType = {
  [key: string]: string,
};
export type priceStateType = {
  filtered: priceType,
  outlet: priceType,
};

export type checkboxType = {
  isChecked: boolean,
  isDisabled: boolean,
};

export type checkboxStateType = {
  inlet: {
    [key: string]: checkboxType
  },
  outlet: {
    [key: string]: checkboxType
  },

};

// export type filtersStateType = ReturnType<typeof filtersStateInit>;

