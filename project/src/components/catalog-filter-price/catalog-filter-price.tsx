import {ChangeEvent, useEffect, useState} from 'react';
import useDebounce from '../../hooks/use-debounce';
import {CORRECT_PRICE_DELAY} from '../../common/const';
import {useDispatch, useSelector} from 'react-redux';
import {getCurrentPrice, getFilteredPrice} from '../../store/app-filter/selectors';
import {setCurrentPrice, setFilteredPrice} from '../../store/action';
import {getFilteredGuitars} from '../../store/app-process/selectors';
import {getMinMaxPrice} from '../../common/filter';
import {PriceName, PriceStoreType} from '../../store/app-filter/app-filter';

type CatalogFilterPriceProps = {
  inputType: {
    priceName: string,
    priceLabel: string,
  },
};

type isChangePriceType = {
  [key:string]: boolean,
}

const isChangePrice: isChangePriceType = {
  priceMin: false,
  priceMax: false,
};

function CatalogFilterPrice ({inputType}: CatalogFilterPriceProps): JSX.Element {
  const {priceName, priceLabel} = inputType;
  const filteredGuitars = useSelector(getFilteredGuitars);
  const filteredPrice = useSelector(getFilteredPrice);
  const currentPrice = useSelector(getCurrentPrice);
  const dispatch = useDispatch();
  const curentPriceStateInit: PriceStoreType = {
    priceMin: '',
    priceMax: '',
  };
  const [curentPriceState, setCurentPriceState] = useState(curentPriceStateInit);

  useEffect(()=>{
    const price = getMinMaxPrice(filteredGuitars);
    dispatch(setFilteredPrice(price));
  }, [filteredGuitars, dispatch]);


  const correctPrice = (key: PriceName) => {
    if (currentPrice[key] !== '' && Number(currentPrice[key]) < Number(filteredPrice.priceMin)) {
      const correctedPrice = ({...currentPrice, [key]: filteredPrice.priceMin});
      setCurentPriceState(correctedPrice);
    }
    if (currentPrice[key] !== '' && Number(currentPrice[key]) > Number(filteredPrice.priceMax)) {
      const correctedPrice = ({...currentPrice, [key]: filteredPrice.priceMax});
      setCurentPriceState(correctedPrice);
    }
  };


  useEffect(()=>{
    dispatch(setCurrentPrice(curentPriceState));
  }, [curentPriceState]);

  useEffect(()=>{
    debouncedCorrectPrice();
  }, [currentPrice]);

  const handleCorrectPrice = () => {
    correctPrice(PriceName.priceMin);
    correctPrice(PriceName.priceMax);
  };


  const debouncedCorrectPrice = useDebounce(handleCorrectPrice, CORRECT_PRICE_DELAY);

  const handleChangePrice = ( evt: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = evt.target;
    let changePrice = currentPrice;
    let changedValue = value;

    while (changedValue[0] === '0') {
      changedValue = changedValue.replace(/^0/, '');
    }

    changedValue = changedValue.replace(/[^0-9]/g, '');

    if ( currentPrice[name] !== value || changedValue !== value) {
      changePrice = {...changePrice, [name]: changedValue};
    }

    isChangePrice[name] = true;

    setCurentPriceState(changePrice);
  };


  return (
    <div className="form-input">
      <label className="visually-hidden">{priceLabel}</label>
      <input
        type="text"
        placeholder={filteredPrice[priceName]}
        id={priceName}
        name={priceName}
        value={isChangePrice[priceName] ? currentPrice[priceName] : ''}
        onChange={handleChangePrice}
        data-testid={`${priceName}Test`}
      />
    </div>
  );
}

export default CatalogFilterPrice;
