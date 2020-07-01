import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { QuestionSummary } from '../components/QuestionSummary'
import { QuestionMenu } from '../components/QuestionMenu'
import { question } from '../reducers/question'

export const Questions = () => {
  const dispatch = useDispatch()
  const newAPI = 'https://final-pr.herokuapp.com/questions'
  const local = 'http://localhost:8080/questions'
  const questionId = useSelector((store) => store.question.questionId);
  const [data, setData] = useState([])
  const [details, setDetails] = useState('')

  useEffect(() => {
    fetch(newAPI)
      .then(res => 
        res.json()
      )
      .then((data) => {
        setData(data)
        localStorage.setItem('questions', data)
      })
  }, [])

  // Using the reducer to set a question and use for conditional rendering??? 

  const chooseQuestion = (event, item) => {
    event.preventDefault()
    dispatch(question.actions.setTitle({ title: item.title }))
    setDetails('')
  }
    
  return (
    <section className='questions-list'>
      <QuestionMenu />
      <section className='question-result-list'>
        {data.map((item) => {
          return (
            <QuestionSummary onClick={event => chooseQuestion(event, item)}
              key={item._id} id={item._id} userId={item.userId} likes={item.likes} title={item.title} answers={item.answer} question={item.question} time={item.createdAt}
            />
          )}
        )}
      </section>
    </section>
  )
}

export default Questions