import React from 'react'
import { user, logout } from '../reducers/user'
import { Headline } from '../lib/headline'
import { InputButton, ProfileImg } from '../lib/button'
import { ProfileMessage, ProfileDiv, ProfileInfo } from '../lib/form'
import { useDispatch, useSelector } from 'react-redux'
import { QuestionDetails } from '../components/QuestionDetails'
import { Link } from 'react-router-dom'
import 'react-web-tabs/dist/react-web-tabs.css'
import { Tabs, Tab, TabPanel, TabList } from 'react-web-tabs'
import '../styles/Profile.css'
import { QuestionSummary } from 'components/QuestionSummary'


export const Profile = () => {
  const dispatch = useDispatch()
  const secretMessage = useSelector((store) => store.user.login.secretMessage)
  const userName = useSelector((store) => store.user.login.userName)

  return (
    <div>
    <ProfileInfo>
      <Headline title='profile' />
      <ProfileDiv>
      <div className='tabs-profile-collection'>
          <Tabs defaultTab='vertical-tab-one' vertical>
          <TabList>
            <Tab tabFor='vertical-tab-one'>Profile</Tab>
            <Tab tabFor='vertical-tab-two'>Questions</Tab>
            <Tab tabFor='vertical-tab-two'>Settings</Tab>
          </TabList>
          <TabPanel tabId='vertical-tab-one'>
            {/* {secretMessage && <ProfileMessage> {secretMessage} </ProfileMessage>} */}
            <ProfileMessage>{userName}</ProfileMessage>
            <ProfileImg src='https://www.fillmurray.com/200/300' alt='profile picture' />
          </TabPanel>
          <TabPanel tabId='vertical-tab-two'>
            {/* Fetch and print out the questions for this user */}
            <h4>Your questions</h4>
            {/* {data.map((item) => {
              <QuestionSummary />
            })} */}
          </TabPanel>
        </Tabs>
      </div>
      </ProfileDiv>
    </ProfileInfo>
    </div>
  )
}

export default Profile