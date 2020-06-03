import mongoose from 'mongoose'

const Question = mongoose.model('Question', {
    questionId: {
      type: Number
    },
    question: {
      type: String
    },
    likes: {
      type: Number
    },
    createdAt: {
      type: Date,
      default: Date.now()
    }
  })

  export default Question