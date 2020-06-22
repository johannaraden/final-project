import React, { useState } from 'react'
import '../styles/Header.css'
import { Link } from 'react-router-dom' 
import { useSelector } from 'react-redux'
import { HeaderThumbnail } from './HeaderThumbnail'
import { MainSearch } from '../lib/search-field'
import { Headline } from '../lib/forum-headline'
import Svg from '../lib/next.svg'


export const Header = () => {

  const accessToken = useSelector((store) => store.user.login.accessToken)
  const [search, setSearch] = useState('')

  const handleSubmit = (event) => {
    console.log(search)
    console.log('hej')
    alert('hej')
  }

    return (
      <section className='header-menu'>
        <div className='home-div'>
          <Headline />
          <MainSearch onSubmit={handleSubmit} value={search}
            onChange={(event) => setSearch(event.target.value)}/>
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