import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  question: {
    questionId: 0,
    title: null,
    question: null
  }
}


export const question = createSlice({
  name: 'question',
  initialState: initialState,
  reducers: {
    //addQuestion
    addQuestion: (state, action) => {
      state.players.items.push(action.payload.playerName)
    },
    //addPoint
    //reducePoint
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
  }

})

export const addQuestion = (title, question) => {
  const POST_URL = 'http://localhost:8080/questions'
  return (dispatch) => {
    console.log('Posting a question ...')
    fetch(POST_URL, {
      method: 'POST',
      body: JSON.stringify({ title, question }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(console.log('posted registration info to API...'))
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        throw 'Could not post question.'
      })
      .then((json) => {
        console.log(json)
        dispatch(question.actions.setTitle({ title: json.title}))
        dispatch(question.actions.setQuestion({ question: json.question }))
        // dispatch(question.actions.setErrorMessage({ errorMessage: null }))
      })
      // .catch((err) => {
      //   dispatch(question.actions.setErrorMessage({ errorMessage: err }))
      // })
  }
}