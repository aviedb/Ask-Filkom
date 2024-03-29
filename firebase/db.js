import { db } from './firebase'

export const doCreateQuestion = (senderId, senderEmail, title, question, tags, time) =>
  db.ref('Question').push().set({
    senderId,
    senderEmail,
    title,
    question,
    tags,
    time,
    answers: 0,
    vote: 0
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

export const doUpvoteQuestionByUser = (qId, upvotedBy) =>
  db.ref(`Question/${qId}`).update({
    upvotedBy
  })

export const doDownvoteQuestionByUser = (qId, downvotedBy) =>
  db.ref(`Question/${qId}`).update({
    downvotedBy
  })

export const doUpvoteQuestion = (qId, vote) =>
  db.ref(`Question/${qId}`).update({
    vote: vote+1
  })

export const doDownvoteQuestion = (qId, vote) =>
  db.ref(`Question/${qId}`).update({
    vote: vote-1
  })

export const doUpvoteAnswerByUser = (qId, aId, upvotedBy) =>
  db.ref(`Question/${qId}/qAnswer/${aId}`).update({
    upvotedBy
  })

export const doDownvoteAnswerByUser = (qId, aId, downvotedBy) =>
  db.ref(`Question/${qId}/qAnswer/${aId}`).update({
    downvotedBy
  })

export const doUpvoteAnswer = (qId, aId, vote) =>
  db.ref(`Question/${qId}/qAnswer/${aId}`).update({
    vote: vote+1
  })

export const doDownvoteAnswer = (qId, aId, vote) =>
  db.ref(`Question/${qId}/qAnswer/${aId}`).update({
    vote: vote-1
  })

export const doToggleVerified = (qId, aId, verified) =>
  db.ref(`Question/${qId}/qAnswer/${aId}`).update({
    verified
  })
