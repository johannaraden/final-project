import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import 'react-web-tabs/dist/react-web-tabs.css'
import { Tabs, Tab, TabPanel, TabList } from 'react-web-tabs'
import { Link } from 'react-router-dom'
import { user } from '../reducers/user'
import '../styles/Home.css'
import '../styles/Questions.css'
import { SearchSummary } from 'components/SearchSummary'
import { AnswerCard } from 'components/AnswerCard'

export const Home = () => {

  const userId = useSelector((store) => store.user.login.userId)
  const userName = useSelector((store) => store.user.login.userName)
  const [myQuestions, setMyQuestions] = useState([])
  const [myAnswers, setMyAnswers] = useState([])

  useEffect(() => {
    fetch(`https://final-pr.herokuapp.com/latest/${userId}/questions`)
      .then(res => 
        res.json()
      )
      .then((data) => {
        setMyQuestions(data)
      })
  }, [])

  useEffect(() => {
    fetch(`https://final-pr.herokuapp.com/latest/${userId}/answers`)
      .then(res => 
        res.json()
      )
      .then((data) => {
        setMyAnswers(data)
      })
  }, [])

    
  return (
    <section className='home-page'>
      <div className='home-header'>
        <h2>Welcome {userName}</h2>
        <p>This is your latest activity</p>
      </div>
      <div className='tabs-home-collection'>
      <Tabs defaultTab='vertical-tab-one' vertical>
        <TabList>
          <Tab className='tab' tabFor='vertical-tab-one'>Your latest questions</Tab>
          <Tab className='tab' tabFor='vertical-tab-two'>Your latest answers</Tab>
        </TabList>
        <TabPanel tabId='vertical-tab-one' className='home-tab'>
          {myQuestions && myQuestions.length === 0 &&
            <div className='no-activity'>
              <p>You don't have any recent activity!</p>
              <Link to='/questions'>Ask the community!</Link>
            </div>
          }
          {myQuestions.map((item) => {
            return (
              <Link to='/profile' key={item._id}>
              <SearchSummary
                key={item._id} id={item._id} userId={item.userId} title={item.title} likes={item.likes} answers={item.answer} question={item.question}
              />
              </Link>
            )
          })}
        </TabPanel>
        <TabPanel tabId='vertical-tab-two' className='home-tab'>
          {myAnswers && myAnswers.length === 0 &&
            <div className='no-activity'>
              <p>You don't have any recent activity!</p>
              <Link to='/questions'>Ask the community!</Link>
            </div>
          }
          {myAnswers.map((item) => {
            return (
              <Link to='/profile' key={item._id}>
              <AnswerCard
                key={item._id} id={item._id} userId={item.userId} likes={item.likes} title={item.title} text={item.text}  time={item.createdAt}
              />
              </Link>
            )
          })}
        </TabPanel>
      </Tabs>
      </div>
    </section>
  )
}

export default Home