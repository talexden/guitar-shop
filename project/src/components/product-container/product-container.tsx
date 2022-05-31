import {getTripleNumberString} from '../../common/utils';
import {StarRating} from '../star-rating/star-rating';
import {StarRatingClassName} from '../../common/const';
import {GuitarType} from '../../types/stateType';
import {useState, MouseEvent} from 'react';

const STYLE = {
    height: 'inherit',
    width: 'auto',
    margin: 'auto',
};

type ProductContainerType = {
  currentGuitar: GuitarType,
}

function  ProductContainer({currentGuitar}: ProductContainerType): JSX.Element {
  const {previewImg, name, rating, vendorCode, type, stringCount, description, price, comments} = currentGuitar;
  const [tabState, setTabState] = useState({isCharacteristics: true, isDescription: false});

  const handleOnClickCharacteristics = (evt: MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    setTabState({
      isCharacteristics: true,
      isDescription: false,
    })
  };

  const handleOnClickDescription = (evt: MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    setTabState({
      isCharacteristics: false,
      isDescription: true,
    })
  };

  const handleOnClickCart = (evt: MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    console.log('handleOnClickCart');
  };

  return (
    <div className="product-container">
      <div className="product-container__img">
        <img  style={STYLE} src={previewImg} width="90" height="235" alt={name} />
      </div>
      <div className="product-container__info-wrapper">
        <h2 className="product-container__title title title--big title--uppercase">{name}</h2>

        <StarRating rating={rating} commentsCount={String(comments.length)} className={StarRatingClassName.ProductContainer}/>

        <div className="tabs">
          <a
            className={`${tabState.isCharacteristics ? '' : 'button--black-border '} button button--medium tabs__button`}
            onClick={handleOnClickCharacteristics}
            href="#characteristics"
          >Характеристики</a>
          <a
            className={`${tabState.isDescription ? '' : 'button--black-border '} button button--medium tabs__button`}
            onClick={handleOnClickDescription}
            href="#description"
          >Описание</a>
          <div className="tabs__content" id="characteristics">
            <table className={`${tabState.isCharacteristics ? '' : 'hidden '}tabs__table`}>
              <tbody>
                <tr className="tabs__table-row">
                  <td className="tabs__title">Артикул:</td>
                  <td className="tabs__value">{vendorCode}</td>
                </tr>
                <tr className="tabs__table-row">
                  <td className="tabs__title">Тип:</td>
                  <td className="tabs__value">{type}</td>
                </tr>
                <tr className="tabs__table-row">
                  <td className="tabs__title">Количество струн:</td>
                  <td className="tabs__value">{stringCount} струнная</td>
                </tr>
              </tbody>
            </table>
            <p className={`${tabState.isDescription ? '' : 'hidden '}tabs__product-description`}>{description}</p>
          </div>
        </div>
      </div>
      <div className="product-container__price-wrapper">
        <p className="product-container__price-info product-container__price-info--title">Цена:</p>
        <p className="product-container__price-info product-container__price-info--value">{getTripleNumberString(price)} ₽</p>
        <a
          className="button button--red button--big product-container__button"
          onClick={handleOnClickCart}
          href="#top"
        >Добавить в корзину</a>
      </div>
    </div>
  );
}

export default  ProductContainer;
