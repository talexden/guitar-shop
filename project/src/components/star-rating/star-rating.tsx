import {RATING_STAR_COUNT} from '../../common/const';
import StarRatingItem from '../star-rating-item/star-rating-item';

type StarRatingProps = {
  rating: number,
  commentsCount: string,
  className: string,
}

export function StarRating ({rating, commentsCount, className}:StarRatingProps):JSX.Element {
  return (
    <div className={`rate${className}`} aria-hidden='true'>
      <span className='visually-hidden'>Рейтинг:</span>

      {[...Array(RATING_STAR_COUNT)].map((_x, i) => <StarRatingItem key={`StarRatingItem-${i.toString()}`} starNumber={i+1} rating={rating}/> )}

      <span className='rate__count'>{commentsCount}</span>
      <span className='rate__message' />
    </div>
  );
}
