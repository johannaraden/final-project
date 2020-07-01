import React,{ useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Modal from 'react-modal'
import { question, questionSearch } from '../reducers/question'
import { SearchSummary } from './SearchSummary'
import '../styles/Search.css'


export const SearchBar = () => {
  const dispatch = useDispatch()
  const [ searchText, setSearchText ] = useState()
  const [open, setOpen] = useState(false)
  const [modalIsOpen,setIsOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  function openModal() {
    setIsOpen(true);
  }

  function closeModal(){
    setIsOpen(false);
  }

  useEffect(() => {
    dispatch(question.actions.setSearchText({ errorMessage: null }))
  }, [dispatch])

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(searchText)
    // let savedSearch = localStorage.getItem('questions')
    dispatch(question.actions.setSearchText( searchText ))
    dispatch(questionSearch(searchText))
    setOpen(true)
    setSearchText('')
  }

  const searchResult = useSelector(
    (store) => store.question.question.searchResult)

  return (  
    <div className='top-search'>
     <button className='search-button' onClick={openModal}>
        <p>search</p>
      </button>
      <div className='modal-container'>
      
      {/* <div className='expandable-search'> */}
      {/* <form className='modal' onSubmit={handleSubmit}>
        <input className='main-search' type='search' placeholder='search question' value={searchText}
          onChange={(event) => setSearchText(event.target.value)}/>
        <button type='submit' className='search-submit'>search</button>
        <button className='search-submit'>close</button>
      </form>
        
      </div>        */}
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
        >
          <div className='modal-header'>
            <h2>Search the community</h2>
            <button className='search-close' onClick={closeModal}>close</button>
          </div>
          <form className='modal' onSubmit={handleSubmit}>
        <input className='modal-search' type='search' placeholder='search question' value={searchText}
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
        </Modal>
      {console.log(searchResult)} 
    </div>
    </div>
  )
}