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

export const doGetQuestion = (id, callback) =>
  db.ref(`Question/${id}`).on('value', callback)

export const doCreateAnswer = (id, senderId, senderEmail, answer, vote, time) =>
  db.ref(`Question/${id}/qAnswer`).push().set({
    senderId,
    senderEmail,
    answer,
    vote,
    time
  })

export const doUpdateAnswerCount = (id, answers) =>
  db.ref(`Question/${id}`).update({
    answers: answers +1
  })
