import {StarRating} from '../star-rating/star-rating';
import {StarRatingClassName} from '../../common/const';
import {CommentType} from '../../types/stateType';
import {formatDateDDMMMMYYYY} from '../../common/utils';

type ReviewProps = {
  reviewComment: CommentType,
}

function  Review({reviewComment}: ReviewProps): JSX.Element {
  const {userName, advantage, disadvantage, comment, rating, createAt} = reviewComment;

  return (
    <div className='review'>
      <div className='review__wrapper'>
        <h4 className='review__title review__title--author title title--lesser'>{userName}</h4>
        <span className='review__date'>{formatDateDDMMMMYYYY(createAt)}</span>
      </div>
      <StarRating rating={rating} commentsCount='' className={StarRatingClassName.Review}/>
      <h4 className='review__title title title--lesser'>Достоинства:</h4>
      <p className='review__value'>{advantage}</p>
      <h4 className='review__title title title--lesser'>Недостатки:</h4>
      <p className='review__value'>{disadvantage}</p>
      <h4 className='review__title title title--lesser'>Комментарий:</h4>
      <p className='review__value'>{comment}</p>
    </div>
  );
}

export default  Review;
