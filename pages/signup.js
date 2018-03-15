import React, { Component } from 'react'
import Head from 'next/head'
import Router from 'next/router'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import TextField from 'material-ui/TextField'
import LinearProgress from 'material-ui/LinearProgress'
import Snackbar from 'material-ui/Snackbar'

import { auth } from '../firebase'
import SimplifiedHeader from '../components/simplifiedHeader'
import SimplifiedErrorMessage from '../utils/simplifiedErrorMessage'

const muiTheme = getMuiTheme({ userAgent: false })

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
  signupLoading: false,
  openSnackbar: false
}

const byPropKey = (propertyName, value) => ({
  [propertyName]: value
})

export default class Signup extends Component {
  constructor(props) {
    super(props)

    this.state = { ...INITIAL_STATE }
  }

  onSubmit = (event) => {
    this.setState(byPropKey('signupLoading', true))

    const {
      username,
      email,
      passwordOne
    } = this.state

    auth.doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        this.setState(() => ({ ...INITIAL_STATE }))
        Router.push('/')
      })
      .catch(error => {
        this.setState({
          error,
          signupLoading: false,
          openSnackbar: true
        })
      })

    event.preventDefault()
  }

  handleRequestClose = () => {
    this.setState({
      openSnackbar: false
    })
  }

  render() {

    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error
    } = this.state

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === ''

    return(
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <Head>
            <link rel="stylesheet" href="../static/css/styles.css" />
            <link rel="shortcut icon" href="../static/img/simplified_logo_favicon.ico"/>
            <title>Sign Up - ask-filkom</title>
          </Head>
          <SimplifiedHeader />
          <div className="centered-form">
            <div className="centered-form__form">
              <form onSubmit={this.onSubmit}>
                <div className="form-field">
                  <h3>Create an account</h3>
                </div>
                <TextField
                  autoFocus
                  floatingLabelText="Username"
                  floatingLabelStyle={{ color: "rgb(39, 94, 130)" }}
                  type="text"
                  style={{ width: "100%" }}
                  underlineStyle={{ borderColor: "rgb(39, 107, 129)" }}
                  underlineFocusStyle={{ borderColor: "rgb(39, 94, 130)" }}
                  value={username}
                  onChange={event =>
                    this.setState(byPropKey('username', event.target.value))}
                />
                <TextField
                  floatingLabelText="Email"
                  floatingLabelStyle={{ color: "rgb(39, 94, 130)" }}
                  type="text"
                  style={{ width: "100%" }}
                  underlineStyle={{ borderColor: "rgb(39, 107, 129)" }}
                  underlineFocusStyle={{ borderColor: "rgb(39, 94, 130)" }}
                  value={email}
                  onChange={event =>
                    this.setState(byPropKey('email', event.target.value))}
                />
                <TextField
                  floatingLabelText="Password"
                  floatingLabelStyle={{ color: "rgb(39, 94, 130)" }}
                  type="password"
                  style={{ width: "100%" }}
                  underlineStyle={{ borderColor: "rgb(39, 107, 129)" }}
                  underlineFocusStyle={{ borderColor: "rgb(39, 94, 130)" }}
                  value={passwordOne}
                  onChange={event =>
                    this.setState(byPropKey('passwordOne', event.target.value))}
                />
                <TextField
                  floatingLabelText="Confirm Password"
                  floatingLabelStyle={{ color: "rgb(39, 94, 130)" }}
                  type="password"
                  style={{ width: "100%" }}
                  underlineStyle={{ borderColor: "rgb(39, 107, 129)" }}
                  underlineFocusStyle={{ borderColor: "rgb(39, 94, 130)" }}
                  value={passwordTwo}
                  onChange={event =>
                    this.setState(byPropKey('passwordTwo', event.target.value))}
                />
                <div className="form-field">
                  {this.state.signupLoading && <LinearProgress
                    style={{ position: "absolute", width: "258px" }}
                    color="rgb(39, 107, 129)"
                  />}
                  <button type="submit" disabled={isInvalid || this.state.signupLoading}>
                    Sign Up
                  </button>
                </div>
                { error &&
                  <Snackbar
                    open={this.state.openSnackbar}
                    message={SimplifiedErrorMessage(error.message, email)}
                    autoHideDuration={4000}
                    onRequestClose={this.handleRequestClose}
                  />
                }
              </form>
            </div>

          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}
