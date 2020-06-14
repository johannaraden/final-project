import React from 'react'
import { user } from '../reducers/user'
import { useSelector } from 'react-redux'
import 'react-web-tabs/dist/react-web-tabs.css'
import { Tabs, Tab, TabPanel, TabList } from 'react-web-tabs'
import '../styles/Home.css'

export const Home = () => {

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
          <Tab tabFor='vertical-tab-one'>Your latest questions</Tab>
          <Tab tabFor='vertical-tab-two'>Your latest answers</Tab>
        </TabList>
        <TabPanel tabId='vertical-tab-one'>
          <p>Tab 1 content</p>
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