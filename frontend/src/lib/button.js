import React from 'react'
import styled from 'styled-components/macro'


export const ButtonInput = styled.button`
  margin-top: 0;
  color: #4f4f4f;
  text-align: center;
  padding: .2em 0;
  text-align: center;
  margin-top: 1em;
  &:hover {
    background: palegoldenrod;
    color: white;
    border: 2px solid white;
    cursor: pointer;
  }
  @media (max-width: 500px) {
    font-size: 1em;
    padding: .5em 1em;
  }
  @media (max-width: 770px) {
    font-size: 1em;
    padding: .5em 1em;
  }
`
export const FilterButton = styled.button`
  color: #4f4f4f;
  padding: 1em 2em;
  text-align: center;
  font-size: 1em;
  border: none;
  &:hover {
    background: palegoldenrod;
    color: white;
    cursor: pointer;
  } 
`
export const AskButton = styled.button`
  background-color: #85D8CE;
  padding: 1em 2em;
  text-align: center;
  font-size: 1em;
  margin-left: 2em;
  border: none;
  &:hover {
    background: palegoldenrod;
    color: white;
    cursor: pointer;
  } 
`

export const Button = ({ title }) => {
  return (
    <ButtonInput>
      {title}
    </ButtonInput>
  )
}
