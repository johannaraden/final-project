import React, { useState } from 'react'
import '../styles/AddForm.css'
import { useDispatch, useSelector } from 'react-redux'
import { question } from '../reducers/question'
import { addAnswer } from '../reducers/question'



export const AddAnswer = () => {
  const dispatch = useDispatch()
  const [text, setText] = useState('')
  const userId = useSelector((store) => store.user.login.userId)
  const questionId = useSelector((store) => store.user.question.questionId)
 

  

  const handleSubmit = e => {
    e.preventDefault()
    console.log(text)
    dispatch(addAnswer(text, questionId, userId))
    setText('')
  }

  return (
    <section className='form-div'>
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
      <p className='add-instruction-p'>Include links to your own blog, social media etc.</p>
    </div>
   </section>
  )
}