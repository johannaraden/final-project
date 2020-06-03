import React from 'react'
import '../styles/Header.css'
import { Link } from 'react-router-dom' 
import { useDispatch } from 'react-redux'
import { logout } from '../reducers/user'

export const HeaderThumbnail = () => {
  const dispatch = useDispatch()

  return (
    <div class="thumbnail">
      <Link to='/profile'>
        <img className='header-thumbnail' src='https://www.fillmurray.com/50/50' alt='profile picture'></img>
      </Link>
      <Link to='/profile'>
        <p>Welcome 'name'</p>
      </Link>
      <Link to='/login'><button type='submit' onClick={() => dispatch(logout())} value='Log Out'>log out</button></Link>
    </div>
    // Conditional rendering of profile picture&log out button
  )
}