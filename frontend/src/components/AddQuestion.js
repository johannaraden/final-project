import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import '../styles/AddForm.css'
import { addQuestion } from '../reducers/question'

export const AddQuestion = () => {
  
  const dispatch = useDispatch()
  const [title, setTitle] = useState('')
  const [question, setQuestion] = useState('')
  const userId = useSelector((store) => store.user.login.userId)

  const handleSubmit = () => {
    console.log(title, question)
    dispatch(addQuestion(title, question, userId))
    setTitle('')
    setQuestion('')
  }

  return (
    <section className='form-div'>
      <form className='add-form' onSubmit={handleSubmit}>
        <section>
          <label>Title</label>
            <input
              className='add-title'
              type='text'
              onChange={(event) => setTitle(event.target.value)}
              value={title}
            />
        </section>
        <section>
          <label>Your question</label>
            <textarea
              rows='7'
              className='add-text'
              onChange={(event) => setQuestion(event.target.value)}
              value={question}
            ></textarea>
        </section>
          <input
          className='add-submit'
          type='submit'
          value='ask question'
          ></input>
      </form> 
      <div className='instruction-div'>
        <h3 className='add-instruction-headline'>Write your question here! </h3>
        <p className='add-instruction-p'>Include links to your own blog, social media etc.</p>
      </div>
    </section>
  )
}