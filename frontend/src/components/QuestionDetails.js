import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom' 

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
      <section className='question-details-page'>
        <h4>{question.question}</h4>
        <p>{question.createdAt}</p>
        <Link to={'/questions'}>
        <button >{id}</button> 
        </Link>
      </section>
    )
  }

export default QuestionDetails