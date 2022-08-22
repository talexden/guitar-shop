import {GuitarType} from '../../types/stateType';
import {capitalizedString, getTripleNumberString} from '../../common/utils';
import {StarRating} from '../star-rating/star-rating';
import {AppRoute, Modal, StarRatingClassName} from '../../common/const';
import {openModal, redirectToRoute, setCurrentGuitar, setSelectedGuitar} from '../../store/action';
import {useDispatch} from 'react-redux';
import {MouseEvent} from 'react';
import {fetchCurrentGuitar} from '../../store/api-action';

type ProductCardProps = {
  guitar: GuitarType,
}

function  ProductCard({guitar}: ProductCardProps): JSX.Element {
  const {name, type, price, rating, previewImg, comments, id} = guitar;
  const dispatch = useDispatch();

  const handleAddToCart = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    dispatch(setSelectedGuitar(guitar));
    dispatch(openModal(Modal.CartAdd));
  };

  const handleOpenProductScreen = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    dispatch(setCurrentGuitar(guitar));
    dispatch(fetchCurrentGuitar(id));
    dispatch(redirectToRoute(`${AppRoute.ProductInfo}/${id}`));
  };

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
        <a
          className='button button--mini'
          onClick={handleOpenProductScreen}
          href={'#top'}
        >
          Подробнее
        </a>
        <a
          className='button button--red button--mini button--add-to-cart'
          onClick={handleAddToCart}
          href={'#top'}
        >
          Купить
        </a>
      </div>
    </div>
  );
}

export default  ProductCard;
