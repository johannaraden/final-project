import React, { useState } from 'react'
import { FilterButton, AskButton } from '../lib/button'
import '../styles/Questions.css'
import { AddQuestion } from './AddQuestion'



export const QuestionMenu = () => {
  const [showQuestionForm, setShowQuestionForm] = useState(false)

  const newQuestion = () => {
    setShowQuestionForm(true)
    if(showQuestionForm) {
      setShowQuestionForm(false)
    }
  }

  const sortByLikes = () => {
    // dispatch(login(name, password))
  }

  return (
    <>
    <div className='questions-menu'>
      <FilterButton onClick={sortByLikes}>Most popular</FilterButton>
      <FilterButton>Unanswered</FilterButton>
      <form className='questions-options'>
        <select name='question-sorting' defaultValue=' ' className='question-sorting'>
          <option value=' '>Options</option>
          <option value='newest-first'>Newest first</option>
          <option value='oldest-first'>Oldest first</option>
          <option value='most-answers'>Most answers</option>
          <option value='least-answers'>Least answers</option>
        </select>
      </form> 
      <AskButton type='button' onClick={newQuestion}>
          Ask!
      </AskButton>   
    </div>
    <section>
      {showQuestionForm && (
        <AddQuestion>
        </AddQuestion>
      )}
    </section>
    </>
  )
}