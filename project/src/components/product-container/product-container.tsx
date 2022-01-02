import {useSelector} from 'react-redux';
import {getGuitarsById} from '../../store/app-data/selectors';
import {getTripleNumberString} from '../../common/utils';
import LoadingScreen from '../loading-screen/loading-screen';
import {StarRating} from '../star-rating/star-rating';


function  ProductContainer(): JSX.Element {
  const guitar = useSelector(getGuitarsById);

  if (guitar === null) {
    return(<LoadingScreen />);
  } else {
    const {previewImg, name, rating, vendorCode, type, stringCount, description, price} = guitar;
    return (
      <div className="product-container">
        <img className="product-container__img" src={previewImg} width="90" height="235" alt="" />
        <div className="product-container__info-wrapper">
          <h2 className="product-container__title title title--big title--uppercase">{name}</h2>

          <StarRating rating={rating} />

          <div className="tabs">
            <a className="button button--medium tabs__button" href="#characteristics">Характеристики</a>
            <a className="button button--black-border button--medium tabs__button" href="#description">Описание</a>
            <div className="tabs__content" id="characteristics">
              <table className="tabs__table">
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
              </table>
              <p className="tabs__product-description hidden">{description}</p>
            </div>
          </div>
        </div>
        <div className="product-container__price-wrapper">
          <p className="product-container__price-info product-container__price-info--title">Цена:</p>
          <p className="product-container__price-info product-container__price-info--value">{getTripleNumberString(price)} ₽</p>
          <a className="button button--red button--big product-container__button" href="#">Добавить в корзину</a>
        </div>
      </div>
    );
  }
}

export default  ProductContainer;
