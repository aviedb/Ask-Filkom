import React, { Component } from 'react'
import Head from 'next/head'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import Paper from 'material-ui/Paper'
import CircularProgress from 'material-ui/CircularProgress'

import { firebase, auth, db } from '../firebase'
import Header from '../components/header'
import Footer from '../components/footer'
import Questions from '../components/questions'
import SignedInSidebar from '../components/signedInSidebar'
import NotSignedInSidebar from '../components/notSignedInSidebar'

const muiTheme = getMuiTheme({ userAgent: false })

export default class Index extends Component {
  constructor(props) {
    super(props)

    this.state = {
      authUser: null,
      questions: [],
      loading: true
    }
  }

  componentDidMount() {
    firebase.auth.onAuthStateChanged(authUser => {
      authUser
        ? this.setState(() => ({authUser}))
        : this.setState(() => ({authUser: null}))
    })

    db.doGetQuestions((snapshot) => this.showQuestions(snapshot.val()))
  }

  showQuestions(snapshot) {
    const questions = Object.entries(snapshot)
      .map((item) => Object.assign({}, {key: item[0]}, item[1])).reverse()

    this.setState({
      questions,
      loading: false
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
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
              rel="stylesheet"/>
            <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
            <title>Home - ask-filkom</title>
          </Head>
          <Header user={this.state.authUser}/>
          <div style={{ display: "flex" }}>
            <div className="home__sidebar" style={{padding: "30px", paddingTop: "100px"}}>
              { authUser
                ? <SignedInSidebar authUser={authUser}/>
                : <NotSignedInSidebar />
              }
            </div>
            <div className="home__middle">
              { this.state.loading &&
                <Paper style={{width: "100%", marginTop: "10px", textAlign: "center", padding: "10px"}}>
                  <CircularProgress color="rgb(39, 94, 130)"/>
                </Paper>
              }
              <ul>
                {
                  questions.map(question => (
                    <Questions
                      id={question.key}
                      { ...question }
                    />
                  ))
                }
              </ul>
            </div>
            <div className="home__sidebar" style={{padding: "30px", paddingTop: "100px"}}>
              <Paper style={{width: "100%", height: "100%", marginTop: "10px", padding: "10px"}}>
                Ads
              </Paper>
            </div>
          </div>
          <Footer />
        </div>
      </MuiThemeProvider>
    )
  }
}
