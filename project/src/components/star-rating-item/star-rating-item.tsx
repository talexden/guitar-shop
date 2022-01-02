import {StarIconUrl} from '../../common/const';

type StarRatingItemProps = {
  starNumber: number,
  rating: number,
}

function  StarRatingItem({starNumber, rating}: StarRatingItemProps): JSX.Element {
  return (
    <svg width="12" height="11" aria-hidden="true">
      <use xlinkHref={starNumber <= Math.floor(rating) ? StarIconUrl.iconFullStar : StarIconUrl.iconStar} />
    </svg>
  );
}

export default  StarRatingItem;
