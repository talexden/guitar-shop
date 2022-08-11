import {useDispatch} from 'react-redux';
import {noScrollRemove} from '../../common/no-scroll';
import {closeModal} from '../../store/action';


function ModalCloseButton ():JSX.Element {
  const dispatch = useDispatch();

  const handleCloseModal = () => {
    noScrollRemove();
    dispatch(closeModal());
  };

  return (
    <button
      className='modal__close-btn button-cross'
      onClick={handleCloseModal}
      type='button'
      aria-label='Закрыть'
    >
      <span className='button-cross__icon'></span>
      <span className='modal__close-btn-interactive-area'></span>
    </button>
  );
}

export default ModalCloseButton;
