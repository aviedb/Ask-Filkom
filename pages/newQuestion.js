import React, { Component } from 'react'
import Head from 'next/head'
import Router from 'next/router'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import CircularProgress from 'material-ui/CircularProgress'

import { firebase, auth, db } from '../firebase'
import Header from '../components/header'
import Footer from '../components/footer'

const muiTheme = getMuiTheme({ userAgent: false })

const INITIAL_STATE = {
  title: '',
  question: '',
  tags: '',
  loadingSubmit: false
}

const byPropKey = (propertyName, value) => ({
  [propertyName]: value
})

export default class NewQuestion extends Component {
  constructor(props) {
    super(props)

    this.state = {
      authUser: null,
      ...INITIAL_STATE
    }
  }

  componentDidMount() {
    firebase.auth.onAuthStateChanged(authUser => {
      if(authUser) {
        this.setState(() => ({authUser}))
      } else {
        Router.push('/signIn')
      }

    })
  }

  handleClick = () => {
    this.setState({
      loadingSubmit: true
    })

    const {
      authUser,
      title,
      question,
      tags
    } = this.state

    db.doCreateQuestion(authUser.uid, authUser.email, title, question, tags, new Date().getTime(), 0)
      .then(() => {
        this.setState(() => ({...INITIAL_STATE}))
        Router.push('/')
      })

  }

  render() {
    const {
      authUser,
      title,
      question,
      tags,
      time,
      loadingSubmit
    } = this.state

    const isInvalid =
      title === '' ||
      question === '' ||
      tags === ''


    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <Head>
            <link rel="stylesheet" href="../static/css/styles.css" />
            <link rel="shortcut icon" href="../static/img/simplified_logo_favicon.ico"/>
            <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
            <title>New Question - ask-filkom</title>
          </Head>
          <Header user={authUser}/>
          <div style={{display: "flex"}}>
            <div className="home__sidebar">

            </div>
            <div style={{flex: "1", padding: "30px", paddingTop: "100px"}}>
              <Paper style={{padding: "30px", marginTop: "10px", textAlign: "right"}}>
                <p><h3>Ask a Question</h3></p>
                <TextField
                  floatingLabelText="Title"
                  floatingLabelStyle={{ color: "rgb(39, 94, 130)" }}
                  type="text"
                  fullWidth={true}
                  underlineStyle={{ borderColor: "rgb(39, 107, 129)" }}
                  underlineFocusStyle={{ borderColor: "rgb(39, 94, 130)" }}
                  style={{marginBottom: "10px"}}
                  value={title}
                  onChange={event =>
                    this.setState(byPropKey('title', event.target.value))}
                />
                <textarea
                  rows={10}
                  placeholder="Question"
                  style={{padding: "10px"}}
                  value={question}
                  onChange={event =>
                    this.setState(byPropKey('question', event.target.value))}
                />
                <div style={{textAlign: "left"}}>
                  <TextField
                    floatingLabelText="Tags"
                    floatingLabelStyle={{ color: "rgb(39, 94, 130)" }}
                    type="text"
                    underlineStyle={{ borderColor: "rgb(39, 107, 129)" }}
                    underlineFocusStyle={{ borderColor: "rgb(39, 94, 130)" }}
                    style={{width: "50%"}}
                    value={tags}
                    onChange={event =>
                      this.setState(byPropKey('tags', event.target.value))}
                  />
                </div>
                { loadingSubmit &&
                  <CircularProgress
                    style={{ position: "absolute", marginTop: "10px", marginLeft: "27px", zIndex: "1"}}
                    color="white"
                    size={35}
                  />
                }
                <RaisedButton
                  label="Submit"
                  backgroundColor="rgb(38, 95, 130)"
                  labelColor="white"
                  disabledBackgroundColor="#698EA5"
                  disabledLabelColor="white"
                  style={{marginTop: "10px"}}
                  disabled={isInvalid || loadingSubmit}
                  onClick={this.handleClick}
                />
              </Paper>
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
