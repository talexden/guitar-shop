import {nanoid} from '@reduxjs/toolkit';
import {ChangeEvent, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppRoute, CHECKBOX_GUITAR_TYPE, CHECKBOX_STRING_TYPE, CORRECT_PRICE_DELAY, CURRENT_PAGE_INIT} from '../../common/const';
import {getFilterByPrice, getCheckboxStrings, getMinMaxPrice, getFilteredByString} from '../../common/filter';
import useDebounce from '../../hooks/use-debounce';
import {redirectToRoute, setCurrentPage, setFilteredGuitars} from '../../store/action';
import {getGuitars} from '../../store/app-data/selectors';
import {CheckboxType, StringsType} from '../../types/const-type';
import {checkboxStateType, priceStateType} from '../../types/filter-types';
import Checkbox from '../checkbox/checkbox';
import {getCurrentPage} from '../../store/app-process/selectors';

const getCheckboxState = (checkboxType: CheckboxType[]): checkboxStateType => {
  const checkboxState: checkboxStateType = {};
  checkboxType.forEach((checkbox) => {
    Object.assign(
      checkboxState,
      {
        [checkbox.name]: false,
      },
    );
  });
  return checkboxState;
};


function  CatalogFilter(): JSX.Element {
  const guitars = useSelector(getGuitars);
  const currentPage = useSelector(getCurrentPage);
  const dispatch = useDispatch();

  const checkboxStateInit: checkboxStateType =
    Object.assign(
      {},
      getCheckboxState(CHECKBOX_GUITAR_TYPE),
      getCheckboxState(CHECKBOX_STRING_TYPE),
    );

  const priceStateInit: priceStateType = getMinMaxPrice(guitars);
  const guitarTypeStrungStateInit: StringsType = [];

  const [priceState, setPriceState] = useState(priceStateInit);
  const [stringCheckboxState, setStringCheckboxState] = useState(checkboxStateInit);
  const [guitarTypeStrungState, setGuitarTypeStringState] = useState(guitarTypeStrungStateInit);

  // create search URL
  useEffect(() => {
    const priceParams: string[] = [];
    if (priceState.priceMin > priceStateInit.priceMin) {
      priceParams.push(`priceMin=${priceState.priceMin}`);
    }
    if (priceState.priceMax < priceStateInit.priceMax) {
      priceParams.push(`priceMin=${priceState.priceMax}`);
    }

    const checkboxParams: string[] = [];
    Object.keys(stringCheckboxState).forEach((key) => {
      if (stringCheckboxState[key]) {
        checkboxParams.push(`${key}=${stringCheckboxState[key]}`);
      }
    });

    const search = `?${[...priceParams, ...checkboxParams].join('&')}`;
    dispatch(redirectToRoute(`${AppRoute.Catalog}${currentPage}${search}`));
  }, [currentPage, stringCheckboxState, priceState, priceStateInit, dispatch]);

  const handleCorrectPrice = () => {
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
  };

  const debouncePrice = useDebounce(handleCorrectPrice, CORRECT_PRICE_DELAY);

  useEffect(() => {

    const guitarsByPrice = getFilterByPrice(guitars, priceState.priceMin, priceState.priceMax);

    const guitarTypeStrings = getCheckboxStrings(CHECKBOX_GUITAR_TYPE, stringCheckboxState);
    setGuitarTypeStringState(guitarTypeStrings);
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

  const handleChangePrice = ( evt: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = evt.target;

    if (priceState[name] !== Number(value)) {
      setPriceState({...priceState, [name]: Number(value)});
    }

    debouncePrice();
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
              data-testid={'inputPriceMin'}
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
              data-testid={'inputPriceMax'}
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
