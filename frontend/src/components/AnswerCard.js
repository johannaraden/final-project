import React, { useState, useEffect } from 'react'
import '../styles/Questions.css'
import '../styles/Answers.css'
import moment from 'moment'
import { useDispatch } from 'react-redux'
import { answerLike } from '../reducers/question'



  export const AnswerCard = (props) => {
    const {id, likes, time, questionId, text, userId} = props
    const [user, setUser] = useState()
    const dispatch = useDispatch()

    useEffect(() => {
      if(userId && userId) {
        fetch(`http://localhost:8080/user/${userId}`)
        .then((res) => {
          if (res.ok) {
            return res.json()
          }
          console.log(res, 'found User!')
          throw 'Could not find user.'
        })
        .then((data) => {
          setUser(data)
        })
      } 
    }, [])

    const likeClick = () => {
      //dispatching thunk
      dispatch(answerLike(id))
    }

    return (
            <div className='answer-card'>
              <div className='answer-header'>
              <div className=''>
                <p>Created At: {moment(time).format('MMMM Do YYYY, h:mm:ss a')}</p>
                {console.log(id)}
                {user && (
                  <p>Created by: <strong>{user.name}</strong></p>
                )}
              </div>
              <div className='answer-likes'>
                <span onClick={likeClick}>
                  {/* Conditional operators for setting different classes depending on number of likes */}
                  <img className='answer-heart' alt='heart-icon' src="https://img.icons8.com/cotton/64/000000/like--v1.png" />
                </span>
                <p className='answer-like-p'>liked <strong>{likes}</strong> times</p>
              </div>
              </div>
                <hr></hr>
              <div className=''>
                <p>{text}</p>
              </div>
            </div>
    )
  }

export default AnswerCard