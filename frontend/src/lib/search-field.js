import React from 'react'
import styled from 'styled-components/macro'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import '../styles/Header.css'

const SearchDiv = styled.div`
  background-color: white;
  font-size: 1em;
`

const SearchForm = styled.form`

`

const HomeDiv = styled.div`

`

const HomeForm = styled.form`

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
  cursor: pointer;
  `

export const MainSearch = () => {
  
  



  return (
      <HomeForm>
        <HomeSearch placeholder='search question' type='search'>
        </HomeSearch>
        <button type='submit'>sök</button>
      </HomeForm>
  )
}

export const SearchField = () => {
  return (
        <Search placeholder='search question' type='search'>
        </Search>
  )
}