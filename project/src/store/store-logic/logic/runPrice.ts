import {PriceStoreType} from '../../app-filter/app-filter';
import {getMinMaxPrice} from '../../../common/get-min-max-price';
import {getUserPrice} from '../../../common/get-user-price';
import {filterByPrice} from '../../../common/filter-by-price';
import {GuitarType} from '../../../types/stateType';

export const runPrice = (filteredByCheckbox: GuitarType[], price: PriceStoreType) => {
  const checkboxPrice = getMinMaxPrice(filteredByCheckbox);
  const {userPrice, realUserPrice} =  getUserPrice(price.userPrice, checkboxPrice);
  const filteredByPrice = filterByPrice(filteredByCheckbox, realUserPrice);
  price = {userPrice, checkboxPrice};
  return {price, filteredByPrice};
};
