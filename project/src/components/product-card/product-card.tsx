import {GuitarType} from '../../types/stateType';
import {capitalizedString, getTripleNumberString} from '../../common/utils';
import {StarRating} from '../star-rating/star-rating';

type ProductCardProps = {
  guitar: GuitarType,
}

function  ProductCard({guitar}: ProductCardProps): JSX.Element {
  const {name, type, price, rating, previewImg} = guitar;

  return (
    <div className="product-card">
      <img src={previewImg} width="75" height="190" alt={`${name} ${type}`} />
      <div className="product-card__info">
        <StarRating rating={rating}/>
        <p className="product-card__title">{`${name} ${capitalizedString(type)}`}</p>
        <p className="product-card__price">
          <span className="visually-hidden">Цена:</span>
          {getTripleNumberString(price)} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        <a className="button button--mini" href="#top">Подробнее</a>
        <a className="button button--red button--mini button--add-to-cart" href="#top">Купить</a>
      </div>
    </div>
  );
}

export default  ProductCard;
