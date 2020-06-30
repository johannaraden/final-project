import React,{ useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { question, questionSearch } from '../reducers/question'
import { SearchSummary } from '../components/SearchSummary'

export const SearchOverlay = () => {
  const dispatch = useDispatch()
  const [ searchText, setSearchText ] = useState()

  useEffect(() => {
    dispatch(question.actions.setSearchText({ errorMessage: null }))
  }, [dispatch])

  // const handleSubmit = (event) => {
  //   event.preventDefault()
  //   if (accessToken) {
  //     console.log(search)
  //     setSearch('')
  //     history.push('/questions')
  //   } else {
  //     setSearch('')
  //     alert('Log in to search for questions')
  //   }
  // }

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(searchText)
    // let savedSearch = localStorage.getItem('questions')
    dispatch(question.actions.setSearchText( searchText ))
    dispatch(questionSearch(searchText))
    setSearchText('')
  }

  const searchResult = useSelector(
    (store) => store.question.question.searchResult)

  return (  
    <div className='modal-container'>
      {console.log(searchResult)} 
      <form className='modal' onSubmit={handleSubmit}>
        <input className='main-search' type='search' placeholder='search question' value={searchText}
          onChange={(event) => setSearchText(event.target.value)}/>
        <button type='submit' className='search-submit'>search</button>
      </form>
      {searchResult && (
        <>
          {searchResult.map((item) => {
            return (
              <SearchSummary
              key={item._id} id={item._id} userId={item.userId} likes={item.likes} title={item.title} answers={item.answer} question={item.question} time={item.createdAt}
               />
            )}
           )}
        </>
      )}
      {searchResult && searchResult.length === 0 && (
        <p>Unfortunately we couldn't find any questions including this word</p>  
      )}
    </div>
  )
}