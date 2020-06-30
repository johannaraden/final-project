import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import 'react-web-tabs/dist/react-web-tabs.css'
import { Tabs, Tab, TabPanel, TabList } from 'react-web-tabs'
import { Headline } from '../lib/headline'
import { ProfileMessage, ProfileImg, ProfileDiv, ProfileInfo } from '../lib/form'
import '../styles/Profile.css'
import { QuestionSummary } from 'components/QuestionSummary'
import { question } from '../reducers/question'


export const Profile = () => {
  const dispatch = useDispatch()
  const userName = useSelector((store) => store.user.login.userName)
  const userId = useSelector((store) => store.user.login.userId)
  const [data, setData] = useState([])
  const [details, setDetails] = useState('')

  useEffect(() => {
    fetch(`https://final-pr.herokuapp.com/profile/${userId}/questions`)
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

  let userStatus = data.length > 10 ? 'proper influencer' : data.length > 5 ? 'getting there' : 'beginner'
  let userStars = data.length > 10 ? '⭐⭐⭐' : data.length > 5 ? '⭐⭐' : '⭐'

  return (
    <div>
      <ProfileInfo>
        <Headline title='profile' />
        <ProfileDiv>
          <div className='tabs-profile-collection'>
            <Tabs defaultTab='vertical-tab-one' vertical>
              <TabList>
                <Tab tabFor='vertical-tab-one' className='tab'>Profile</Tab>
                <Tab tabFor='vertical-tab-two' className='tab'>Questions</Tab>
              </TabList>
              <TabPanel tabId='vertical-tab-one'>
                <div className='profile-info'>
                  <ProfileImg src='https://www.fillmurray.com/200/300' alt='profile picture' />
                  <div className='profile-details'>
                    <ProfileMessage>{userName}</ProfileMessage>
                    <span className='user-stars'>{userStars}</span>
                    <div className='user-activity'>
                      <p>Number of posted questions: <strong>{data.length}</strong></p>                
                      <p>User status: <strong>{userStatus}</strong></p>
                    </div>
                  </div>
                </div>
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