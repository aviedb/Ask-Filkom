import React, { Component } from 'react'
import Head from 'next/head'
import TextField from 'material-ui/TextField'

export default class Signup extends Component {
  render() {
    return(
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
                label="Username"
                type="text"
                margin="normal"
                style={{ width: "100%" }}
              />
              <TextField
                label="Password"
                type="password"
                margin="normal"
                style={{ width: "100%" }}
              />
              <TextField
                label="Email"
                type="email"
                margin="normal"
                style={{ width: "100%" }}
              />
              <div className="form-field">
                <button>Signup</button>
              </div>
            </form>
          </div>
          <form action="/">
            <div className="centered-form__form">
              <div>
                <div className="form-field">
                  <h3>Or Signup with</h3>
                </div>
                <div className="form-field">
                  <button className="google-button">Google</button>
                </div>
                <div className="form-field">
                  <button className="facebook-button">Facebook</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}
