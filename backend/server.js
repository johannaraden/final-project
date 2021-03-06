import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import crypto from 'crypto'
import bcrypt from 'bcrypt-nodejs'
import { User } from './models/User'
import { Question } from './models/Question'
import { Answer } from './models/Answer'


const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/forum"
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.set('useCreateIndex', true)
mongoose.Promise = Promise

// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example:


// Defined error messages
const ERR_NO_QUESTIONS = 'Sorry, could not find this question'
const ERR_NO_USER = 'Sorry, could not find this user'
const ERR_UNAVAILABLE_SIGNUP = 'Sorry, could not create this user'

// Adding middleware for targeting server error for every request

//   PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

app.use((req, res, next) => {
  if (mongoose.connection.readyState === 1) {
    next()
  } else {
    res.status(503).json({ error: 'Service unavailable'})
  }
})  

const authenticateUser = async (req, res, next) => {
  try {
    const user = await User.findOne({
      accessToken: req.header('Authorization')
    })
    if (user) {
      req.user = user
      next()
    } else {
      res.status(401).json({ loggedOut: true, message: 'Please try logging in again' })
    }
  } catch (err) {
    res.status(403).json({ message: 'Access token is missing or wrong', errors: err })
  }

}

// Start defining your routes here
app.get('/', (req, res) => {
  res.send('Hello world')
})

app.post('/users', async (req, res) => {
  try {
    const { name, email, password } = req.body
    const user = new User({ name, email, password: bcrypt.hashSync(password) })
    const saved = await user.save()
    res.status(201).json({ name: saved.name, userId: saved._id, accessToken: saved.accessToken })
  } catch (err) {
    res.status(400).json({ message: 'Could not create user', errors: err.errors })
  }
})

app.get('/users/:id/secret', authenticateUser)
app.get('/users/:id/secret', (req, res) => {
  const secretMessage = `This is profile page for ${req.user.name}.`
  res.status(201).json({ secretMessage });
})

app.post('/sessions', async (req, res) => {
  try {
    const { name, password } = req.body
    const user = await User.findOne({ name })
    if (user && bcrypt.compareSync(password, user.password)) {
      res.status(201).json({ name: user.name, userId: user._id, accessToken: user.accessToken, message: 'You are logged in' })
    } else {
      res.status(404).json({ notFound: true })
    }
  } catch (err) {
    res.status(404).json({ notFound: true })
  }
})

// Questions & answers

// For this endpoint - creating regex to make it possible to search for a question including words like "playing" or "wi-fi"

app.get('/questions', async (req, res) => {
  const { query } = req.query
  const queryRegex = new RegExp(query, 'i')
  // How to 
  const questions = await Question.find({question: queryRegex}).populate('User')
  // Also possible to get hits from words in the title , {title: queryRegex}
  console.log(`Found ${questions.length} question(s)`)
  res.json(questions)
})

// add question

app.post('/questions', async (req, res) => {
  try {
    const { title, question, userId } = req.body
    const newQuestion = new Question({ title, question, userId })
    const saved = await newQuestion.save()
    res.status(201).json({ title: saved.title, question: saved.question, questionId: saved._id, userId: saved.userId })
  } catch (err) { 
    res.status(400).json({ message: 'Could not create question', errors: err.errors })
  }
})

//Looking for a specific question by id.

app.get('/questions/:userId', async (req, res) => {
  try {
    const question = await Question.findById(req.params.userId) 
    if (question) {
      res.json(question)
    } else {
      res.status(404).json({error: ERR_NO_QUESTIONS})
  } 
  }catch (err) {
    res.status(400).json({error: ERR_NO_QUESTIONS})
  }
})

// Top three page shows the three questions with the most likes 
app.get('/popular', async(req, res) => {
  const popularQuestions = await Question.find({}).sort({likes: -1}).limit(3)
  res.json(popularQuestions)
  })

  app.get('/noanswer', async(req, res) => {
    const unansweredQuestions = await Question.find({likes: 0})
    res.json(unansweredQuestions)
    console.log('hej')
  })



  // answers endpoint 

  app.get('/answers', async (req, res) => {
    const answers = await Answer.find()
    // Also possible to get hits from words in the title , {title: queryRegex}
    console.log(`Found ${answers.length} answer(s)`)
    res.json(answers)
  })
  
  // add question
  
  app.post('/answers', async (req, res) => {
    try {
      const { text } = req.body
      const newAnswer = new Answer({ text })
      const saved = await newAnswer.save()
      res.status(201).json({ text: saved.text })
    } catch (err) { 
      res.status(400).json({ message: 'Could not create answer', errors: err.errors })
    }
  })


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
