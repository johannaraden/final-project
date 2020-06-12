import React, { useState } from 'react'
import '../styles/AddForm.css'
import { useDispatch } from 'react-redux'
import { question } from '../reducers/question'


export const AddQuestion = () => {
  const dispatch = useDispatch()
  const [title, setTitle] = useState('')
  const [newQuestion, setNewQuestion] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    dispatch(question.actions.addQuestion(title, newQuestion))
    setTitle('')
    setNewQuestion('')
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
              onChange={(event) => setNewQuestion(event.target.value)}
              value={newQuestion}
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