import {nanoid} from '@reduxjs/toolkit';
import {ChangeEvent, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  AppRoute,
  CHECKBOX_GUITAR_TYPE,
  CHECKBOX_STRING_TYPE,
  CORRECT_PRICE_DELAY,
  CURRENT_PAGE_INIT,
  priceLabel, priceInput,
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
import Checkbox from '../checkbox/checkbox';
import {getCurrentPage, getFilteredGuitars} from '../../store/app-process/selectors';
import CatalogFilterPrice from '../catalog-filter-price/catalog-filter-price';
import CatalogFilterCheckbox from '../catalog-filter-checkbox/catalog-filter-сheckbox';

// const getCheckboxState = (checkboxType: CheckboxType[]): checkboxStateType => {
//   const checkboxState: checkboxStateType = {inlet: {}, outlet: {}};
//   checkboxType.forEach((checkbox) => {
//     Object.assign(
//       checkboxState,
//       {
//         inlet: {
//           [checkbox.name]: {
//             isChecked: false,
//             isDisabled: false,
//           },
//         },
//         outlet: {
//           [checkbox.name]: {
//             isChecked: false,
//             isDisabled: false,
//           },
//         },
//       },
//     );
//   });
//   return checkboxState;
// };

function  CatalogFilter(): JSX.Element {
  // const guitars = useSelector(getGuitars);
  // const currentPage = useSelector(getCurrentPage);
  // const filteredGuitars = useSelector(getFilteredGuitars);
  // const dispatch = useDispatch();
  //
  // const checkboxStateInit: checkboxStateType =
  //   Object.assign(
  //     {},
  //     getCheckboxState(CHECKBOX_GUITAR_TYPE),
  //     getCheckboxState(CHECKBOX_STRING_TYPE),
  //   );

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

  return (
    <form className="catalog-filter">
      <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>

      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Цена, ₽</legend>
        <div className="catalog-filter__price-range">

          <CatalogFilterPrice
            inputType={priceInput.priceMin}
          />

          <CatalogFilterPrice
            inputType={priceInput.priceMax}
          />

        </div>
      </fieldset>

      <CatalogFilterCheckbox checkboxType={CHECKBOX_GUITAR_TYPE}/>

      <CatalogFilterCheckbox checkboxType={CHECKBOX_STRING_TYPE}/>

    </form>
  );
}

export default  CatalogFilter;
