import React from 'react'
import styled from 'styled-components/macro'

const SearchDiv = styled.div`
  background-color: #72d2c6;
  display: flex;
  justify-content: flex-end;
`
const Search = styled.input`
  border-radius: 6px;
  padding: .2em;
  border: none;
  margin: .5em;
`


export const SearchField = () => {
  return (
    <SearchDiv>
      <Search placeholder='search question' type='text'>
      </Search>
    </SearchDiv>
  )
}