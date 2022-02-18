import {ChangeEvent, useEffect} from 'react';
import useDebounce from '../../hooks/use-debounce';
import {CORRECT_PRICE_DELAY, priceName} from '../../common/const';
import {useDispatch, useSelector} from 'react-redux';
import {getCurrentPrice, getFilteredPrice} from '../../store/app-filter/selectors';
import {setCurrentPrice, setFilteredPrice} from '../../store/action';
import {getFilteredGuitars} from '../../store/app-process/selectors';
import {getMinMaxPrice} from '../../common/filter';

type CatalogFilterPriceProps = {
  namePrice: string,
  labelPrice: string,
};

type isChangePriceType = {
  [key:string]: boolean,
  priceMax: boolean,
}

const isChangePrice: isChangePriceType = {
  priceMin: false,
  priceMax: false,
};

function CatalogFilterPrice ({namePrice, labelPrice}: CatalogFilterPriceProps): JSX.Element {
  const filteredGuitars = useSelector(getFilteredGuitars);
  const filteredPrice = useSelector(getFilteredPrice);
  const currentPrice = useSelector(getCurrentPrice);
  const dispatch = useDispatch();

  useEffect(()=>{
    const price = getMinMaxPrice(filteredGuitars);
    dispatch(setFilteredPrice(price));
  }, [filteredGuitars, dispatch]);

  const correctPrice = (key: string) => {
    let correctedPrice = currentPrice;
    if (Number(correctedPrice[key]) < Number(filteredPrice.priceMin)) {
      correctedPrice = ({...correctedPrice, [key]: filteredPrice.priceMin});
      dispatch(setCurrentPrice(correctedPrice));
    }
    if (Number(correctedPrice[key]) > Number(filteredPrice.priceMax)) {
      correctedPrice = ({...correctedPrice, [key]: filteredPrice.priceMax});
      dispatch(setCurrentPrice(correctedPrice));
    }
  };


  const handleChangePrice = ( evt: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = evt.target;
    let changePrice = currentPrice;
    let changedValue = value;

    while (changedValue[0] === '0') {
      changedValue = changedValue.replace(/^0/, '');
    }

    changedValue = changedValue.replace(/[^0-9]/g, '');

    if ( changePrice[name] !== value || changedValue !== value) {
      changePrice = {...changePrice, [name]: changedValue};
    }

    isChangePrice[name] = true;

    dispatch(setCurrentPrice(changePrice));
  };


  const handleCorrectPrice = () => {
    correctPrice(priceName.priceMin);
    correctPrice(priceName.priceMax);
  };

  const debouncedCorrectPrice = useDebounce(handleCorrectPrice, CORRECT_PRICE_DELAY);


  useEffect(()=>{
    debouncedCorrectPrice();
  }, [currentPrice, debouncedCorrectPrice]);


  return (
    <div className="form-input">
      <label className="visually-hidden">{labelPrice}</label>
      <input
        type="text"
        placeholder={filteredPrice[namePrice]}
        id={namePrice}
        name={namePrice}
        value={isChangePrice[namePrice] ? currentPrice[namePrice] : ''}
        onChange={handleChangePrice}
        data-testid={namePrice}
      />
    </div>
  );
}

export default CatalogFilterPrice;
