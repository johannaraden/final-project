import React, { useState, useEffect } from 'react'
import { user } from '../reducers/user'
import { useSelector } from 'react-redux'
import 'react-web-tabs/dist/react-web-tabs.css'
import { Tabs, Tab, TabPanel, TabList } from 'react-web-tabs'
import { Link } from 'react-router-dom'
import '../styles/Home.css'
import { QuestionSummary } from 'components/QuestionSummary'

export const Home = () => {

  const userId = useSelector((store) => store.user.login.userId)
  const [data, setData] = useState([])

  useEffect(() => {
    fetch(`http://localhost:8080/latest/${userId}/questions`)
    .then(res => 
      res.json()
    )
    .then((data) => {
      setData(data)
    })
  }, [])


  const userName = useSelector((store) => store.user.login.userName)
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
          <TabPanel tabId='vertical-tab-one'>
            {data && data.length === 0 &&
              <div className='no-activity'>
                <p>You don't have any recent activity!</p>
                <Link to='/questions'>Ask the community!</Link>
              </div>
            }
            {data.map((item) => {
              return (
                <Link to='/profile'>
                  <QuestionSummary
                  key={item._id} id={item._id} userId={item.userId} likes={item.likes} title={item.title} answers={item.answer} question={item.question} time={item.createdAt}
                  />
                </Link>
          )}  
        )}
          </TabPanel>
          <TabPanel tabId='vertical-tab-two'>
            <p>Tab content</p>
          </TabPanel>
        </Tabs>
      </div>
      </section>
    )
}

export default Home