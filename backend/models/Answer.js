import mongoose from 'mongoose'

const Answer = mongoose.model('Answer', {
  answerId: {
    type: Number,
  },
  text: {
    type: String,
  },
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question'
  },
  likes: {
    type: Number,
    default: 0
  }
})

export default Answer