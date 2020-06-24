import React, { useState, useEffect } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { QuestionSummary } from '../components/QuestionSummary'
import { QuestionMenu } from '../components/QuestionMenu'
import { QuestionDetails } from '../components/QuestionDetails'
import { question } from '../reducers/question'

  export const Questions = () => {
    const dispatch = useDispatch()
    const newAPI = 'https://final-pr.herokuapp.com/questions'
    const deployed = 'https://mongodb-questions.herokuapp.com/questions'
    const local = 'http://localhost:8080/questions'
    const questionId = useSelector((store) => store.question.questionId);
    const [data, setData] = useState([])
    const [details, setDetails] = useState('')

    useEffect(() => {
      fetch(local)
      .then(res => 
        res.json()
      )
      .then((data) => {
        setData(data)
      })
    }, [])

    // using the reducer to set a question and use for conditional rendering??? 

    const chooseQuestion = (event, item) => {
      event.preventDefault()
      dispatch(question.actions.setTitle({ title: item.title }))
      setDetails('')
    }
    
    return (
      <section className='questions-list'>
       <QuestionMenu />
        {data.map((item) => {
          return (
            <QuestionSummary onClick={event => chooseQuestion(event, item)}
              key={item._id} id={item._id} userId={item.userId} likes={item.likes} title={item.title} answers={item.answer} question={item.question} time={item.createdAt}
            />
          )}
            
        )}
      </section>
    )        
}
export default Questions