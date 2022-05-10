import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  AppRoute, CHECKBOX_GUITAR_TYPE, CHECKBOX_STRING_TYPE,
  priceInput,
  UPDATE_URL_DELAY
} from '../../common/const';
import {
  getFilterByPrice
} from '../../common/filter';
import {
  redirectToRoute,
  setCheckboxStore,
  setCurrentPage,
  setUserPrice,
  setFilteredGuitars
} from '../../store/action';
import CatalogFilterPrice from '../catalog-filter-price/catalog-filter-price';
import {
  getCheckboxStore,
  getUserPrice,
  getGuitarsFilteredByCheckbox,
  getFilteredPrice
} from '../../store/app-filter/selectors';
import {GuitarType} from '../../types/stateType';
import {getGuitarsByPages} from '../../store/app-process/selectors';
import {checkboxStoreInit} from '../../store/app-filter/app-filter';
import {useParams} from 'react-router-dom';
import useDebounce from '../../hooks/use-debounce';
import CheckboxList from '../checkbox-list/checkbox-list';


function    CatalogFilter(): JSX.Element {
  const checkboxStore = useSelector(getCheckboxStore);
  const userPrice = useSelector(getUserPrice);
  const filteredPrice = useSelector(getFilteredPrice);
  const guitarsFilteredByCheckbox = useSelector(getGuitarsFilteredByCheckbox);
  const guitarsByPages = useSelector(getGuitarsByPages);
  const dispatch = useDispatch();
  const [urlSearchState, setUrlSearchState] = useState('');
  const [urlState, setUrlState] = useState('');
  const page: {pageIdx: string}  = useParams();

  const handleUrl = () => {
    const href = window.location.pathname + window.location.search;
    const pageNumber = Number(page.pageIdx);
    let url = `${AppRoute.Catalog}${pageNumber}`;
    if (urlSearchState !== '' && urlSearchState !== '?'){
      url = `${url}${urlSearchState}`;
    }
    if (url !== href) {
      setUrlState(url);
    }
  };

  const debounceHandleUrl = useDebounce(handleUrl, UPDATE_URL_DELAY);

  useEffect(()=>{
    debounceHandleUrl();
  }, [debounceHandleUrl, urlSearchState]);

  // create search URL
  useEffect(() => {
    const priceParams: string[] = [];
    if (userPrice.priceMin !== filteredPrice.priceMin && userPrice.priceMin !== '') {
      priceParams.push(`priceMin=${userPrice.priceMin}`);
    }
    if (userPrice.priceMax !== filteredPrice.priceMax && userPrice.priceMax !== '') {
      priceParams.push(`priceMax=${userPrice.priceMax}`);
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
  }, [userPrice, filteredPrice, checkboxStore, urlSearchState]);


  // redirect to url
  useEffect(()=>{
    const href = window.location.pathname + window.location.search;
    if (href !== urlState && urlState !== '') {
      dispatch(redirectToRoute(urlState));
    }
  }, [dispatch, urlState]);


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
    const search = window.location.search;
    if (urlState === ''  &&search !== '') {

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
        dispatch(setUserPrice(price));

        let checkbox = {...checkboxStore};
        if (params !== {}) {
          Object.keys(params).forEach((param)=>{
            const checkboxIsChecked = {...checkbox[param], isChecked: true};
            checkbox = {...checkbox, [param]: checkboxIsChecked};
          });
        } else {
          checkbox = {...checkboxStoreInit};
        }
        dispatch(setCheckboxStore(checkbox));
      }
    }
  }, [dispatch, checkboxStore, urlSearchState, urlState]);


  // Filtering by price
  useEffect(() => {
    let currentGuitars: GuitarType[] = [...guitarsFilteredByCheckbox];

    if (userPrice.priceMin !== '' || userPrice.priceMax !== '' ){
      const priceMin = userPrice.priceMin === '' ? filteredPrice.priceMin : userPrice.priceMin;
      const priceMax = userPrice.priceMax === '' ? filteredPrice.priceMax : userPrice.priceMax;
      currentGuitars = getFilterByPrice(currentGuitars, Number(priceMin), Number(priceMax));
    }
    dispatch(setFilteredGuitars(currentGuitars));
  }, [dispatch, guitarsFilteredByCheckbox, userPrice, filteredPrice]);

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

      <CheckboxList checkboxType={CHECKBOX_GUITAR_TYPE} />

      <CheckboxList checkboxType={CHECKBOX_STRING_TYPE} />

    </form>
  );
}

export default  CatalogFilter;
