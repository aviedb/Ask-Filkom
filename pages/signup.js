import React, { Component } from 'react'
import Head from 'next/head'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import TextField from 'material-ui/TextField'

const muiTheme = getMuiTheme({ userAgent: false })

export default class Signup extends Component {
  render() {
    return(
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <Head>
            <link rel="stylesheet" href="../static/css/styles.css" />
            <link rel="shortcut icon" href="../static/img/simplified_logo_favicon.ico"/>
            <title>ask-filkom - Signup</title>
          </Head>
          <div className="centered-form">
            <div className="centered-form__form">
              <form action="/">
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
                />
                <TextField
                  floatingLabelText="Email"
                  floatingLabelStyle={{ color: "rgb(39, 94, 130)" }}
                  type="email"
                  style={{ width: "100%" }}
                  underlineStyle={{ borderColor: "rgb(39, 107, 129)" }}
                  underlineFocusStyle={{ borderColor: "rgb(39, 94, 130)" }}
                />
                <TextField
                  floatingLabelText="Password"
                  floatingLabelStyle={{ color: "rgb(39, 94, 130)" }}
                  type="password"
                  style={{ width: "100%" }}
                  underlineStyle={{ borderColor: "rgb(39, 107, 129)" }}
                  underlineFocusStyle={{ borderColor: "rgb(39, 94, 130)" }}
                />
                <div className="form-field">
                  <button>Signup</button>
                </div>
              </form>
            </div>
            
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}
