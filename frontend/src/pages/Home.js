import React from 'react'
import { user } from '../reducers/user'
import { useSelector } from 'react-redux'

export const Home = () => {

  const userName = useSelector((store) => store.user.login.userName)
    return (
      <section>
        <p>This is home</p>
        <p>This is your latest activity {userName}!</p>
      </section>
    )
}

export default Home