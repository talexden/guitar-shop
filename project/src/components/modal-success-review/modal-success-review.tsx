import ModalCloseButton from '../modal-close-button/modal-close-button';
import {closeModal} from '../../store/action';
import {useDispatch} from 'react-redux';
import {noScrollRemove} from '../../common/no-scroll';

function ModalSuccessReview ():JSX.Element {
  const dispatch = useDispatch();
  const handleRedirectToCatalog = () => {
    noScrollRemove();
    dispatch(closeModal());
  };

  return (
    <div className="modal__content">
      <svg className="modal__icon" width="26" height="20" aria-hidden="true">
        <use xlinkHref="#icon-success" />
      </svg>
      <p className="modal__message">Спасибо за ваш отзыв!</p>
      <div className="modal__button-container modal__button-container--review">
        <button
          className="button button--small modal__button modal__button--review"
          onClick={handleRedirectToCatalog}
          type='button'
        >
          К покупкам!
        </button>
      </div>
      <ModalCloseButton />
    </div>
  );
}

export default ModalSuccessReview;
