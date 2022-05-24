import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  CHECKBOX_GUITAR_TYPE,
  CHECKBOX_STRING_TYPE,
  priceInput
} from '../../common/const';

import {
  redirectToRoute,
  setCurrentPage
} from '../../store/action';

import CatalogFilterPrice from '../catalog-filter-price/catalog-filter-price';
import {
  getCheckboxStore,
  getUserPrice,
  getFilteredPrice
} from '../../store/app-filter/selectors';
import {getGuitarsByPages} from '../../store/app-filter/selectors';
import {useParams} from 'react-router-dom';
import CheckboxList from '../checkbox-list/checkbox-list';


function    CatalogFilter(): JSX.Element {
  const checkboxStore = useSelector(getCheckboxStore);
  const userPrice = useSelector(getUserPrice);
  const filteredPrice = useSelector(getFilteredPrice);
  const guitarsByPages = useSelector(getGuitarsByPages);
  const dispatch = useDispatch();
  const page: {pageIdx: string}  = useParams();

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
    dispatch(redirectToRoute(urlSearch));
  }, [dispatch, userPrice, filteredPrice, checkboxStore]);


  // correct page number
  useEffect(() => {
    let correctedPage = Number(page.pageIdx);
    if (guitarsByPages.length > 0 && guitarsByPages.length < correctedPage) {
      correctedPage = guitarsByPages.length;
      dispatch(setCurrentPage(correctedPage));
    }
    dispatch(setCurrentPage(correctedPage));
  }, [dispatch, page, guitarsByPages]);

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
