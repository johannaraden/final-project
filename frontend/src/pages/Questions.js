import React, { useState, useEffect } from 'react'
import { QuestionSummary } from '../components/QuestionSummary'

  export const QuestionsPage = () => {

    const [questions, setQuestions] = useState([])

    useEffect(() => {
      fetch('https://mongodb-questions.herokuapp.com/questions')
      .then(res => 
        res.json
      )
      .then((data) => {
        setQuestions(data)
      }, [])

    })
    return (
      <section className=''>
        {questions.map((question) => {
          return (
            <QuestionSummary 
              key={question._id} id={question._id} likes={question.likes} question={question.question} time={question.createdAt}
            />
          )
        })}
      </section>
    )
  }

export default QuestionsPage