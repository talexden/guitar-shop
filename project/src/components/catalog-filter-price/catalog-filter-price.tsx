import {ChangeEvent, useEffect} from 'react';
import {getMinMaxPrice} from '../../common/filter';
import useDebounce from '../../hooks/use-debounce';
import {CORRECT_PRICE_DELAY, priceName} from '../../common/const';
import {priceStateType, priceType} from '../../types/filter-types';
import {useSelector} from 'react-redux';
import {getFilteredGuitars} from '../../store/app-process/selectors';

type CatalogFilterPriceProps = {
  namePrice: string,
  labelPrice: string,
  state: priceStateType,
  cb: (data: priceType) => void;
};

type isChangePriceType = {
  [key: string]: boolean,
}

const isChangePrice: isChangePriceType = {
  priceMin: false,
  priceMax: false,
};

function CatalogFilterPrice (props: CatalogFilterPriceProps): JSX.Element {
  const {state, cb, namePrice, labelPrice} = props;
  const {filtered, outlet} = state;
  const filteredGuitars = useSelector(getFilteredGuitars);

  const handleCorrectPrice = () => {
    const filteredInitPrice = getMinMaxPrice(filteredGuitars);
    let isCorrect = false;
    let correctedPrice = outlet;
    const correctPrice = (key: string) => {
      if (Number(correctedPrice[key]) < Number(filteredInitPrice.priceMin)) {
        correctedPrice = ({...correctedPrice, [key]: filteredInitPrice.priceMin});
        isCorrect = true;
      }
      if (Number(correctedPrice[key]) > Number(filteredInitPrice.priceMax)) {
        correctedPrice = ({...correctedPrice, [key]: filteredInitPrice.priceMax});
        isCorrect = true;
      }
    };

    correctPrice(priceName.priceMin);
    correctPrice(priceName.priceMax);

    if (isCorrect) {
      cb(correctedPrice);
    }
  };

  const debouncedCorrectPrice = useDebounce(handleCorrectPrice, CORRECT_PRICE_DELAY);

  const handleChangePrice = ( evt: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = evt.target;
    let changePrice = outlet;
    let changedValue = value;

    while (changedValue[0] === '0') {
      changedValue = changedValue.replace(/^0/, '');
    }

    changedValue = changedValue.replace(/[^0-9]/g, '');

    if ( changePrice[name] !== value || changedValue !== value) {
      changePrice = {...changePrice, [name]: changedValue};
    }

    isChangePrice[name] = true;

    cb(changePrice);
  };

  useEffect(()=>{
    debouncedCorrectPrice();
  }, [state, debouncedCorrectPrice]);

  return (
    <div className="form-input">
      <label className="visually-hidden">{labelPrice}</label>
      <input
        type="text"
        placeholder={filtered[namePrice]}
        id={namePrice}
        name={namePrice}
        value={isChangePrice[namePrice] ? outlet[namePrice] : ''}
        onChange={handleChangePrice}
        data-testid={namePrice}
      />
    </div>
  );
}

export default CatalogFilterPrice;
