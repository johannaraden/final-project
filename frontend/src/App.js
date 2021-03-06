import React from 'react'
import { applyMiddleware, compose, configureStore, combineReducers, createStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Header } from './components/Header'
import SignUp from './pages/SignUp'
import LogIn from './pages/LogIn'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Questions from './pages/Questions'
import { Provider } from 'react-redux'
import { user } from './reducers/user'
import { question } from './reducers/question'
import QuestionDetails from 'components/QuestionDetails'

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const saveToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('state', serializedState)
  } catch (error) {
    console.log(error)
  }
}

const loadFromLocalStorage = () => {
  console.log(localStorage.getItem('state'))
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

const store = createStore(reducer, persistedState, composeEnhancer(applyMiddleware(thunk)))

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
          <Route path='/questions' exact ><Questions /></Route>
          <Route path='/question' exact ><QuestionDetails /></Route>
        </Switch>
      </BrowserRouter>
    </Provider>
  )
}