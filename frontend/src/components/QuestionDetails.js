import React, { useState, useEffect } from 'react'

  export const QuestionDetails = () => {

    const [questions, setQuestions] = useState([])

    useEffect(() => {
      fetch('https://mongodb-questions.herokuapp.com/questions/5ed7fb463935d30023d46448')
      .then(res => 
        res.json()
      )
      .then((data) => {
        setQuestions(data)
      }, [])
  })
      // useEffect(() => {
      //   async const response = fetch('https://mongodb-questions.herokuapp.com/questions/5ed7fb463935d30023d46448')
      //   const data = await response.json()
      //   console.log(data)
      //   setQuestions(data)
      // })

   
    return (
      <section className='question-details-page'>
        <h4>{questions.question}</h4>
        <p>{questions.createdAt}</p>
      </section>
    )
  }

export default QuestionDetails