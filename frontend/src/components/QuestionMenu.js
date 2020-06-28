import React, { useState, useSelector } from 'react'
import { Link, useHistory } from 'react-router-dom' 
import { useDispatch } from 'react-redux'
import { FilterButton, AskButton } from '../lib/button'
import '../styles/Questions.css'
import { SearchField } from 'lib/search-field'
import { question } from '../reducers/question'
import { AddQuestion } from './AddQuestion'



export const QuestionMenu = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const [showQuestionForm, setShowQuestionForm] = useState(false)
  const [search, setSearch] = useState('')

  const newQuestion = () => {
    setShowQuestionForm(true)
    if(showQuestionForm) {
      setShowQuestionForm(false)
    }
  }

  const sortByLikes = () => {
    // dispatch(login(name, password))
  }

 

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(search)
    let savedSearch = localStorage.getItem('questions')
    dispatch(question.actions.setSearchText({ searchText: search }))
    setSearch('')
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
      <form onSubmit={handleSubmit}>
        {/* Search field for filtering questions based on query */}
        <input className='main-search' type='search' placeholder='search question' value={search}
          onChange={(event) => setSearch(event.target.value)}/>
      </form>
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