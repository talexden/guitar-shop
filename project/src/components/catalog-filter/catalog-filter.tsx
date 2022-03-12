import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  AppRoute,
  CHECKBOX_GUITAR_TYPE,
  CHECKBOX_STRING_TYPE, CURRENT_PAGE_INIT,
  priceInput, UPDATE_URL_DELAY,
} from '../../common/const';
import {
  getFilterByPrice,
  getFilteredByString
} from '../../common/filter';
import {
  redirectToRoute, setCheckboxStore, setCurrentPage, setCurrentPrice,
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
import {getCurrentPage, getGuitarsByPages} from '../../store/app-process/selectors';
import {checkboxStoreInit} from '../../store/app-filter/app-filter';
import {useParams} from 'react-router-dom';
import useDebounce from '../../hooks/use-debounce';


function    CatalogFilter(): JSX.Element {
  const guitars = useSelector(getGuitars);
  const checkboxStore = useSelector(getCheckboxStore);
  const currentPrice = useSelector(getCurrentPrice);
  const guitarStrings = useSelector(getGuitarStrings);
  const filteredPrice = useSelector(getFilteredPrice);
  const guitarsFilteredByCheckbox = useSelector(getGuitarsFilteredByCheckbox);
  const guitarsByPages = useSelector(getGuitarsByPages);
  const dispatch = useDispatch();
  const [urlSearchState, setUrlSearchState] = useState('');
  const [urlState, setUrlState] = useState(`${AppRoute.Catalog}${CURRENT_PAGE_INIT}`);
  const [realUrlState, setRealUrlState] = useState(`${AppRoute.Catalog}${CURRENT_PAGE_INIT}`);
  const page: {pageIdx: string}  = useParams();

  const handleUrl = () => {
    const href = window.location.pathname + window.location.search;
    if (href === realUrlState) {
      const pageNumber = Number(page.pageIdx);
      let url = `${AppRoute.Catalog}${pageNumber}`;
      if (urlSearchState !== '' && urlSearchState !== '?'){
        url = `${url}${urlSearchState}`;
      }
      if (url !== href) {
        setUrlState(url);
      }
    }
  };

  const debounceHandleUrl = useDebounce(handleUrl, UPDATE_URL_DELAY);

  useEffect(()=>{
    const href = window.location.pathname + window.location.search;
    console.log({urlState, realUrlState, });
  }, [urlSearchState]);

  useEffect(()=>{
    debounceHandleUrl();
  }, [urlSearchState]);

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
    if (urlSearchState !== urlSearch) {
      setUrlSearchState(urlSearch);
    }
  }, [currentPrice, filteredPrice, checkboxStore, urlSearchState]);


  // redirect to url
  useEffect(()=>{
    const href = window.location.pathname + window.location.search;
    if (href === realUrlState && href !== urlState && urlState !== '') {
      setRealUrlState(urlState);
      dispatch(redirectToRoute(urlState));
    }
  }, [dispatch, urlState, realUrlState]);


  // correct page number
  useEffect(() => {
    let correctedPage = Number(page.pageIdx);
    if (guitarsByPages.length > 0 && guitarsByPages.length < correctedPage) {
      correctedPage = guitarsByPages.length;
      dispatch(setCurrentPage(correctedPage));
    }
    dispatch(setCurrentPage(correctedPage));
  }, [dispatch, page, guitarsByPages]);


  // parsing Url
  useEffect(()=>{
    const href = window.location.pathname + window.location.search;
    if (href !== realUrlState && realUrlState === urlState) {
      console.log('lll');
      const currentUrlSearch = window.location.search;
      const urlSearchParams = new URLSearchParams(currentUrlSearch);
      const params = Object.fromEntries(urlSearchParams.entries());
      if (currentUrlSearch !== urlSearchState && urlSearchState !== '?'){
        setUrlSearchState(currentUrlSearch);
        const urlPriceMin = params.priceMin ? params.priceMin : '';
        const urlPriceMax = params.priceMax ? params.priceMin : '';
        const price = {
          priceMin: urlPriceMin,
          priceMax: urlPriceMax,
        };
        delete params.priceMin;
        delete params.priceMax;
        console.log({price});
        dispatch(setCurrentPrice(price));

        let checkbox = {...checkboxStore};
        if (params !== {}) {
          Object.keys(params).forEach((param)=>{
            const checkboxIsChecked = {...checkbox[param], isChecked: true};
            checkbox = {...checkbox, [param]: checkboxIsChecked};
          });
        } else {
          checkbox = {...checkboxStoreInit};
        }
        console.log({checkbox});
        dispatch(setCheckboxStore(checkbox));
      }
    }
  }, [dispatch, urlSearchState, realUrlState, urlState]);


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
