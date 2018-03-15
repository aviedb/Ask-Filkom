import React, { Component } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Router from 'next/router'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import CircularProgress from 'material-ui/CircularProgress'
import Snackbar from 'material-ui/Snackbar'

import { firebase, auth } from '../firebase'
import SimplifiedHeader from '../components/simplifiedHeader'
import SimplifiedErrorMessage from '../utils/simplifiedErrorMessage'

const muiTheme = getMuiTheme({ userAgent: false })

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
  loginLoading: false,
  openSnackbar: false
}

const byPropKey = (propertyName, value) => ({
  [propertyName]: value
})

export default class Login extends Component {
  constructor(props) {
    super(props)

    this.state = { ...INITIAL_STATE }
  }

  componentDidMount() {
    firebase.auth.onAuthStateChanged(user => {
      if(user)
        Router.push('/')
    })
  }

  onSubmit = (event) => {
    this.setState(byPropKey('loginLoading', true))

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
        this.setState({
          error,
          loginLoading: false,
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
          <SimplifiedHeader />
          <div className="centered-form">
            <div className="centered-form__form">
              <form onSubmit={this.onSubmit}>
                <div className="form-field">
                  <h3>Sign In</h3>
                </div>
                <TextField
                  autoFocus
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
                  value={password}
                  onChange={event =>
                    this.setState(byPropKey('password', event.target.value))}
                />
                <div className="form-field">
                  {this.state.loginLoading &&
                    <CircularProgress
                      style={{ position: "absolute", width: "258px", zIndex: "1", marginLeft: "112px" }}
                      color="white"
                      size={35}
                    />
                  }
                  <RaisedButton
                    label="Sign In"
                    backgroundColor="rgb(38, 95, 130)"
                    labelColor="white"
                    disabledBackgroundColor="#698EA5"
                    disabled={isInvalid || this.state.loginLoading}
                    onClick={this.onSubmit}
                    type="submit"
                  />
                </div>
                <div className="form-field">
                  <p style={{ textAlign: "center" }}>
                    don{"'"}t have an account?{' '}
                    <Link href="/signup">
                      <a>Signup here</a>
                    </Link>
                  </p>
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
