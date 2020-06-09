import React from 'react'
import { Link } from 'react-router-dom' 
import { useDispatch } from 'react-redux'
import moment from 'moment'
import { ButtonInput } from '../lib/button'
import '../styles/Questions.css'



export const QuestionSummary = (props) => {
  const {id, likes, time, question, title} = props
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
        <div className='summary-header'>
          <h1 className='summary-item'>Headline{title}</h1>
          <p className='summary-item time'>{moment(time).fromNow()}</p>
          <p className='summary-item like-p'>{likes}<br/> likes</p>
        </div>
        <hr></hr>
        <div className='summary-body'>
          <p className='summary-text' key={props.id}>{props.question}</p>
          {/* Calculation with moment for setting the time that has passed since publication */}
          <ButtonInput>read more ➡</ButtonInput>
        </div>
      </Link>
    </div>
  )
}