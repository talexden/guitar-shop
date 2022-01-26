import {RootState} from '../store/root-reducer';

export type CommentType = {
  id: string,
  userName: string,
  advantage: string,
  disadvantage: string,
  comment: string,
  rating: number,
  createAt: string,
  guitarId: number
};


export type GuitarType = {
  id: number,
  name: string,
  vendorCode: string,
  type: string,
  description:  string,
  previewImg: string,
  stringCount: number,
  rating: number,
  price: number,
  comments: CommentType[],
};
export type CommentPostType = {
  guitarId: number,
  userName: string,
  advantage: string,
  disadvantage: string,
  comment: string,
  rating: number,
};

export type CouponPostType = string;

export type OrderPostType = {
  guitarsIds: [number, number],
  coupon: CouponPostType,
};


export type StateType = RootState;
