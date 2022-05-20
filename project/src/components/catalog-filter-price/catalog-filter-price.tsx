import {ChangeEvent, useState} from 'react';
import useDebounce from '../../hooks/use-debounce';
import {CORRECT_PRICE_DELAY, inputName} from '../../common/const';
import {useDispatch, useSelector} from 'react-redux';
import {setUserPrice} from '../../store/action';

import {
  getUserPrice,
  getFilteredPrice
} from '../../store/app-filter/selectors';

type CatalogFilterPriceProps = {
  inputType: {
    inputPriceName: string,
    priceLabel: string,
  },
};

const priceStateInit = {
  [inputName.priceMin]: '',
  [inputName.priceMax]: '',
};

function CatalogFilterPrice ({inputType}: CatalogFilterPriceProps): JSX.Element {
  const {inputPriceName, priceLabel} = inputType;
  const userPrice = useSelector(getUserPrice);
  const filteredPrice = useSelector(getFilteredPrice);
  const dispatch = useDispatch();
  const [priceState, setPriceState] = useState(priceStateInit);

  // correct price
  const handleCorrectPrice = () => {
    let price = priceState[inputPriceName];
    if (priceState[inputPriceName] === '') {
      price = filteredPrice[inputPriceName];
    } else {
      if (Number(priceState[inputPriceName]) < Number(filteredPrice.priceMin)) {
        price = filteredPrice.priceMin;
      }
      if (Number(priceState[inputPriceName]) > Number(filteredPrice.priceMax)) {
        price = filteredPrice.priceMax;
      }
    }

    const correctPrice = {...priceState, [inputPriceName]: price};
    setPriceState(correctPrice);
  };

  const debouncedCorrectPrice = useDebounce(handleCorrectPrice, CORRECT_PRICE_DELAY);
  debouncedCorrectPrice();

  // set UserPrice
  const handleChangePrice = ( evt: ChangeEvent<HTMLInputElement>) => {
    let {value} = evt.target;

    value = value.replace(/\D/g, ''); // '[^0-9]' === '\D'
    while (value[0] === '0') {
      value = value.replace(/^0/, '');
    }

    const price = {...userPrice, [inputPriceName]: value};
    dispatch(setUserPrice(price));
  };


  return (
    <div className="form-input">
      <label className="visually-hidden">{priceLabel}</label>
      <input
        type="text"
        placeholder={filteredPrice[inputPriceName]}
        id={inputPriceName}
        name={inputPriceName}
        value={userPrice[inputPriceName]}
        onChange={handleChangePrice}
        data-testid={`${inputPriceName}Test`}
      />
    </div>
  );
}

export default CatalogFilterPrice;
