import React from 'react'
import { Link } from 'react-router-dom' 
import moment from 'moment'
import { ButtonInput } from '../lib/button'
import '../styles/Questions.css'



export const QuestionSummary = (props) => {
  const { id, likes, time, question, title } = props

  return (
    <div className='question-summary'>
      <Link to={`/question?id=${id}`} >
        <div className='summary-header'>
          <h1 className='summary-item'>{title}</h1>
          {/* Calculation with moment for setting the time that has passed since publication */}
          <p className='summary-item time'>{moment(time).format('MMMM Do YYYY, h:mm:ss a')}</p>
          <p className='summary-item like-p'>{likes}<br/> likes</p>
        </div>
        <hr></hr>
        <div className='summary-body'>
          <p className='summary-text' key={props.id}>{props.question}</p>
          <ButtonInput>read more ➡</ButtonInput>
        </div>
      </Link>
    </div>
  )
}