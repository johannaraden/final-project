import React from 'react'
import styled from 'styled-components/macro'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ForumHeadline = styled.h4`
  color: white;
  font-size: 1.8em;
  padding-left: 1em; 
  cursor: pointer;
  margin-top: 0;
`

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
    <ForumHeadline onClick={homeClick}>[Topic] Forum🎈</ForumHeadline>
  )
}