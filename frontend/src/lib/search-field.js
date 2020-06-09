import React from 'react'
import styled from 'styled-components/macro'
import '../styles/Header.css'

const SearchDiv = styled.div`
  background-color: white;
  font-size: 1em;
`

const HomeDiv = styled.div`
  background-color: #72d2c6;
  display: flex;
  justify-content: space-between;
  padding: 0 1em;
`

const Search = styled.input`
  border: none;
  padding: 1em 2em;
  font-size: 1em;
  color: #4f4f4f;
`
const HomeSearch = styled.input`
  border-radius: 6px;
  border: none;
  margin: .3em 0;
  padding: 1em 2em;
  height: 1.4em;
`
 const ForumHeadline = styled.h4`
  color: white;
  font-size: 1.8em;
  padding-left: 1em; 
  `


export const MainSearch = () => {
  return (
    <HomeDiv>
      <ForumHeadline>[Topic] Forum🎈</ForumHeadline>
      <HomeSearch placeholder='search question' type='text'>
      </HomeSearch>
    </HomeDiv>
  )
}

export const SearchField = () => {
  return (
    <SearchDiv>
      <Search placeholder='search question' type='text'>
      </Search>
    </SearchDiv>
  )
}