import React from 'react'
import styled from 'styled-components/macro'
import Svg from './next.svg'

export const GoBack = styled.img`
  width: .8em;
  margin-left: .4em;
  filter: invert(1)
    &:hover {
      background: palevioletred;
      color: white;
   } 
`

export const BackArrow = () => {
  return (
    <GoBack className='back-arrow' src={Svg} alt="back-arrow">
    </GoBack>
  )
}