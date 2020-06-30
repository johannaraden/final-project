import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import moment from 'moment'
import { AnswerCard } from '../components/AnswerCard'
import { BackArrow } from '../lib/go-back'
import '../styles/Questions.css'
import '../styles/Answers.css'
import { questionLike } from '../reducers/question'
import { AskButton } from '../lib/button'
import { AddAnswer } from './AddAnswer'

export const QuestionDetails = (props) => {
  let search = window.location.search
  let params = new URLSearchParams(search)
  let id = params.get('id')
  const dispatch = useDispatch()
  const [question, setQuestion] = useState()
  const [answer, setAnswer] = useState()
  const [showAnswerForm, setShowAnswerForm] = useState(false)
  const [user, setUser] = useState()
  const { _id } = useParams()

  useEffect(() => {
    fetch(`https://final-pr.herokuapp.com/question/${id}`)
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        console.log(res, 'found Question!')
        throw 'Could not find question.'
      })
      .then((data) => {
        setQuestion(data)
      })
  }, [id])

  // Want to change state in reducer in order to fetch the choosen questions answers 

  useEffect(() => {
    if(question && question.userId) {
      fetch(`https://final-pr.herokuapp.com/user/${question.userId}`)
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
  }, [question])

  useEffect(() => {
    fetch(`https://final-pr.herokuapp.com/question/${id}/answers`)
      .then((res) => {
        if (res.ok) {
          console.log(id)
          return res.json()
        }
        throw 'Could not find answers.'
      })
      .then((data) => {
        setAnswer(data)
      })
  }, [id])


  //Dispatching thunk for question like
  const likeClick = () => {
    dispatch(questionLike(id))
  }

  const newAnswer = () => {
    setShowAnswerForm(true)
    if (showAnswerForm) {
      setShowAnswerForm(false)
    }
  }

  return (
    <section className='details-page'>
      <Link to={'/questions'} className='back'>
        <BackArrow className='to-list-arrow'></BackArrow>
        <p>To list</p>
      </Link>
      {/* render when api res */}
      {question && (
        <div className='question-details-page'>
          <div className='question-detail-header'>
            <div className='header-about'>
              <h2 className='question-headline'>{question.title}</h2>
              <p>{moment(question.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</p>
              {user && (
                <p>Created by: <strong>{user.name}</strong></p>
              )}
              <p>{question.id}</p>
            </div>
            <div className='header-likes'>
              <span className={question.likes > 10 ? 'lots' : question.likes > 5 ? 'few' : 'none'} onClick={likeClick}>
                {/* Conditional operators for setting different classes depending on number of likes */}
                <img className='heart' alt='heart-icon' src='https://img.icons8.com/cotton/64/000000/like--v1.png' />
              </span>
              <p className='like-p'>liked <strong>{question.likes}</strong> times</p>
            </div>
          </div>
          <hr></hr>
          <p>{question.question}</p>
          <p className='add-instruction'>Do you have an opinion or solution? Add your answer below!</p>
          <AskButton style={{ 'margin': 'auto' }} type='button' onClick={newAnswer}>
            Add Answer
          </AskButton>
          {showAnswerForm && (
            <AddAnswer questionId={question._id}>
            </AddAnswer>
          )}
          <div className='answers-div'>
            <h2 className='answer-headline'>Answers</h2>
            {answer && answer.length === 0 &&
              <div className='no-activity'>
                <h4>There are no answers yet!</h4>
                <p>Press "Add Answer" to help</p>
              </div>
            }
            {console.log({ answers: question })}
            {answer && (
              <>
                {answer.map((item) => {
                  return (
                    <AnswerCard key={item._id} id={item._id} userId={item.userId} text={item.text} likes={item.likes} time={item.createdAt} />
                  ) 
                })}
                {console.log(answer)}
              </>
            )}
          </div>
        </div>
      )} 
    </section>
  )
}

export default QuestionDetails