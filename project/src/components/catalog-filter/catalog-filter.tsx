import {nanoid} from '@reduxjs/toolkit';
import {ChangeEvent, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {CHECKBOX_GUITAR_TYPE, CHECKBOX_STRING_TYPE, CORRECT_PRICE_DELAY, CURRENT_PAGE_INIT} from '../../common/const';
import {getFilterByPrice, getCheckboxStrings, getMinMaxPrice, getFilteredByString} from '../../common/filter';
import {setCurrentPage, setFilteredGuitars} from '../../store/action';
import {getGuitars} from '../../store/app-data/selectors';
import {CheckboxType, StringsType} from '../../types/const-type';
import {checkboxStateType, priceStateType} from '../../types/filter-types';
import Checkbox from '../checkbox/checkbox';

const getCheckboxState = (checkboxType: CheckboxType[]): checkboxStateType => {
  checkboxType.map((checkbox) => (
    Object.assign(
      {},
      {
        [checkbox.name]: false,
      },
    )
  ));
  return {};
};

let timeout: ReturnType<typeof setTimeout>;

const debounce = <T extends (...args: any[]) => any>(
  callback: T,
  waitFor: number,
) => (...args: Parameters<T>): ReturnType<T> => {
    let result: any;
    timeout && clearTimeout(timeout);
    timeout = setTimeout(() => {
      result = callback(...args);
    }, waitFor);
    return result;
  };

function  CatalogFilter(): JSX.Element {
  const guitars = useSelector(getGuitars);
  const dispatch = useDispatch();

  const checkboxStateInit: checkboxStateType = Object.assign(
    {},
    getCheckboxState(CHECKBOX_GUITAR_TYPE),
    getCheckboxState(CHECKBOX_STRING_TYPE),
  );

  const priceStateInit: priceStateType = getMinMaxPrice(guitars);
  const guitarTypeStrungStateInit: StringsType = [];

  const [priceState, setPriceState] = useState(priceStateInit);
  const [stringCheckboxState, setStringCheckboxState] = useState(checkboxStateInit);
  const [guitarTypeStrungState, setGuitarTypeStrungState] = useState(guitarTypeStrungStateInit);

  useEffect(() => {

    const guitarsByPrice = getFilterByPrice(guitars, priceState.priceMin, priceState.priceMax);

    const guitarTypeStrings = getCheckboxStrings(CHECKBOX_GUITAR_TYPE, stringCheckboxState);
    setGuitarTypeStrungState(guitarTypeStrings);
    const strings = getCheckboxStrings(CHECKBOX_STRING_TYPE, stringCheckboxState);

    const guitarsSortedByGuitarType = getFilteredByString(guitarsByPrice, guitarTypeStrings);
    const guitarsSortedByString = getFilteredByString(guitarsSortedByGuitarType, strings);

    dispatch(setCurrentPage(CURRENT_PAGE_INIT));
    dispatch(setFilteredGuitars(guitarsSortedByString));
  }, [priceState, dispatch, stringCheckboxState, guitars]);


  const handleChangeCheckbox = ( evt: ChangeEvent<HTMLInputElement>) => {
    const {name, checked} = evt.target;

    if (stringCheckboxState[name] !== checked) {
      setStringCheckboxState({...stringCheckboxState, [name]: checked});
    }
  };

  const correctPrice = debounce(() => {
    if (priceState.priceMin < priceStateInit.priceMin) {
      setPriceState({...priceState, priceMin: priceStateInit.priceMin});
    }
    if (priceState.priceMin > priceStateInit.priceMax) {
      setPriceState({...priceState, priceMin: priceStateInit.priceMax});
    }
    if (priceState.priceMax > priceStateInit.priceMax) {
      setPriceState({...priceState, priceMax: priceStateInit.priceMax});
    }
    if (priceState.priceMax < priceStateInit.priceMin) {
      setPriceState({...priceState, priceMax: priceStateInit.priceMin});
    }
  }, CORRECT_PRICE_DELAY);


  const handleChangePrice = ( evt: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = evt.target;

    if (priceState[name] !== Number(value)) {
      setPriceState({...priceState, [name]: Number(value)});
    }
    correctPrice();
  };


  return (
    <form className="catalog-filter">
      <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>

      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Цена, ₽</legend>
        <div className="catalog-filter__price-range">
          <div className="form-input">
            <label className="visually-hidden">Минимальная цена</label>
            <input
              type="number"
              placeholder="1 000"
              id="priceMin"
              name="priceMin"
              value={priceState.priceMin}
              onChange={handleChangePrice}
            />
          </div>
          <div className="form-input">
            <label className="visually-hidden">Максимальная цена</label>
            <input
              type="number"
              placeholder="30 000"
              id="priceMax"
              name="priceMax"
              value={priceState.priceMax}
              onChange={handleChangePrice}

            />
          </div>
        </div>
      </fieldset>

      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Тип гитар</legend>
        {CHECKBOX_GUITAR_TYPE.map((checkbox) => (
          <Checkbox
            key={nanoid()}
            isChecked={stringCheckboxState[checkbox.name]}
            isDisabled={false}
            checkbox={checkbox}
            cb={handleChangeCheckbox}
          />
        ))}
      </fieldset>

      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Количество струн</legend>
        {CHECKBOX_STRING_TYPE.map((checkbox) => (
          <Checkbox
            key={nanoid()}
            isChecked={stringCheckboxState[checkbox.name]}
            isDisabled={checkbox.string.some((string) => guitarTypeStrungState.length > 0 && !guitarTypeStrungState.includes(string))}
            checkbox={checkbox}
            cb={handleChangeCheckbox}
          />
        ))}
      </fieldset>
    </form>
  );
}

export default  CatalogFilter;
