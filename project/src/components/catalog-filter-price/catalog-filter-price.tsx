import {ChangeEvent, useEffect} from 'react';
import {getMinMaxPrice} from '../../common/filter';
import useDebounce from '../../hooks/use-debounce';
import {CORRECT_PRICE_DELAY} from '../../common/const';
import {priceStateType, priceType} from '../../types/filter-types';
import {company} from 'faker';

type CatalogFilterPriceProps = {
  priceName: string,
  priceState: priceStateType,
  cb: (data: priceType) => void;
};

function CatalogFilterPrice (props: CatalogFilterPriceProps): JSX.Element {
  const {priceState, cb, priceName} = props;
  const {inlet} = priceState

  const handleChangePrice = ( evt: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = evt.target;
    let outletPrice = inlet;
    console.log(inlet);
    let correctedValue = value;

    while (correctedValue[0] === '0') {
      correctedValue = correctedValue.replace(/^0/, '');
    }

    correctedValue = correctedValue.replace(/[^0-9]/g, '');
    outletPrice = {...outletPrice, [name]: correctedValue}
    if (correctedValue !== value) {

      // priceState({...priceState, [name]: correctedValue, [`${name}IsChange`]: true});
    }
    console.log(priceState.outlet.priceMin);
    cb(outletPrice)
  };

  // const handleCorrectPrice = () => {
  //   const currentInitPrice = getMinMaxPrice(filteredGuitars);
  //   let isCorrect = false;
  //   let state = filtersState;
  //   const correctPrice = (key: string) => {
  //     if (Number(state[key]) < Number(currentInitPrice.filteredPriceMin)) {
  //       state = ({...state, [key]: currentInitPrice.filteredPriceMin});
  //       isCorrect = true;
  //     }
  //     if (Number(state[key]) > Number(currentInitPrice.filteredPriceMax)) {
  //       state = ({...state, [key]: currentInitPrice.filteredPriceMax});
  //       isCorrect = true;
  //     }
  //   };
  //
  //   correctPrice('priceMin');
  //   correctPrice('priceMax');
  //
  //   if (isCorrect) {
  //     setFiltersState(state);
  //   }
  // };
  //
  // const debouncedCorrectPrice = useDebounce(handleCorrectPrice, CORRECT_PRICE_DELAY);
  // useEffect(()=>{
  //   debouncedCorrectPrice();
  // }, [debouncedCorrectPrice]);


  return (
        <div className="form-input">
          <label className="visually-hidden">Минимальная цена</label>
          <input
            type="text"
            placeholder={priceState.filtered.priceMin}
            id="priceMin"
            name="priceMin"
            value={priceState.outlet.priceMin}
            onChange={handleChangePrice}
            data-testid={'inputPriceMin'}
          />
        </div>
        // <div className="form-input">
        //   <label className="visually-hidden">Максимальная цена</label>
        //   <input
        //     type="text"
        //     placeholder={filtersState.filteredPriceMax}
        //     id="priceMax"
        //     name="priceMax"
        //     value={filtersState.priceMaxIsChange ? filtersState.priceMax : ''}
        //     onChange={handleChangePrice}
        //     data-testid={'inputPriceMax'}
        //   />
        // </div>
  );
}

export default CatalogFilterPrice;
