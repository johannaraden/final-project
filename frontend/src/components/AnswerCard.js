import React, { useState, useEffect } from 'react'
import '../styles/Questions.css'


  export const AnswerCard = (props) => {
    const {answerId, likes, time, questionId, text, userId} = props
    // fetch all answers for specific question
   

    return (
            <div className='answer'>
              <p>Created At: {time}</p>
              <p>Created by:{userId}</p>
              <hr></hr>
              <p>{text}</p>
            </div>
    )
  }

export default AnswerCard