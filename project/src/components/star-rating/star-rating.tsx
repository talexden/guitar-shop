import {nanoid} from '@reduxjs/toolkit';
import {RATING_STAR_COUNT} from '../../common/const';
import StarRatingItem from '../star-rating-item/star-rating-item.test';

type StarRatingProps = {
  rating: number,
  commentsCount: number,
}

export function StarRating ({rating, commentsCount}:StarRatingProps):JSX.Element {
  return (
    <div className="rate product-card__rate" aria-hidden="true">
      <span className="visually-hidden">Рейтинг:</span>

      {[...Array(RATING_STAR_COUNT)].map((_x, i) => <StarRatingItem key={nanoid()} starNumber={i+1} rating={rating}/> )}

      <span className="rate__count">{commentsCount}</span>
      <span className="rate__message" />
    </div>
  );
}
