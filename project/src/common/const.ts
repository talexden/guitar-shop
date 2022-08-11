import {CheckboxType} from '../types/const-type';

export const VIEW_CATALOG_COUNT = 9;

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

export enum Modal {
  Review = 'modal--review',
  SuccessReview = 'modal--success modal-success--review',
  SuccessAdd = 'modal--success modal-success--add',
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
  Next: {
    label: 'Далее',
    id: 'next',
    navigationClass: 'pagination__page--next',
  },
  Previous: {
    label: 'Назад',
    id: 'prev',
    navigationClass: 'pagination__page--prev',
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

export const inputName = {
  priceMin: 'priceMin',
  priceMax: 'priceMax',
};

export const CURRENT_PAGE_INIT = 1;
export const PAGINATION_COUNT = 3;
export const CORRECT_PRICE_DELAY = 1500;
export const UPDATE_URL_DELAY = 300;
export const SUCCESSFUL_SENDING_CODE = 200;
