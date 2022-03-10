import {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  AppRoute,
  CHECKBOX_GUITAR_TYPE,
  CHECKBOX_STRING_TYPE,
  priceInput
} from '../../common/const';
import {
  getFilterByPrice,
  getFilteredByString
} from '../../common/filter';
import {
  redirectToRoute, setCheckboxStore, setCurrentPrice,
  setFilteredGuitars,
  setGuitarsFilteredByCheckbox,
  setGuitarStrings,
} from '../../store/action';
import {getGuitars} from '../../store/app-data/selectors';
import CatalogFilterPrice from '../catalog-filter-price/catalog-filter-price';
import CatalogFilterCheckbox from '../catalog-filter-checkbox/catalog-filter-сheckbox';
import {
  getCheckboxStore,
  getCurrentPrice,
  getGuitarsFilteredByCheckbox,
  getGuitarStrings,
  getFilteredPrice
} from '../../store/app-filter/selectors';
import {GuitarType} from '../../types/stateType';
import {StringsType} from '../../types/const-type';
import {getCurrentPage} from '../../store/app-process/selectors';
import useDebounce from '../../hooks/use-debounce';
import {checkboxStoreInit, PriceStoreType} from '../../store/app-filter/app-filter';

function    CatalogFilter(): JSX.Element {
  const guitars = useSelector(getGuitars);
  const checkboxStore = useSelector(getCheckboxStore);
  const currentPrice = useSelector(getCurrentPrice);
  const currentPage = useSelector(getCurrentPage);
  const guitarStrings = useSelector(getGuitarStrings);
  const filteredPrice = useSelector(getFilteredPrice);
  const guitarsFilteredByCheckbox = useSelector(getGuitarsFilteredByCheckbox);
  const dispatch = useDispatch();
  const [urlState, setUrlState] = useState('');


  // create search URL
  useEffect(() => {
    const priceParams: string[] = [];
    if (currentPrice.priceMin !== filteredPrice.priceMin && currentPrice.priceMin !== '') {
      priceParams.push(`priceMin=${currentPrice.priceMin}`);
    }
    if (currentPrice.priceMax !== filteredPrice.priceMax && currentPrice.priceMax !== '') {
      priceParams.push(`priceMax=${currentPrice.priceMax}`);
    }

    const checkboxParams: string[] = [];
    Object.keys(checkboxStore).forEach((key) => {
      if (checkboxStore[key].isChecked && !checkboxStore[key].isDisabled) {
        checkboxParams.push(`${key}=${checkboxStore[key].isChecked}`);
      }
    });

    const urlSearch = `?${[...priceParams, ...checkboxParams].join('&')}`;

    if (urlState !== urlSearch){
      setUrlState(urlSearch);
    }
  }, [currentPrice, filteredPrice, checkboxStore]);

  useEffect(()=>{
    let url = `${AppRoute.Catalog}${currentPage}`;
    if (urlState !== '' && urlState !== '?'){
      url = `${url}${urlState}`;
    }
    dispatch(redirectToRoute(url));
    console.log({url});
  }, [dispatch, urlState, currentPage]);


  // parsing Url
  // useEffect(()=>{
  //   const urlSearchParams = new URLSearchParams(window.location.search);
  //   const params = Object.fromEntries(urlSearchParams.entries());
  //   const currentUrl = window.location.pathname;
  //   if (currentUrl !== urlState){
  //     setUrlState(currentUrl);
  //     const urlPriceMin = params.priceMin ? params.priceMin : '';
  //     const urlPriceMax = params.priceMax ? params.priceMin : '';
  //     const price = {
  //       priceMin: urlPriceMin,
  //       priceMax: urlPriceMax,
  //     };
  //     delete params.priceMin;
  //     delete params.priceMax;
  //     dispatch(setCurrentPrice(price));
  //
  //     let checkbox = {...checkboxStore};
  //     if (params !== {}) {
  //       Object.keys(params).forEach((param)=>{
  //         const checkboxIsChecked = {...checkbox[param], isChecked: true};
  //         checkbox = {...checkbox, [param]: checkboxIsChecked};
  //       });
  //     } else {
  //       checkbox = {...checkboxStoreInit};
  //     }
  //
  //     dispatch(setCheckboxStore(checkbox));
  //
  //   }
  //
  // }, [dispatch, urlState]);


  // Filtering by checkbox
  useEffect(() => {
    let currentGuitars: GuitarType[] = [];
    let isChecked = false;
    let checkboxGuitarStrings: StringsType = [];

    CHECKBOX_GUITAR_TYPE.forEach((type) => {
      if (checkboxStore[type.name].isChecked) {
        isChecked = true;
      }
    });
    if (isChecked){
      CHECKBOX_GUITAR_TYPE.forEach((type) => {
        if (checkboxStore[type.name].isChecked) {
          const checkedTypeGuitars = guitars.filter((guitar) => checkboxStore[type.name] && guitar.type === type.name);
          currentGuitars = [...new Set([...currentGuitars, ...checkedTypeGuitars])];
          checkboxGuitarStrings = [...new Set([...checkboxGuitarStrings,...type.string])];
        }
      });
    }

    if (checkboxGuitarStrings !== guitarStrings) {
      dispatch(setGuitarStrings(checkboxGuitarStrings));
    }

    currentGuitars =  isChecked ? currentGuitars : [...guitars];

    isChecked = false;

    CHECKBOX_STRING_TYPE.forEach((type) => {
      if (checkboxStore[type.name].isChecked) {
        isChecked = true;
      }
    });

    if (isChecked) {
      let checkboxStrings: StringsType = [];
      CHECKBOX_STRING_TYPE.forEach((checkbox) => {
        const strings: StringsType = checkboxStore[checkbox.name].isChecked ? checkbox.string : [];
        checkboxStrings = [...new Set([...checkboxStrings,...strings])];
      });
      currentGuitars = getFilteredByString(currentGuitars, checkboxStrings);
    }

    dispatch(setGuitarsFilteredByCheckbox(currentGuitars));
  }, [dispatch, guitars, checkboxStore]);


  // Filtering by price
  useEffect(() => {
    let currentGuitars: GuitarType[] = [...guitarsFilteredByCheckbox];

    if (currentPrice.priceMin !== '' || currentPrice.priceMax !== '' ){
      const priceMin = currentPrice.priceMin === '' ? filteredPrice.priceMin : currentPrice.priceMin;
      const priceMax = currentPrice.priceMax === '' ? filteredPrice.priceMax : currentPrice.priceMax;
      currentGuitars = getFilterByPrice(currentGuitars, Number(priceMin), Number(priceMax));
    }
    dispatch(setFilteredGuitars(currentGuitars));
  }, [dispatch, guitarsFilteredByCheckbox, currentPrice]);

  return (
    <form className="catalog-filter">
      <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>

      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Цена, ₽</legend>
        <div className="catalog-filter__price-range">

          <CatalogFilterPrice inputType={priceInput.priceMin} />

          <CatalogFilterPrice inputType={priceInput.priceMax} />

        </div>
      </fieldset>

      <CatalogFilterCheckbox checkboxType={CHECKBOX_GUITAR_TYPE} />

      <CatalogFilterCheckbox checkboxType={CHECKBOX_STRING_TYPE} />

    </form>
  );
}

export default  CatalogFilter;
