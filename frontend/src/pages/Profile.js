import React, { useState, useEffect } from 'react'
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
import { question } from '../reducers/question'


export const Profile = () => {
  const dispatch = useDispatch()
  const secretMessage = useSelector((store) => store.user.login.secretMessage)
  const userName = useSelector((store) => store.user.login.userName)
  const userId = useSelector((store) => store.user.login.userId)
  const [data, setData] = useState([])
  const [details, setDetails] = useState('')

  useEffect(() => {
    fetch(`http://localhost:8080/profile/${userId}/questions`)
    .then(res => 
      res.json()
    )
    .then((data) => {
      setData(data)
    })
  }, [])

  const chooseQuestion = (event, item) => {
    event.preventDefault()
    //dispatch thunk
    // dispatch(details(questionId))
    dispatch(question.actions.setTitle({ title: item.title }))
    setDetails('')
  }

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
          </TabList>
          <TabPanel tabId='vertical-tab-one'>
            {/* {secretMessage && <ProfileMessage> {secretMessage} </ProfileMessage>} */}
            <ProfileMessage>{userName}</ProfileMessage>
            <ProfileImg src='https://www.fillmurray.com/200/300' alt='profile picture' />
          </TabPanel>
          <TabPanel tabId='vertical-tab-two'>
            {/* Fetch and print out the questions for this user */}
            <h4>Your questions</h4>
            {data.map((item) => {
              return (
                <QuestionSummary onClick={event => chooseQuestion(event, item)}
                key={item._id} id={item._id} userId={item.userId} likes={item.likes} title={item.title} answers={item.answer} question={item.question} time={item.createdAt}
                />
                )}  
            )}
          </TabPanel>
        </Tabs>
      </div>
      </ProfileDiv>
    </ProfileInfo>
    </div>
  )
}

export default Profile