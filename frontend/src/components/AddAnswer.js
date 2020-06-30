import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import '../styles/AddForm.css'
import { question } from '../reducers/question'
import { addAnswer } from '../reducers/question'

export const AddAnswer = ({questionId}) => {
  const dispatch = useDispatch()
  const [text, setText] = useState('')
  const userId = useSelector((store) => store.user.login.userId) 
  console.log(questionId)

  const handleSubmit = () => {
    console.log(text)
    dispatch(addAnswer(text, questionId, userId))
    console.log(text, questionId, userId)
    setText('')
    // history.push(`/question/${questionId}`)
  }

  return (
    <section style={{'width': 'auto', 'marginTop': '2em'}}className='form-div'>
      <form className='add-form' onSubmit={handleSubmit}>
        <section>
          <label>Your Answer</label>
            <textarea
              rows='7'
              className='add-text'
              onChange={(event) => setText(event.target.value)}
              value={text}
            ></textarea>
        </section>
          <input
            className='add-submit'
            type='submit'
            value='add answer'
          ></input>
      </form> 
      <div className='instruction-div'>
        <h3 className='add-instruction-headline'>Write your answer here! </h3>
      </div>
    </section>
  )
}