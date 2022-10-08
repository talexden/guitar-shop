import Review from '../review/review';
import {CommentType} from '../../types/stateType';
import {useEffect, useState, MouseEvent} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getCommentCount, getCurrentGuitar} from '../../store/app-filter/selectors';
import {openModal, setCommentCount} from '../../store/action';
import {Modal} from '../../common/const';

const STYLE = {
  zIndex: {
    zIndex: 1,
  },
  hidden: {
    visibility: 'hidden',
  },
} as const;


const SHOW_MORE_COUNT = 3;

const COMMENTS_INIT: CommentType[] = [];

function  ReviewsList(): JSX.Element {
  const currentGuitar = useSelector(getCurrentGuitar);
  const dispatch = useDispatch();
  const commentCount = useSelector(getCommentCount);
  const [currentComments, setCurrentComments] = useState(COMMENTS_INIT);

  let showMoreStyle = {};
  if (currentGuitar && currentGuitar.comments.length < commentCount) {
    showMoreStyle = STYLE.hidden;
  }

  useEffect(() => {
    dispatch(setCommentCount(SHOW_MORE_COUNT));
  }, [currentGuitar, dispatch]);

  useEffect(() => {
    if (currentGuitar) {
      setCurrentComments(currentGuitar.comments.slice(0, commentCount));
    }
  }, [commentCount, dispatch, currentGuitar]);

  const handleOpenModalReview = (evt: MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    dispatch(openModal(Modal.Review));
  };

  const handleShowMore = () => {
    dispatch(setCommentCount(commentCount + SHOW_MORE_COUNT));
  };

  // When the user scrolls down - click button
  window.onscroll = function() {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 1) {
      handleShowMore();
    }
  };


  // When the user clicks on the button, scroll to the top of the document
  const handlerTopFunction = (evt: MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  };

  return (
    <section className='reviews'>
      <h3 className='reviews__title title title--bigger'>Отзывы</h3>
      <a
        className='button button--red-border button--big reviews__sumbit-button'
        onClick={handleOpenModalReview}
        href={'#top'}
      >
        Оставить отзыв
      </a>
      <div>
        {currentComments.map((reviewComment) => (
          <Review reviewComment={reviewComment} key={`reviewComment-${reviewComment.id}`}/>
        ))}
      </div>
      <button
        onClick={handleShowMore}
        className='button button--medium reviews__more-button'
        style={showMoreStyle}
      >Показать еще отзывы
      </button>
      <a
        className='button button--up button--red-border button--big reviews__up-button'
        onClick={handlerTopFunction}
        style={STYLE.zIndex}
        href={'#header'}
      >Наверх
      </a>
    </section>
  );
}

export default  ReviewsList;
