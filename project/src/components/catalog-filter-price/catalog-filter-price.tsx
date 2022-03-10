import {ChangeEvent, useEffect, useState} from 'react';
import useDebounce from '../../hooks/use-debounce';
import {CORRECT_PRICE_DELAY, inputName} from '../../common/const';
import {useDispatch, useSelector} from 'react-redux';
import {setCurrentPrice, setFilteredPrice} from '../../store/action';
import {getMinMaxPrice} from '../../common/filter';

import {
  getCurrentPrice,
  getFilteredPrice,
  getGuitarsFilteredByCheckbox
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
  const currentPrice = useSelector(getCurrentPrice);
  const filteredPrice = useSelector(getFilteredPrice);
  const guitarsFilteredByCheckbox = useSelector(getGuitarsFilteredByCheckbox);
  const dispatch = useDispatch();
  const [priceState, setPriceState] = useState(priceStateInit);

  // set filteredPrice by selected checkbox
  useEffect(()=>{
    const price = getMinMaxPrice(guitarsFilteredByCheckbox);
    if (price[inputName.priceMin] !== filteredPrice[inputName.priceMin] || price[inputName.priceMax] !== filteredPrice[inputName.priceMax]){
      dispatch(setFilteredPrice(price));
    }
  }, [dispatch, guitarsFilteredByCheckbox, filteredPrice]);

  // correct price
  const handleCorrectPrice = () => {
    let price = priceState[inputPriceName];
    if (priceState[inputPriceName] === '') {
      price = filteredPrice[inputPriceName];
    } else {
      // if (priceState[inputPriceName] !== '' && Number(priceState[inputPriceName]) < Number(filteredPrice.priceMin)) {
      if (Number(priceState[inputPriceName]) < Number(filteredPrice.priceMin)) {
        price = filteredPrice.priceMin;
      }
      // if (priceState[inputPriceName] !== '' && Number(priceState[inputPriceName]) > Number(filteredPrice.priceMax)) {
      if (Number(priceState[inputPriceName]) > Number(filteredPrice.priceMax)) {
        price = filteredPrice.priceMax;

      }
    }

    const correctPrice = {...priceState, [inputPriceName]: price};
    setPriceState(correctPrice);
  };

  const debouncedCorrectPrice = useDebounce(handleCorrectPrice, CORRECT_PRICE_DELAY);


  useEffect(()=>{
    if (currentPrice[inputPriceName] !== priceState[inputPriceName] && priceState[inputPriceName] !== ''){
      debouncedCorrectPrice();
      const price = {...currentPrice, [inputPriceName]: priceState[inputPriceName]};
      dispatch(setCurrentPrice(price));
    }
  }, [dispatch, debouncedCorrectPrice, priceState, inputPriceName, currentPrice]);


  const handleChangePrice = ( evt: ChangeEvent<HTMLInputElement>) => {
    let {value} = evt.target;

    value = value.replace(/[^0-9]/g, '');
    while (value[0] === '0') {
      value = value.replace(/^0/, '');
    }

    if (priceState[inputPriceName] !== value) {
      const price = {...priceState, [inputPriceName]: value};
      setPriceState(price);
    }
  };


  return (
    <div className="form-input">
      <label className="visually-hidden">{priceLabel}</label>
      <input
        type="text"
        placeholder={filteredPrice[inputPriceName]}
        id={inputPriceName}
        name={inputPriceName}
        value={priceState[inputPriceName] !== filteredPrice[inputPriceName] && priceState[inputPriceName] !== '' ? priceState[inputPriceName] : ''}
        onChange={handleChangePrice}
        data-testid={`${inputPriceName}Test`}
      />
    </div>
  );
}

export default CatalogFilterPrice;
