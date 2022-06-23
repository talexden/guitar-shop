import Review from '../review/review';
import {CommentType} from '../../types/stateType';
import {useEffect, useState, MouseEvent} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getCommentCount, getCurrentGuitar} from '../../store/app-filter/selectors';
import {setCommentCount} from '../../store/action';

const STYLE = {
  zIndex: 1,
};

const COUNT = 3;

const COMMENTS_INIT: CommentType[] = [];

function  ReviewsList(): JSX.Element {
  const currentGuitar = useSelector(getCurrentGuitar);
  const dispatch = useDispatch();
  const commentCount = useSelector(getCommentCount);
  const [currentComments, setCurrentComments] = useState(COMMENTS_INIT);

  const handleOnClick = () => {
    dispatch(setCommentCount(commentCount + COUNT));
  };

  useEffect(() => {
    dispatch(setCommentCount(COUNT));
  }, [currentGuitar]);

  useEffect(() => {
    if (currentGuitar) {
      setCurrentComments(currentGuitar.comments.slice(0, commentCount));
    }
  }, [commentCount]);

  // When the user scrolls down - click button
  window.onscroll = function() {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      handleOnClick();
    }
  };


  // When the user clicks on the button, scroll to the top of the document
  const handlerTopFunction = (evt: MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  };

  return (
    <section className="reviews">
      <h3 className="reviews__title title title--bigger">Отзывы</h3>
      <a className="button button--red-border button--big reviews__sumbit-button" href="#top">Оставить отзыв</a>
      <div>
        {currentComments.map((reviewComment) => (
          <Review reviewComment={reviewComment} key={`reviewComment-${reviewComment.id}`}/>
        ))}
      </div>
      <button
        onClick={handleOnClick}
        className="button button--medium reviews__more-button"
      >Показать еще отзывы
      </button>
      <a
        className="button button--up button--red-border button--big reviews__up-button"
        onClick={handlerTopFunction}
        style={STYLE}
        href="#header"
      >Наверх
      </a>
    </section>
  );
}

export default  ReviewsList;
