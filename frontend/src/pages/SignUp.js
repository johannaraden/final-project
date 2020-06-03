import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'
import { user, signup } from '../reducers/user'
import { Headline } from '../lib/headline'
import { Button } from '../lib/button'
import { Form, InfoDiv, Input, Register } from '../lib/form'


export const SignUp = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const accessToken = useSelector((store) => store.user.login.accessToken)
  const errorMessage = useSelector((store) => store.user.login.errorMessage)
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (accessToken) {
      history.push('/secret')
      console.log('push successful')
    }
  })
  useEffect(() => {
    dispatch(user.actions.setErrorMessage({ errorMessage: null }))
  })
  // To sign up a user.
  const handleSignup = (event) => {
    event.preventDefault()
    //dispatch thunk
    dispatch(signup(name, email, password))
  }

  if (!accessToken) {
    // If user is logged out, show login form
    return (
      <div>
        <Form onSubmit={(event) => handleSignup(event)}>
          <Headline title='sign up' />
          <InfoDiv>
            {errorMessage && <h4>{`${errorMessage}`}</h4>}
            <Input
              placeholder='name'
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            <Input
              type='email'
              placeholder='email'
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <Input
              type='password'
              placeholder='password'
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <Button type='submit' title='Sign up' />
            <Register>Already a member?<Link to='/login'>Log in</Link></Register>
          </InfoDiv>
        </Form>
      </div>
    )
  }
  else {
    return (null)
  }
}

export default SignUp