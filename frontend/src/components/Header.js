import React from 'react'
import '../styles/Header.css'
import { Link } from 'react-router-dom' 
import { useSelector } from 'react-redux'
import { HeaderThumbnail } from './HeaderThumbnail'
import { MainSearch } from '../lib/search-field'
import Svg from '../lib/next.svg'

export const Header = () => {

  const accessToken = useSelector((store) => store.user.login.accessToken);

    return (
      <section className='header-menu'>
      <MainSearch/>
      <nav className='tab'>
          <input id='tab-one' type="checkbox" name="tabs" /> 
          <label for='tab-one'>MENU<img className='menu-arrow' src={Svg} alt="dropdown-arrow" /></label>
          <div className="tab-content">
            {accessToken && <HeaderThumbnail />}
            <Link className='link' to='/'>home</Link>
            <Link className='link' to='/questions'>questions</Link>
            <Link className='link' to='/profile'>profile</Link>
          </div>
      </nav>
      </section>
        // Conditional rendering of profile picture&log out button
    )
}