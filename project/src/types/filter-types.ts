export type priceType = {
  priceMin: string,
  priceMax: string,
};
export type priceStateType = {
  [key: string]: priceType,
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

