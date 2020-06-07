import React, { useState, useEffect } from 'react'
import { QuestionSummary } from '../components/QuestionSummary'
import { QuestionMenu } from '../components/QuestionMenu'

  export const QuestionsPage = () => {

    const [data, setData] = useState([])

    useEffect(() => {
      fetch('https://mongodb-questions.herokuapp.com/questions')
      .then(res => 
        res.json()
      )
      .then((data) => {
        setData(data)
      }, [])

    })
    return (
      <section className=''>
        <QuestionMenu />
        {data.map((item) => {
          return (
            <QuestionSummary 
              key={item._id} id={item._id} likes={item.likes} question={item.question} time={item.createdAt}
            />
          )
        })}
      </section>
    )
  }

export default QuestionsPage