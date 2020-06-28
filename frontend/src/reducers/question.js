import { createSlice } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'


const initialState = {
  question: {
    questionId: 0,
    title: null,
    question: null,
    searchText: null
  }
}


export const question = createSlice({
  name: 'question',
  initialState: initialState,
  reducers: {

    setTitle: (state, action) => {
      const { title } = action.payload;
      console.log(`Secret Message: ${title}`);
      state.question.title = title;
    },
    setQuestion: (state, action) => {
      const { question } = action.payload;
      console.log(`Error Message: ${question}`);
      state.question.question = question;
    },
    setSearchText: (state, action) => {
      const { searchText } = action.payload;
      console.log(`Error Message: ${searchText}`);
      state.question.search = searchText;
    },
    setQuestionId: (state, action) => {
      const { id } = action.payload;
      console.log(`Error Message: ${id}`);
      state.question.questionId = id;
    },
    setAnswer: (state, action) => {
      const { text } = action.payload;
      console.log(`Error Message: ${text}`);
      state.question.text = text;
    }
  }
})



export const addQuestion = (title, newQuestion, userId) => {
  const POST_URL = 'http://localhost:8080/questions'
  return (dispatch) => {
    console.log('Posting a question ...')
    console.log(userId)
    fetch(POST_URL, {
      method: 'POST',
      body: JSON.stringify({ title, question: newQuestion, userId }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        console.log(res)
        throw 'Could not post question.'
      })
      .then((json) => {
        console.log(json)
        console.log(question)
        dispatch(question.actions.setTitle({ title: json.title}))
        dispatch(question.actions.setQuestion({ question: json.question }))
        console.log(json)
      })
  }
}


export const addAnswer = (newText, questionId, userId) => {
  const POST_URL = `http://localhost:8080/question/${questionId}/answers`
  return (dispatch) => {
    console.log('Posting an answer ...')
    console.log(userId)
    console.log(questionId)
    fetch(POST_URL, {
      method: 'POST',
      body: JSON.stringify({ text: newText, questionId, userId }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        console.log(res)
        throw 'Could not post answer.'
      })
  }
}

export const questionLike = (id) => {
  return (dispatch) => {
    fetch(`http://localhost:8080/question/${id}/like`, {
      method: "POST",
      body: "",
      headers: { "Content-Type": "application/json" }
    }) 
      .then((res) => {
      if (res.ok) {
        console.log('one like up')
      }
      throw 'Could not like question.'
    })
  }
}

export const answerLike = (id) => {
  return (dispatch) => {
    fetch(`http://localhost:8080/answer/${id}/like`, {
      method: "POST",
      body: "",
      headers: { "Content-Type": "application/json" }
    }) 
      .then((res) => {
      if (res.ok) {
        console.log('one like up')
      }
      throw 'Could not like answer.'
    })
  }
}





// export const questionSearch = (text ) => {
//   const POST_URL = `http://localhost:8080/question/${questionId}/answers`
//   return (dispatch) => {
//     console.log('Posting a question ...')
//     console.log(userId)
//     console.log(questionId)
//     fetch(POST_URL, {
//       method: 'POST',
//       body: JSON.stringify({ text, questionId, userId }),
//       headers: { 'Content-Type': 'application/json' },
//     })
//       // .then(console.log('posted question to API...'))
//       .then((res) => {
//         if (res.ok) {
//           return res.json()
//         }
//         console.log(res)
//         throw 'Could not post answer.'
//       })
//       .then((json) => {
//         console.log(json)
//         console.log(text)
//         dispatch(question.actions.setText({ text: json.text}))
//         console.log(json)
//       })
//       // .catch((err) => {
//       //   dispatch(question.actions.setErrorMessage({ errorMessage: err }))
//       // })
//   }
// }