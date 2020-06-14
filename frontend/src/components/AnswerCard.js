import React, { useState, useEffect } from 'react'
import '../styles/Questions.css'

  export const AnswerCard = () => {

    // fetch all answers for specific question


    return (
            <div className='answer'>
              <h4>Title</h4>
              <p>Created At</p>
              <p>Created by:</p>
              <hr></hr>
              <p>Text</p>
            </div>
    )
  }

export default AnswerCard