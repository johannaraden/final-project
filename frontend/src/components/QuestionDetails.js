import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom' 
import { ButtonInput } from '../lib/button' 
import { AnswerCard } from '../components/AnswerCard'
import { BackArrow } from '../lib/go-back' 
import '../styles/Questions.css'
import { useDispatch } from 'react-redux'
import { question, questionLike } from '../reducers/question'
import { AskButton } from '../lib/button'
import { AddAnswer} from './AddAnswer'

  export const QuestionDetails = (props) => {
    let search = window.location.search
    let params = new URLSearchParams(search)
    let id = params.get('id')
    const dispatch = useDispatch()
    const [question, setQuestion] = useState()
    const [answer, setAnswer] = useState([])
    const [showAnswerForm, setShowAnswerForm] = useState(false)
    const [user, setUser] = useState([])
    const { _id } = useParams()

    useEffect(() => {
      fetch(`http://localhost:8080/question/${id}`)
      .then(res => 
        res.json()        
      )
      .then((data) => {
        setQuestion(data)
      })
    }, [id])

    // Want to change state in reducer in order to fetch the choosen questions answers 
  
    console.log(id)

    useEffect(() => {
      fetch(`http://localhost:8080/user/${question.userId}`)
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
    }, [question.userId])
   
    useEffect(() => {
      fetch(`http://localhost:8080/question/${id}/answers`)
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        console.log(id)
        throw 'Could not find answers.'
      })
      .then((data) => {
        setAnswer(data)
      })
    }, [id])


    const likeClick = () => {
      //dispatching thunk
      dispatch(questionLike(id))
    }
    
    const newAnswer = () => {
      setShowAnswerForm(true)
      if(showAnswerForm) {
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
                <p>{question.createdAt}</p>
                <p>Created by: <strong>{user.name}</strong></p>
                <p>{question.id}</p>
              </div>
              <div className='header-likes'>
                <span className={question.likes > 10 ? "lots" : question.likes > 5 ? "few" : "none" } onClick={likeClick}>
                {/* Conditional operators for setting different classes depending on number of likes */}
                  <img className="heart" alt="heart-icon" src="https://img.icons8.com/cotton/64/000000/like--v1.png"/>
                </span>
                <p className='like-p'>liked <strong>{question.likes}</strong> times</p>
              </div>
            </div>
            <hr></hr>
            <p>{question.question}</p>
            <p className='add-instruction'>Do you have an opinion or solution? Add your answer below!</p>
          </div>
          <AskButton style={{'margin': 'auto'}} type="button" onClick={newAnswer}>
            Add Answer
          </AskButton>
          {showAnswerForm && (
            <AddAnswer questionId={question._id}>
            </AddAnswer>
          )}
          <div className='answers-div'>
            <h2 className='answer-headline'>Answers</h2>
            {
            answer && answer.length > 0 && <p>there are answers available</p>
            }
            {console.log({answers: question})}
            {question.answer.map((item) => {
              return (
                console.log(item)
              <AnswerCard 
                key={item._id} id={item._id} likes={item.likes} answer={item.text} time={item.createdAt}
              />
              )
            })}
            <div className='answer'>
              <h4>Title</h4>
              <p>Created At</p>
              <p>Created by:</p>
              <hr></hr>
              <p>Text</p>
            </div>
            <AnswerCard />
          </div>
      )}
      </section>
    )
  }

export default QuestionDetails