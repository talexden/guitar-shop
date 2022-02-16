import {nanoid} from '@reduxjs/toolkit';
import {ChangeEvent, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppRoute, CHECKBOX_GUITAR_TYPE, CHECKBOX_STRING_TYPE, CORRECT_PRICE_DELAY, CURRENT_PAGE_INIT} from '../../common/const';
import {
  getFilterByPrice,
  getCheckboxStrings,
  getMinMaxPrice,
  getFilteredByString,
  filterGuitarsByType,
  getGuitarTypeStrings
} from '../../common/filter';
import useDebounce from '../../hooks/use-debounce';
import {redirectToRoute, setCurrentPage, setFilteredGuitars} from '../../store/action';
import {getGuitars} from '../../store/app-data/selectors';
import {CheckboxType} from '../../types/const-type';
import {checkboxStateType} from '../../types/filter-types';
import Checkbox from '../checkbox/checkbox';
import {getCurrentPage, getFilteredGuitars} from '../../store/app-process/selectors';

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
  const filteredGuitars = useSelector(getFilteredGuitars);
  const dispatch = useDispatch();

  const initPrice = getMinMaxPrice(guitars);
  const filtersStateInit =
    Object.assign(
      {},
      getCheckboxState(CHECKBOX_GUITAR_TYPE),
      getCheckboxState(CHECKBOX_STRING_TYPE),
      {priceMin: '0'},
      {priceMax: '0'},
      {filteredPriceMin: '0'},
      {filteredPriceMax: '0'},
      {priceMinIsChange: false},
      {priceMaxIsChange: false},
    );

  const [filtersState, setFiltersState] = useState(filtersStateInit);
  const guitarTypeStringStateInit: number[] = [];
  const [guitarTypeStringState, setGuitarTypeStringState] = useState(guitarTypeStringStateInit);


  useEffect(()=> {
    const initPrice = getMinMaxPrice(filteredGuitars);
    setFiltersState({...filtersState, initPrice});
  }, []);



  // create search URL
  // useEffect(() => {
  //   const priceParams: string[] = [];
  //   if (filtersState.priceMin > filtersState.filteredPriceMin) {
  //     priceParams.push(`priceMin=${filtersState.priceMin}`);
  //   }
  //   if (filtersState.priceMax < filtersState.filteredPriceMax) {
  //     priceParams.push(`priceMax=${filtersState.priceMax}`);
  //   }
  //
  //   const checkboxParams: string[] = [];
  //   Object.keys(filtersState).forEach((key) => {
  //     if (filtersState[key]) {
  //       checkboxParams.push(`${key}=${filtersState[key]}`);
  //     }
  //   });
  //
  //   const search = `?${[...priceParams, ...checkboxParams].join('&')}`;
  //   dispatch(redirectToRoute(`${AppRoute.Catalog}${currentPage}${search}`));
  // }, [currentPage, filtersState, filtersState, initPrice, dispatch]);


  //parsing Url
  // const urlSearchParams = new URLSearchParams(window.location.search);
  // const params = Object.fromEntries(urlSearchParams.entries());
  // console.log(params);


  // Sorting
  useEffect(() => {
    const guitarsByType = filterGuitarsByType(guitars, CHECKBOX_GUITAR_TYPE, filtersState);
    setGuitarTypeStringState(getGuitarTypeStrings(guitarsByType));
    const strings = getCheckboxStrings(CHECKBOX_STRING_TYPE, filtersState);
    const guitarsSortedByString = getFilteredByString(guitarsByType, strings);
    const guitarsByPrice = getFilterByPrice(guitarsSortedByString, Number(filtersState.priceMin), Number(filtersState.priceMax));


    dispatch(setCurrentPage(CURRENT_PAGE_INIT));
    dispatch(setFilteredGuitars(guitarsByPrice));
  }, [dispatch, filtersState, guitars]);


  const handleChangeCheckbox = ( evt: ChangeEvent<HTMLInputElement>) => {
    const {name, checked} = evt.target;

    if (filtersState[name] !== checked) {
      setFiltersState({...filtersState, [name]: checked});
    }
  };

  const handleChangePrice = ( evt: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = evt.target;
    let correctedValue = value;

    while (correctedValue[0] === '0') {
      correctedValue = correctedValue.replace(/^0/, '');
    }

    correctedValue = correctedValue.replace(/[^0-9]/g, '');
    if ( filtersState[name] !== value || correctedValue !== value) {
      setFiltersState({...filtersState, [name]: correctedValue, [`${name}IsChange`]: true});
    }
  };



  const handleCorrectPrice = () => {
    const currentInitPrice = getMinMaxPrice(filteredGuitars);
    let isCorrect = false;
    let state = filtersState;
    const correctPrice = (key: string) => {
      if (Number(state[key]) < Number(currentInitPrice.filteredPriceMin)) {
        state = ({...state, [key]: currentInitPrice.filteredPriceMin});
        isCorrect = true;
      }
      if (Number(state[key]) > Number(currentInitPrice.filteredPriceMax)) {
        state = ({...state, [key]: currentInitPrice.filteredPriceMax});
        isCorrect = true;
      }
    };

    correctPrice('priceMin');
    correctPrice('priceMax');

    if (isCorrect) {
      setFiltersState(state);
    }
  };

  const debouncedCorrectPrice = useDebounce(handleCorrectPrice, CORRECT_PRICE_DELAY);

  useEffect(()=>{
    debouncedCorrectPrice();
  }, [debouncedCorrectPrice]);


  return (
    <form className="catalog-filter">
      <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>

      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Цена, ₽</legend>
        <div className="catalog-filter__price-range">
          <div className="form-input">
            <label className="visually-hidden">Минимальная цена</label>
            <input
              type="text"
              placeholder={filtersState.filteredPriceMin}
              id="priceMin"
              name="priceMin"
              value={filtersState.priceMinIsChange ? filtersState.priceMin : ''}
              onChange={handleChangePrice}
              data-testid={'inputPriceMin'}
            />
          </div>
          <div className="form-input">
            <label className="visually-hidden">Максимальная цена</label>
            <input
              type="text"
              placeholder={filtersState.filteredPriceMax}
              id="priceMax"
              name="priceMax"
              value={filtersState.priceMaxIsChange ? filtersState.priceMax : ''}
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
            isChecked={filtersState[checkbox.name]}
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
            isChecked={filtersState[checkbox.name]}
            isDisabled={checkbox.string.some((string) => guitarTypeStringState.length > 0 && !guitarTypeStringState.includes(string))}
            checkbox={checkbox}
            cb={handleChangeCheckbox}
          />
        ))}
      </fieldset>
    </form>
  );
}

export default  CatalogFilter;
