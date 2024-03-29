import {ChangeEvent, KeyboardEvent, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setFilter} from '../../store/action';
import {
  getUserPrice,
  getCheckboxPrice
} from '../../store/app-filter/selectors';

type CatalogFilterPriceProps = {
  inputType: {
    inputPriceName: string,
    priceLabel: string,
  },
};

function CatalogFilterPrice ({inputType}: CatalogFilterPriceProps): JSX.Element {
  const {inputPriceName, priceLabel} = inputType;
  const userPrice = useSelector(getUserPrice);
  const filteredPrice = useSelector(getCheckboxPrice);
  const dispatch = useDispatch();
  const [priceState, setPriceState] = useState('');

  useEffect(()=>{
    setPriceState(userPrice[inputPriceName]);
  }, [userPrice, inputPriceName]);

  const handleChangePrice = ( evt: ChangeEvent<HTMLInputElement>) => {
    let {value} = evt.target;
    value = value.replace(/\D/g, ''); // '[^0-9]' === '\D'
    while (value[0] === '0') {
      value = value.replace(/^0/, '');
    }
    setPriceState(value);
  };


  const handleSetUserPrice = () =>{
    const price = {...userPrice, [inputPriceName]: priceState};
    dispatch(setFilter({userPrice: price}));
  };

  const handlePressEnter = ( evt: KeyboardEvent<HTMLInputElement>) => {
    if ( evt.key === 'Enter') {
      handleSetUserPrice();
    }
  };

  const handleOnBlur = () => {
    handleSetUserPrice();
  };

  return (
    <div className='form-input'>
      <label className='visually-hidden'>{priceLabel}</label>
      <input
        type='text'
        placeholder={filteredPrice[inputPriceName]}
        id={inputPriceName}
        name={inputPriceName}
        value={priceState}
        onKeyDown={handlePressEnter}
        onChange={handleChangePrice}
        onBlur={handleOnBlur}
        data-testid={`${inputPriceName}Test`}
      />
    </div>
  );
}

export default CatalogFilterPrice;
