import {GuitarType} from '../../types/stateType';
import {capitalizedString, getTripleNumberString} from '../../common/utils';
import {StarRating} from '../star-rating/star-rating';
import {AppRoute, StarRatingClassName} from '../../common/const';
import {Link} from 'react-router-dom';

type ProductCardProps = {
  guitar: GuitarType,
}

function  ProductCard({guitar}: ProductCardProps): JSX.Element {
  const {name, type, price, rating, previewImg, comments, id} = guitar;

  return (
    <div className='product-card'>
      <img src={previewImg} width='75' height='190' alt={`${name} ${type}`} />
      <div className='product-card__info'>
        <StarRating rating={rating} commentsCount={String(comments.length)} className={StarRatingClassName.ProductCard}/>
        <p className='product-card__title'>{`${name} ${capitalizedString(type)}`}</p>
        <p className='product-card__price'>
          <span className='visually-hidden'>Цена:</span>
          {getTripleNumberString(price)} ₽
        </p>
      </div>
      <div className='product-card__buttons'>
        <Link to={`${AppRoute.ProductInfo}/${id}`} className='button button--mini'>Подробнее</Link>
        <a className='button button--red button--mini button--add-to-cart' href={'#top'}>Купить</a>
      </div>
    </div>
  );
}

export default  ProductCard;
