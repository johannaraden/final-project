import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

  export const QuestionDetails = () => {

    const [question, setQuestion] = useState([])
    const { _id } = useParams()
    useEffect(() => {
      fetch(`https://mongodb-questions.herokuapp.com/questions/${_id}`)
      .then(res => 
        res.json()
      )
      .then((data) => {
        setQuestion(data)
      }, [_id])
  })

    return (
      <section className='question-details-page'>
        <h4>{question.question}</h4>
        <p>{question.createdAt}</p>
      </section>
    )
  }

export default QuestionDetails