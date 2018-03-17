import * as firebase from 'firebase'

const config = {
  apiKey: "AIzaSyBXNz5z8ua6E-DRb18vNxrpSFqIaBgRvLA",
  authDomain: "ask-filkom.firebaseapp.com",
  databaseURL: "https://ask-filkom.firebaseio.com",
  projectId: "ask-filkom",
  storageBucket: "ask-filkom.appspot.com",
  messagingSenderId: "25348640375"
}

if(!firebase.apps.length) {
  firebase.initializeApp(config)
}

const auth = firebase.auth()
const db = firebase.database()

export {
  db,
  auth
}
