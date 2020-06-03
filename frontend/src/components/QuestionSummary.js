import React from 'react'
import { Link } from 'react-router-dom' 
import { useDispatch } from 'react-redux'
import moment from 'moment'


export const QuestionSummary = (props) => {
  const {id, likes, time, question} = props
  const dispatch = useDispatch()

  const likeClick = () => {
    fetch(`https://technigo-thoughts.herokuapp.com/${id}/like`, {
      method: "POST",
      body: "",
      headers: { "Content-Type": "application/json" }
    }).then(() => props.onLiked(id))
  }
  return (
    <div className='question-summary'>
      <Link to={`/question/${id}`}>
        <h4 key={props.id}>{props.question}</h4>
        <span className={likes > 10 ? "lots" : likes > 5 ? "few" : "none" } onClick={likeClick}>
        {/* Conditional operators for setting different classes depending on number of likes */}
        <img className="heart" alt="heart-icon" src="https://img.icons8.com/cotton/64/000000/like--v1.png"/>
        </span>
        <p className="like-p">x {likes}</p>
        <p className="time">{moment(time).fromNow()}</p>
        {/* Calculation with moment for setting the time that has passed since publication */}
      </Link>
    </div>
  )
}