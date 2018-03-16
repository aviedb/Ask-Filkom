import React, { Component } from 'react'
import Head from 'next/head'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import { firebase, auth } from '../firebase'
import Header from '../components/header'
import Footer from '../components/footer'
import Questions from '../components/questions'

const muiTheme = getMuiTheme({ userAgent: false })

export default class Index extends Component {
  constructor(props) {
    super(props)

    this.state = {
      authUser: null,
      questions: [
        {
          username: 'username',
          questionTitle: 'question title',
          question: 'question',
          time: new Date(),
          tags: 'tag',
          answers: 9
        },
        {
          username: 'avied',
          questionTitle: 'How to define a variable in Java?',
          question: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          time: new Date(),
          tags: 'Java',
          answers: 999
        },
        {
          username: 'M\'Baku',
          questionTitle: 'Nyeh',
          question: 'Isi pertanyaan dari M\'Baku terproteksi',
          time: new Date(),
          tags: 'Wakanda',
          answers: 0
        },
        {
          username: 'Satya Nadella',
          questionTitle: 'Bagi kisi-kisi UTS Jarkom dong!',
          question: 'Aku ga paham sama seklai jarkom :(',
          time: new Date(),
          tags: 'Jarkom',
          answers: 2
        },
      ]
    }
  }

  componentDidMount() {
    firebase.auth.onAuthStateChanged(authUser => {
      authUser
        ? this.setState(() => ({authUser}))
        : this.setState(() => ({authUser: null}))
    })
  }

  render() {
    const { questions, authUser } = this.state

    return(
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <Head>
            <link rel="stylesheet" href="../static/css/styles.css" />
            <link rel="shortcut icon" href="../static/img/simplified_logo_favicon.ico"/>
            <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
            <title>Home - ask-filkom</title>
          </Head>
          <Header user={this.state.authUser}/>
          <div style={{ display: "flex" }}>
            <div className="home__sidebar">

            </div>
            <div style={{ padding: "30px", paddingTop: "100px", flex: 1 }}>
              <ul>
                {
                  questions.map(question => (
                    <Questions
                      {...question}
                    />
                  ))
                }
              </ul>
            </div>
            <div className="home__sidebar" style={{paddingTop: "100px"}}>
              {authUser && <p>You are signed in as {authUser.email}</p>}
            </div>
          </div>
          <Footer />
        </div>
      </MuiThemeProvider>
    )
  }
}
