import React, { useState, useEffect } from 'react'
import '../styles/Header.css'
import { Link, useHistory } from 'react-router-dom' 
import { useSelector, useDispatch } from 'react-redux'
import { HeaderThumbnail } from './HeaderThumbnail'
import { Headline } from '../lib/forum-headline'
import Svg from '../lib/next.svg'
import { question } from '../reducers/question'
import { SearchOverlay } from '../components/SearchOverlay'

export const Header = () => {
  const history = useHistory()
  const accessToken = useSelector((store) => store.user.login.accessToken)
  const [search, setSearch] = useState('')
  const dispatch = useDispatch()
  const [showModal, setShowModal] = useState(true)
  const [isOpen, setIsOpen] = useState(false)

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

  const handleClick = (event) => {
    event.preventDefault()
    
    
  }

  const handleOnClick = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    dispatch(question.actions.setSearchText({ errorMessage: null }))
  }, )
 

return (
  <section className='header-menu'>
    <div className='home-div'>
     <Headline />
     <div>
     <button onClick={handleOnClick}>
       <span>search❔</span>
      </button>        
      {isOpen && 
        <SearchOverlay></SearchOverlay>}
      </div>


      {/* <Modal className='search-modal' isOpen={false}>
          <h3>This is search field modal</h3>
        </Modal> */}
          {/* <form onSubmit={(event) => handleSubmit(event)}> */}
            {/* <input className='main-search' type='search' placeholder='search question' value={search}
              onChange={handleChange} onFocus={Modal.isOpen=true}/> */}
              {/* onChange={(event) => setSearch(event.target.value)} */}
          {/* </form> */}
        </div>
        <nav className='tab'>
          <input id='tab-one' type="checkbox" name="tabs" /> 
          <label for='tab-one'>MENU<img className='menu-arrow' src={Svg} alt="dropdown-arrow" /></label>
          <div className="tab-content">
  {/* Conditional rendering of profile picture, log out button and links */}
            {accessToken && <HeaderThumbnail />}
            {accessToken && 
              <>
              <Link className='link' to='/'>home</Link>
              <Link className='link' to='/questions'>questions</Link>
              <Link className='link' to='/profile'>profile</Link>
              </>
              }
              {!accessToken && <p>Please log in to share your knowledge 🤸‍♀️</p>}
          </div>
        </nav>
      </section>
    )
}