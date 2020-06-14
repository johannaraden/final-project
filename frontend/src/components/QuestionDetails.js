import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom' 
import { ButtonInput } from '../lib/button' 
import { AnswerCard } from '../components/AnswerCard'
import { BackArrow } from '../lib/go-back' 
import '../styles/Questions.css'

  export const QuestionDetails = (props) => {
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let id = params.get('id');
    // const { id } = props
    // https://mongodb-questions.herokuapp.com/
    // http://localhost:8080/questions/
    const [question, setQuestion] = useState([])
    // const { _id } = useParams()
    useEffect(() => {
      fetch(`https://mongodb-questions.herokuapp.com/questions/${id}`)
      .then(res => 
        res.json()
      )
      .then((data) => {
        setQuestion(data)
      }, [id])
    })

    // 


    return (
      <section className='details-page'>
        <Link to={'/questions'} className='back'>
        <BackArrow className='to-list-arrow'></BackArrow> 
        <p>To list</p>
        </Link>
      <div className='question-details-page'>
        <h2 className='question-headline'>{question.title}Title</h2>
        <p>{question.createdAt}</p>
        <hr></hr>
        <p>{question.question}</p>
        <div className='answers-div'>
          <h2 className='answer-headline'>Answers</h2>
{/* 
          {answer.map((item) => {
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
            <AnswerCard />
        </div>
      </div>
      </section>
    )
  }

export default QuestionDetails