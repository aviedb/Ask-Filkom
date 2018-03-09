import React, { Component } from 'react'
import Head from 'next/head'
import Link from 'next/link'

import TextField from 'material-ui/TextField'

export default class Login extends Component {
  render() {
    return(
      <div>
        <Head>
          <link rel="stylesheet" href="../static/css/styles.css" />
          <link rel="shortcut icon" href="../static/img/simplified_logo_favicon.ico"/>
          <title>ask-filkom - Login</title>
        </Head>
        <div className="centered-form">
          <div className="centered-form__form">
            <form action="/">
              <div className="form-field">
                <h3>Login</h3>
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
              <div className="form-field">
                <button>Login</button>
              </div>
              <div className="form-field">
                <p style={{ textAlign: "center" }}>
                  don{"'"}t have an account?{' '}
                  <Link href="/signup">
                    <a>Signup here</a>
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}
