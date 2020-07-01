import React from 'react'
import styled from 'styled-components/macro'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import '../styles/Header.css'

export const Headline = () => {
  const accessToken = useSelector((store) => store.user.login.accessToken);
  const history = useHistory()

// Conditional that sets if person is logged in - then send to home page - if not logged in - then send to '/'
  const homeClick = (event) => {
    if(accessToken) {
      history.push('/home')
    } else {
        history.push('/')
      }
  }
  
  return (
    <h4 className='forum-headline' onClick={homeClick}>[Topic] Forum🎈</h4>
  )
}