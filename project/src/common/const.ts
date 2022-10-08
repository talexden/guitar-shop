import {CheckboxType} from '../types/const-type';
import {GuitarType} from '../types/stateType';

export enum AppRoute {
  Main = '/',
  Catalog = '/page',
  Shops = '/shops',
  About = '/about',
  ProductInfo = '/product-info',
  Cart = '/cart'
}

export enum APIRoute {
  Guitars = '/guitars',
  GuitarById = '/guitars/:id/',
  GuitarByIdComments = '/guitars/:id/comments',
  CommentPost = '/comments',
  CouponPost = '/coupons',
  OrderPost = '/orders'
}

export enum NavigationLabel {
  Main = 'Главная',
  Catalog = 'Каталог',
  About = 'О компании',
  Shops = 'Где купить',
}

export enum ScreenTemplateTitle {
  Catalog = 'Каталог гитар',
  Product = 'Товар',
  Cart = 'Корзина',
}


export const navigationItems = [
  {
    url: AppRoute.Catalog,
    label: NavigationLabel.Catalog,
  },
  {
    url: AppRoute.Shops,
    label: NavigationLabel.Shops,
  },
  {
    url: AppRoute.About,
    label: NavigationLabel.About,
  },
];

export enum FilterBlockTitle {
  Price = 'Цена, ₽',
  Type = 'Тип гитар',
  Strings = 'Количество струн',
}

export enum Modal {
  Review = 'modal--review',
  SuccessReview = 'modal--success modal-success--review',
  SuccessAdd = 'modal--success modal-success--add',
  CartAdd = 'modal-cart--add',
}

export enum StyleClassName {
  HeaderLogo = 'header__logo',
  FooterLogo = 'footer__logo',
  VisuallyHidden = 'visually-hidden',
  Hidden = 'hidden',
}

export enum StarIconUrl {
  iconFullStar = '/img/sprite_auto.svg#icon-full-star',
  iconStar = '/img/sprite_auto.svg#icon-star',
}

export enum ErrorTexts {
  LoadGuitarsFailMessage = 'Сервер не доступен. Попробуйте попозже',
  CommentPostFailMessage = 'Не удалось отправить комментарий. Попробуйте попозже',
}

export const RATING_STAR_COUNT = 5;

export const FORM_SEARCH_ITEM_TAB_INDEX = 0;

export const DEFAULT_CART_COUNT = 1;

export enum SortKey {
  Price = 'price',
  Rating = 'rating',
}

export enum SortDirect {
  LowToHigh = 1,
  HighToLow = -1,
}

export const CHECKBOX_GUITAR_TYPE: CheckboxType[] = [
  {
    label: 'Акустические гитары',
    name: 'acoustic',
    string: [6, 7, 12],
  },
  {
    label: 'Электрогитары',
    name: 'electric',
    string: [4, 6, 7],
  },
  {
    label: 'Укулеле',
    name: 'ukulele',
    string: [4],
  },
];

export const CHECKBOX_STRING_TYPE: CheckboxType[] = [
  {
    label: '4',
    name: '4-strings',
    string: [4],
  },
  {
    label: '6',
    name: '6-strings',
    string: [6],
  },
  {
    label: '7',
    name: '7-strings',
    string: [7],
  },
  {
    label: '12',
    name: '12-strings',
    string: [12],
  },
];

export const CARD_COUNT = 9;

export const PaginationNav = Object.freeze({
  PageNumber: {
    navigationClass: '',
    label: 'pageNumber',
    id: 'pageNumber',
  },
  Next: {
    label: 'Далее',
    id: 'pageNext',
    navigationClass: ' pagination__page--next',
  },
  Previous: {
    label: 'Назад',
    id: 'pagePrev',
    navigationClass: ' pagination__page--prev',
  },
});

export enum StarRatingClassName {
  ProductCard = ' product-card__rate',
  ProductContainer = ' product-container__rating',
  Review = ' review__rating-panel',
}

export const priceInput = {
  priceMin: {
    inputPriceName: 'priceMin',
    priceLabel: 'Минимальная цена',
  },
  priceMax: {
    inputPriceName: 'priceMax',
    priceLabel: 'Максимальная цена',
  },
};

export const NO_PARAMS = 'no-params=true';
export const CURRENT_PAGE_INIT = 1;
export const COMMENT_COUNT_INIT = 0;
export const PAGINATION_COUNT = 3;
export const SUCCESSFUL_SENDING_CODE = 200;
export const RESET_FILTER = {
  reset: true,
};

export const GUITAR_NULL: GuitarType = {
  id: 0,
  name: '',
  vendorCode: '',
  type: '',
  description:  '',
  previewImg: '',
  stringCount: 0,
  rating: 0,
  price: 0,
  comments: [],
};
