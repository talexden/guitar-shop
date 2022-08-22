import {CSSProperties} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import ModalReview from '../modal-review/modal-review';
import {getModal} from '../../store/app-process/selector';
import {Modal} from '../../common/const';
import ModalSuccessAdd from '../modal-success-add/modal-success-add';
import {noScrollAdd, noScrollRemove} from '../../common/no-scroll';
import ModalSuccessReview from '../modal-success-review/modal-success-review';
import {closeModal} from '../../store/action';
import ModalCartAdd from '../modal-cart-add/modal-cart-add';

const STYLE: CSSProperties = {
  position: 'relative',
  width: '550px',
  height: '610px',
  marginBottom: '50px',
};

function ModalScreen ():JSX.Element {
  const modal = useSelector(getModal);
  const dispatch = useDispatch();

  const handleCloseModal = () => {
    noScrollRemove();
    dispatch(closeModal());
    window.removeEventListener('keydown', escFunction);
  };

  const escFunction = (evt: KeyboardEvent) => {
    if (evt.key === 'Escape') {
      handleCloseModal();
    }
  };

  window.addEventListener('keydown', escFunction);


  noScrollAdd();

  return (
    <div style={STYLE}>
      <div className={`modal is-active ${modal} modal-for-ui-kit`}>
        <div className='modal__wrapper'>
          <div
            className='modal__overlay'
            onClick={handleCloseModal}
          >
          </div>
          {modal === Modal.Review && <ModalReview />}
          {modal === Modal.SuccessReview && <ModalSuccessReview />}
          {modal === Modal.SuccessAdd && <ModalSuccessAdd />}
          {modal === Modal.CartAdd && <ModalCartAdd />}
        </div>
      </div>
    </div>
  );
}

export default ModalScreen;
