import {NameSpace} from '../root-reducer';
import {CommentPost, CouponPost, Guitar, OrderPost, State} from '../../types/state';

export const getSortedGuitars = (state: State): Guitar[] => state[NameSpace.process].sortedGuitars;
export const getCommentPost = (state: State): CommentPost | null => state[NameSpace.process].commentPost;
export const getCouponPost = (state: State): CouponPost => state[NameSpace.process].couponPost;
export const getOrderPost = (state: State): OrderPost | null => state[NameSpace.process].orderPost;
