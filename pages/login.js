import React, { Component } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Router from 'next/router'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import TextField from 'material-ui/TextField'

import { auth } from '../firebase'

const muiTheme = getMuiTheme({ userAgent: false })

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null
}

const byPropKey = (propertyName, value) => ({
  [propertyName]: value
})

export default class Login extends Component {
  constructor(props) {
    super(props)

    this.state = { ...INITIAL_STATE }
  }

  onSubmit = (event) => {
    const {
      email,
      password
    } = this.state

    auth.doSignInWithEmailAndPassword(email, password)
      .then(() => {
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
      email,
      password,
      error
    } = this.state

    const isInvalid =
      password === '' ||
      email === ''

    return(
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <Head>
            <link rel="stylesheet" href="../static/css/styles.css" />
            <link rel="shortcut icon" href="../static/img/simplified_logo_favicon.ico"/>
            <title>ask-Login - ask-filkom</title>
          </Head>
          <div className="centered-form">
            <div className="centered-form__form">
              <form onSubmit={this.onSubmit}>
                <div className="form-field">
                  <h3>Login</h3>
                </div>
                <TextField
                  autoFocus
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
                  value={password}
                  onChange={event =>
                    this.setState(byPropKey('password', event.target.value))}
                />
                <div className="form-field">
                  <button disabled={isInvalid}>Login</button>
                </div>
                {!error &&
                  <div className="form-field">
                    <p style={{ textAlign: "center" }}>
                      don{"'"}t have an account?{' '}
                      <Link href="/signup">
                        <a>Signup here</a>
                      </Link>
                    </p>
                  </div>
                }
                {error &&
                  <div className="form-field">
                    <p style={{ textAlign: "center", color: "red" }}>
                      {error.message}
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
