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
