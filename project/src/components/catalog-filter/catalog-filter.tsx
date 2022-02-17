import {nanoid} from '@reduxjs/toolkit';
import {ChangeEvent, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  AppRoute,
  CHECKBOX_GUITAR_TYPE,
  CHECKBOX_STRING_TYPE,
  CORRECT_PRICE_DELAY,
  CURRENT_PAGE_INIT,
  priceLabel, priceName,
} from '../../common/const';
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
import {checkboxStateType, priceStateType, priceType} from '../../types/filter-types';
import Checkbox from '../checkbox/checkbox';
import {getCurrentPage, getFilteredGuitars} from '../../store/app-process/selectors';
import CatalogFilterPrice from '../catalog-filter-price/catalog-filter-price';

const getCheckboxState = (checkboxType: CheckboxType[]): checkboxStateType => {
  const checkboxState: checkboxStateType = {inlet: {}, outlet: {}};
  checkboxType.forEach((checkbox) => {
    Object.assign(
      checkboxState,
      {
        inlet: {
          [checkbox.name]: {
            isChecked: false,
            isDisabled: false,
          },
        },
        outlet: {
          [checkbox.name]: {
            isChecked: false,
            isDisabled: false,
          },
        },
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

  const checkboxStateInit: checkboxStateType =
    Object.assign(
      {},
      getCheckboxState(CHECKBOX_GUITAR_TYPE),
      getCheckboxState(CHECKBOX_STRING_TYPE),
    );

  const filteredPriceInit = getMinMaxPrice(guitars);
  const initPrice = {
    priceMin: '',
    priceMax: '',
  };
  const priceStateInit: priceStateType = {
    filtered: filteredPriceInit,
    outlet: filteredPriceInit,
  };

  const [priceState, setPriceState] = useState(priceStateInit);
  // const [checkboxState, setCheckboxState] = useState(checkboxStateInit);

  // const guitarTypeStringStateInit: number[] = [];
  // const [guitarTypeStringState, setGuitarTypeStringState] = useState(guitarTypeStringStateInit);


  // useEffect(()=> {
  //   const initPrice = getMinMaxPrice(filteredGuitars);
  //   setFiltersState({...filtersState, initPrice});
  // }, []);


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
  // useEffect(() => {
  //   const guitarsByType = filterGuitarsByType(guitars, CHECKBOX_GUITAR_TYPE, filtersState);
  //   setGuitarTypeStringState(getGuitarTypeStrings(guitarsByType));
  //   const strings = getCheckboxStrings(CHECKBOX_STRING_TYPE, filtersState);
  //   const guitarsSortedByString = getFilteredByString(guitarsByType, strings);
  //   const guitarsByPrice = getFilterByPrice(guitarsSortedByString, Number(filtersState.priceMin), Number(filtersState.priceMax));
  //
  //
  //   dispatch(setCurrentPage(CURRENT_PAGE_INIT));
  //   dispatch(setFilteredGuitars(guitarsByPrice));
  // }, [dispatch, filtersState, guitars]);


  // const handleChangeCheckbox = ( evt: ChangeEvent<HTMLInputElement>) => {
  //   const {name, checked} = evt.target;
  //
  //   if (filtersState[name] !== checked) {
  //     setFiltersState({...filtersState, [name]: checked});
  //   }
  // };
  const handleSetPriceState = (data: priceType) => {
    setPriceState({...priceState, outlet: data});
  };

  return (
    <form className="catalog-filter">
      <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>

      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Цена, ₽</legend>
        <div className="catalog-filter__price-range">

          <CatalogFilterPrice
            state={priceState}
            namePrice={priceName.priceMin}
            labelPrice={priceLabel.priceMin}
            cb={handleSetPriceState}
          />

          <CatalogFilterPrice
            state={priceState}
            namePrice={priceName.priceMax}
            labelPrice={priceLabel.priceMax}
            cb={handleSetPriceState}
          />

        </div>
      </fieldset>

      {/*<fieldset className="catalog-filter__block">*/}
      {/*  <legend className="catalog-filter__block-title">Тип гитар</legend>*/}
      {/*  {CHECKBOX_GUITAR_TYPE.map((checkbox) => (*/}
      {/*    <Checkbox*/}
      {/*      key={nanoid()}*/}
      {/*      isChecked={filtersState[checkbox.name]}*/}
      {/*      isDisabled={false}*/}
      {/*      checkbox={checkbox}*/}
      {/*      cb={handleChangeCheckbox}*/}
      {/*    />*/}
      {/*  ))}*/}
      {/*</fieldset>*/}

      {/*<fieldset className="catalog-filter__block">*/}
      {/*  <legend className="catalog-filter__block-title">Количество струн</legend>*/}
      {/*  {CHECKBOX_STRING_TYPE.map((checkbox) => (*/}
      {/*    <Checkbox*/}
      {/*      key={nanoid()}*/}
      {/*      isChecked={filtersState[checkbox.name]}*/}
      {/*      isDisabled={checkbox.string.some((string) => guitarTypeStringState.length > 0 && !guitarTypeStringState.includes(string))}*/}
      {/*      checkbox={checkbox}*/}
      {/*      cb={handleChangeCheckbox}*/}
      {/*    />*/}
      {/*  ))}*/}
      {/*</fieldset>*/}
    </form>
  );
}

export default  CatalogFilter;
