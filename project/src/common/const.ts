export const VIEW_CATALOG_COUNT = 9;

export enum AppRoute {
  Main = '/main',
  Catalogue = '/catalogue',
  ProductInfo = '/product-info',
  Cart = '/cart'
}

export enum APIRoute {
  Guitars = '/guitars',
  GuitarById = '/guitars/:id',
  GuitarByIdComments = '/guitars/:id/comments',
  CommentPost = '/comments',
  CouponPost = '/coupons',
  OrderPost = '/orders'
}

export enum StyleClassName {
  HeaderLogo = 'header__logo',
  FooterLogo = 'footer__logo',
}

export enum StarIconUrl {
  iconFullStar = 'img/sprite_auto.svg#icon-full-star',
  iconStar = 'img/sprite_auto.svg#icon-star',
}

// export enum ErrorTexts {
//   LoadQuestFailMessage = 'Сервер не доступен. Попробуйте попозже',
//   CommentPostFailMessage = 'Не удалось отправить комментарий. Попробуйте попозже',
// }

export const RATING_STAR_COUNT = 5;

