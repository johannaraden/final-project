import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom' 
import { ButtonInput } from '../lib/button' 
import { AnswerCard } from '../components/AnswerCard'
import { BackArrow } from '../lib/go-back' 
import '../styles/Questions.css'
import { useDispatch } from 'react-redux'
import { question } from '../reducers/question'
import { AskButton } from '../lib/button'
import { AddAnswer} from './AddAnswer'

  export const QuestionDetails = (props) => {
    let search = window.location.search
    let params = new URLSearchParams(search)
    let id = params.get('id')
    const dispatch = useDispatch()
    // dispatch(question.actions.setId({ id: id }))
    // const { id } = props
    // https://mongodb-questions.herokuapp.com/
    // http://localhost:8080/questions/
    const [question, setQuestion] = useState([])
    const [user, setUser] = useState([])
    const { _id } = useParams()
    // http://localhost:8080/question/${id}
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
    
    
    // useEffect(() => {
    //   dispatch(question.actions.setQuestionId( question.id ))
    // }, [dispatch])


    useEffect(() => {
      fetch(`http://localhost:8080/user/${question.userId}`)
      .then(res => 
        res.json()
      )
      .then((data) => {
        setUser(data)
      })
    }, [question.userId])
    // const likeClick = () => {
    //   dispatch(likeClick(id))
    // } 

    //  const likeClick = () => {
    //   fetch(`https://final-pr.herokuapp.com/${id}/like`, {
    //     method: "POST",
    //     body: "",
    //     headers: { "Content-Type": "application/json" }
    //   })
    // }

    const [showAnswerForm, setShowAnswerForm] = useState(false)
    
    const newAnswer = () => {
      setShowAnswerForm(true)
      if(showAnswerForm) {
        setShowAnswerForm(false)
      }
    }
    // https://final-pr.herokuapp.com/questions/5eecb3454fb8d600234e5038
    return (
      <section className='details-page'>
        <Link to={'/questions'} className='back'>
        <BackArrow className='to-list-arrow'></BackArrow> 
        <p>To list</p>
        </Link> 
      <div className='question-details-page'>
        <div className='question-detail-header'>
          <div className='header-about'>
        <h2 className='question-headline'>{question.title}</h2>
        <p>{question.createdAt}</p>
        <p>Created by: {user.name}</p>
        <p>{question.id}</p>
        </div>
        <div className='header-likes'>
        <span className={question.likes > 10 ? "lots" : question.likes > 5 ? "few" : "none" } >
        {/* onClick={likeClick} */}
           {/* Conditional operators for setting different classes depending on number of likes */}
          <img className="heart" alt="heart-icon" src="https://img.icons8.com/cotton/64/000000/like--v1.png"/>
        </span>
        <p>liked {question.likes} times</p>
        </div>
        </div>
        <hr></hr>
        <p>{question.question}</p>
        {/* {console.log(question)} */}
        <AskButton type="button" onClick={newAnswer}>
          Add Answer
        </AskButton>
          {showAnswerForm && (
            <AddAnswer questionId={question._id}>
            </AddAnswer>
          )}
        <div className='answers-div'>
          <h2 className='answer-headline'>Answers</h2>
          {
          question.answer && question.answer.length > 0 && <p>there are answers available</p>
          }
          {console.log({answers: question.answer})}



          {/* {question.answer.map((item) => {
          return (
              <AnswerCard 
                key={item._id} id={item._id} likes={item.likes} answer={item.text} time={item.createdAt}
              />
          )
        })} */}
            {/* <div className='answer'>
              <h4>Title</h4>
              <p>Created At</p>
              <p>Created by:</p>
              <hr></hr>
              <p>Text</p>
            </div> */}
            <AnswerCard />
        </div>
      </div>
      </section>
    )
  }

export default QuestionDetails