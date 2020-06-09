import React, { useState } from 'react'
import { Link } from 'react-router-dom' 
import { useDispatch } from 'react-redux'
import { FilterButton, AskButton } from '../lib/button'
import '../styles/Questions.css'
import { SearchField } from 'lib/search-field'
import { AddQuestion } from './AddQuestion'


export const QuestionMenu = () => {

  const [showQuestionForm, setShowQuestionForm] = useState(false)
// const dispatch = useDispatch()

  const newQuestion = () => {
    setShowQuestionForm(true)
    if(showQuestionForm) {
      setShowQuestionForm(false)
    }
  }
  return (
    <>
    <div className='questions-menu'>
      <FilterButton>Most popular</FilterButton>
      <FilterButton>Unanswered</FilterButton>
      <form className='questions-options'>
        {/* add onChange */}
        <select name='question-sorting' defaultValue=' ' className='question-sorting'>
          <option value=' '>Options</option>
          <option value='newest-first'>Newest first</option>
          <option value='oldest-first'>Oldest first</option>
          <option value='most-answers'>Most answers</option>
          <option value='least-answers'>Least answers</option>
        </select>
      </form> 
      <SearchField />
      <AskButton type="button" onClick={newQuestion}>
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