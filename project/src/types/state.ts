import {RootState} from '../store/root-reducer';

export type Guitar = {
  id: number,
  name: string,
  vendorCode: string,
  type: string,
  description:  '',
  previewImg: '',
  stringCount: number,
  rating: number,
  price: number,
};

export type Comment = {
  id: string,
  userName: string,
  advantages: string,
  disadvantages: string,
  comment: string,
  rating: number,
  createAt: string,
  guitarId: number
};

export type CommentPost = {
  guitarId: number,
  userName: string,
  advantage: string,
  disadvantage: string,
  comment: string,
  rating: number,
};

export type CouponPost = string;

export type OrderPost = {
  guitarsIds: [number, number],
  coupon: CouponPost,
};

export type AppData = {
  guitars: Guitar[],
  guitarsById: Guitar | null,
  comments: Comment[],
  isLoading: boolean,
}

export type AppProcess = {
  sortedGuitars: Guitar[],
  commentPost: CommentPost | null,
  couponPost: CouponPost,
  orderPost: OrderPost | null,
}

export type State = RootState;
