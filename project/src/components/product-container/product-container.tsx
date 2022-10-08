import {getTripleNumberString} from '../../common/utils';
import {StarRating} from '../star-rating/star-rating';
import {GUITAR_NULL, StarRatingClassName} from '../../common/const';
import {MouseEvent} from 'react';
import Tabs from '../tabs/tabs';
import {useSelector} from 'react-redux';
import {getCurrentGuitar} from '../../store/app-filter/selectors';

const STYLE = {
  height: 'inherit',
  width: 'auto',
  margin: 'auto',
};


function  ProductContainer(): JSX.Element {
  const currentGuitar = useSelector(getCurrentGuitar) || GUITAR_NULL;
  const {previewImg, name, rating, price, comments} = currentGuitar;

  const handleOnClickCart = (evt: MouseEvent<HTMLElement>) => {
    evt.preventDefault();
  };

  return (
    <div className='product-container'>
      <div className='product-container__img'>
        <img  style={STYLE} src={previewImg} width='90' height='235' alt={name} />
      </div>
      <div className='product-container__info-wrapper'>
        <h2 className='product-container__title title title--big title--uppercase'>{name}</h2>

        <StarRating rating={rating} commentsCount={String(comments.length)} className={StarRatingClassName.ProductContainer}/>

        <Tabs currentGuitar={currentGuitar}/>
      </div>
      <div className='product-container__price-wrapper'>
        <p className='product-container__price-info product-container__price-info--title'>Цена:</p>
        <p className='product-container__price-info product-container__price-info--value'>{getTripleNumberString(price)} ₽</p>
        <a
          className='button button--red button--big product-container__button'
          onClick={handleOnClickCart}
          href={'#top'}
        >
          Добавить в корзину
        </a>
      </div>
    </div>
  );
}

export default  ProductContainer;
