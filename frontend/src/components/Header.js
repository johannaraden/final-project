import React, { useState } from 'react'
import { Link } from 'react-router-dom' 
import { useSelector } from 'react-redux'
import '../styles/Header.css'
import { HeaderThumbnail } from './HeaderThumbnail'
import { Headline } from '../lib/forum-headline'
import Svg from '../lib/next.svg'
import { SearchOverlay } from '../components/SearchOverlay'

export const Header = () => {
  const accessToken = useSelector((store) => store.user.login.accessToken)
  const [isOpen, setIsOpen] = useState(false)

  const handleOnClick = () => {
    setIsOpen(!isOpen)
  }

  return (
    <section className='header-menu'>
      <div className='expandable-search'>
        <button className='search-button' onClick={handleOnClick}>
          <span>search❔</span>
        </button>        
      {isOpen && 
        <SearchOverlay></SearchOverlay>}
      </div>
      <div className='home-div'>
        <Headline />
      </div>
      <nav className='tab'>
        <input id='tab-one' type='checkbox' name='tabs' /> 
        <label htmlFor='tab-one'>MENU<img className='menu-arrow' src={Svg} alt='dropdown-arrow' /></label>
        <div className='tab-content'>
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