import React from 'react'
import '../styles/Header.css'
import { Link } from 'react-router-dom' 
import { HeaderThumbnail } from './HeaderThumbnail'
import Svg from '../lib/next.svg'

export const Header = () => {

    return (
      <nav class='tab'>
          <input id='tab-one' type="checkbox" name="tabs" /> 
          <label for='tab-one'>Menu<img className='menu-arrow' src={Svg} alt="dropdown-arrow" />
</label>
          <div class="tab-content">
            <HeaderThumbnail />
            <Link className='link' to='/'>home</Link>
            <Link className='link' to='/questions'>questions</Link>
            <Link className='link' to='/profile'>profile</Link>
          </div>
      </nav>
        // Conditional rendering of profile picture&log out button
    )
}