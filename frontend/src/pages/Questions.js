import React, { useState, useEffect } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { QuestionSummary } from '../components/QuestionSummary'
import { QuestionMenu } from '../components/QuestionMenu'
import { QuestionDetails } from '../components/QuestionDetails'

  export const QuestionsPage = () => {

    const [data, setData] = useState([])

    useEffect(() => {
      fetch('http://localhost:8080/questions')
      .then(res => 
        res.json()
      )
      .then((data) => {
        setData(data)
      }, [])

    })
    return (
      <section className='questions-list'>
        <QuestionMenu />
        {data.map((item) => {
          return (
              <QuestionSummary 
                key={item._id} id={item._id} likes={item.likes} title={item.title} answers={item.answer} question={item.question} time={item.createdAt}
              />
          )
        })}
        <QuestionDetails />
      </section>
    )
  }

export default QuestionsPage