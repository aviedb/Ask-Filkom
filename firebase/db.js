import { db } from './firebase'

export const doCreateQuestion = (senderId, senderEmail, title, question, tags, time) =>
  db.ref('Question').push().set({
    senderId,
    senderEmail,
    title,
    question,
    tags,
    time
  })
