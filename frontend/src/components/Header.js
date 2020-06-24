import React, { useState } from 'react'
import '../styles/Header.css'
import { Link, useHistory } from 'react-router-dom' 
import { useSelector } from 'react-redux'
import { HeaderThumbnail } from './HeaderThumbnail'
import { Headline } from '../lib/forum-headline'
import Svg from '../lib/next.svg'


export const Header = () => {
  const history = useHistory()
  const accessToken = useSelector((store) => store.user.login.accessToken)
  const [search, setSearch] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    if (accessToken) {
      console.log(search)
      setSearch('')
      history.push('/questions')
    } else {
      setSearch('')
      alert('Log in to search for questions')
    }
  }

    return (
      <section className='header-menu'>
        <div className='home-div'>
          <Headline />
          <form onSubmit={(event) => handleSubmit(event)}>
            <input className='main-search' type='search' placeholder='search question' value={search}
              onChange={(event) => setSearch(event.target.value)}/>
          </form>
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