import React, { Component } from 'react'
import Head from 'next/head'
import Router from 'next/router'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import TextField from 'material-ui/TextField'
import LinearProgress from 'material-ui/LinearProgress'

import { auth } from '../firebase'
import SimplifiedHeader from '../components/simplifiedHeader'
import SimplifiedErrorMessage from '../utils/simplifiedErrorMessage'

const muiTheme = getMuiTheme({ userAgent: false })

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null
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
        this.setState(byPropKey('error', error))
      })

    event.preventDefault()
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
                  type="email"
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
                  <button type="submit" disabled={isInvalid}>Sign Up</button>
                </div>
                {error &&
                  <div className="form-field">
                    <p style={{ textAlign: "center", color: "red" }}>
                      {SimplifiedErrorMessage(error.message, this.state.email)}
                    </p>
                  </div>
                }
              </form>
            </div>

          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}
