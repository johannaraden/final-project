import React from 'react'
import { Header } from './components/Header'
import SignUp from './pages/SignUp'
import LogIn from './pages/LogIn'
import Home from './pages/Home'
import Profile from './pages/Profile'
import QuestionsPage from './pages/Questions'
import { Provider } from "react-redux"
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { user } from './reducers/user'
import { question } from './reducers/question'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import QuestionDetails from 'components/QuestionDetails'

const saveToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('state', serializedState)
  } catch (error) {
    console.log(error)
  }
}

const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('state')
    if (serializedState === null) return undefined
    return JSON.parse(serializedState)
  } catch (error) {
    console.log(error)
    return undefined
  }
}

const persistedState = loadFromLocalStorage()

const reducer = combineReducers({ 
  user: user.reducer,
  question: question.reducer
})

const store = configureStore({ reducer, persistedState })

store.subscribe(() => saveToLocalStorage(store.getState()))

export const App = () => {

  return (
    <Provider store={store}>
      <BrowserRouter>
      <Header />
        <Switch>
          <Route path='/' exact ><LogIn /></Route>
          <Route path='/signup' exact ><SignUp /></Route>
          <Route path='/home' exact ><Home /></Route>
          <Route path='/profile' exact ><Profile /></Route>
          <Route path='/questions' exact ><QuestionsPage /></Route>
          <Route path='/question' exact ><QuestionDetails /></Route>
        </Switch>
      </BrowserRouter>
    </Provider>
  )
}