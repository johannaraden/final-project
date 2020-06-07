import React from 'react'
import { Link } from 'react-router-dom' 
import { useDispatch } from 'react-redux'
import { FilterButton } from '../lib/button'
import '../styles/Questions.css'
import { SearchField } from 'lib/search-field'

export const QuestionMenu = () => {

  return (
    <div class="questions-menu">
      <div className='questions-options'>
        <FilterButton>Most popular</FilterButton>
        <FilterButton>Unanswered</FilterButton>
        <FilterButton></FilterButton>
        <SearchField />
      </div>
    </div>
    // Conditional rendering of profile picture&log out button
  )
}