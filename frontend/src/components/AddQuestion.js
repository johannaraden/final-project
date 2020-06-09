import React, { useState } from 'react'
import '../styles/AddForm.css'
import { useDispatch } from 'react-redux'
// import { questions } from '../reducers/reducer'


export const AddQuestion = () => {
  const dispatch = useDispatch()
  const [inputValue, setInputValue] = useState('')

  // const handleSubmit = e => {
  //   // e.preventDefault()
  //   dispatch(questions.actions.addQuestion({
  //     question: {
  //       title: inputValue,
  //       question: inputValue
  //     }
  //   })
  //   )
  //   setInputValue('')
  // }
  return (
    <section className='form-div'>
      <form className='add-form'>
        {/* onSubmit={handleSubmit} */}
      <section>
          <label>Title</label>
            <input
              className='add-title'
              type='text'
              // value={title}
            />
        </section>
        <section>
          <label>Your question</label>
            <input
            className='add-text'
              type='text'
              // value={question}
            />
        </section>
          <input
          className='add-submit'
          type='submit'
          value='add question'
          ></input>
    </form> 
    <div>
      <h3 className='add-instruction-headline'>Write your question here! </h3>
      <p className='add-instruction-p'>Include links to your own blog, social media etc.</p>
    </div>
   </section>
  )
}