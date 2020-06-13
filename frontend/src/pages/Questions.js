import React, { useState, useEffect } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { QuestionSummary } from '../components/QuestionSummary'
import { QuestionMenu } from '../components/QuestionMenu'
import { QuestionDetails } from '../components/QuestionDetails'

  export const QuestionsPage = () => {
    const dispatch = useDispatch()
    const local  = 'http://localhost:8080/questions'
    const deployed = 'https://mongodb-questions.herokuapp.com/questions'
    const questionId = useSelector((store) => store.question.questionId);
    const [data, setData] = useState([])
    const [details, setDetails] = useState('')


    useEffect(() => {
      fetch(deployed)
      .then(res => 
        res.json()
      )
      .then((data) => {
        setData(data)
      }, [])

    })

    // using the reducer to set a question and use for conditional rendering??? 

    // const setDetails = (event) => {
    //   event.preventDefault()
    //   //dispatch thunk
    //   dispatch((name, password))
    //   setName('')
    //   setPassword('')
    // }
    return (
      <>
      {!questionId ? (
        <section className='questions-list'>
        <QuestionMenu />
        {data.map((item) => {
          return (
              <QuestionSummary onClick={event => setDetails(event)}
                key={item._id} id={item._id} likes={item.likes} title={item.title} answers={item.answer} question={item.question} time={item.createdAt}
              />
          )
        })}
      </section>
      ) : (
        <>
        <p>X</p>
        </>
          // <QuestionDetails id={questionId}/>
        ) 
      }
    </>
    )
  }

export default QuestionsPage