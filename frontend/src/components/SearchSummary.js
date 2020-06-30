import React from 'react'
import { Link } from 'react-router-dom' 
import moment from 'moment'
import { ButtonInput } from '../lib/button'
import '../styles/Questions.css'



export const SearchSummary = (props) => {
  const { id, likes, time, question, title } = props

  return (
    <div className='search-summary'>
      <Link to={`/question?id=${id}`} >
        <div className='search-summary-header'>
          <h1 className='search-summary-item'>{title}</h1>
          {/* Calculation with moment for setting the time that has passed since publication */}
          <p>{moment(time).format('MMMM Do YYYY, h:mm:ss a')}</p>
        </div>
        <hr></hr>
        <div className='search-summary-body'>
          <p className='search-summary-text' key={props.id}>{props.question}</p>        
        </div>
      </Link>
    </div>
  )
}