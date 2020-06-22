import React from 'react'
import '../styles/Header.css'
import { Link } from 'react-router-dom' 
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../reducers/user'

export const HeaderThumbnail = () => {
  const dispatch = useDispatch()
  const userName = useSelector((store) => store.user.login.userName)

  return (
    <div className="thumbnail">
      <Link to='/profile'>
        <img className='header-thumbnail' src='https://www.fillmurray.com/50/50' alt='profile picture'></img>
      </Link>
      <Link to='/profile'>
        <p>Welcome {userName}</p>
      </Link>
      <Link to='/'><button type='submit' onClick={() => dispatch(logout())} value='Log Out'>log out</button></Link>
    </div>
  )
}