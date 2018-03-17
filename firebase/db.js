import { db } from './firebase'

export const doCreateQuestion = (senderId, senderEmail, title, question, tags, time, answers) =>
  db.ref('Question').push().set({
    senderId,
    senderEmail,
    title,
    question,
    tags,
    time,
    answers
  })

export const doGetQuestions = (callback) =>
  db.ref('Question').on('value', callback)
