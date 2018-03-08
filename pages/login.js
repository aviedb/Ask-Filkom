import React, { Component } from 'react'
import Head from 'next/head'
import Link from 'next/link'

export default class Login extends Component {
  render() {
    return(
      <div>
        <Head>
          <link
            rel="stylesheet"
            href="../static/css/styles.css"
          />
        </Head>
        <div className="centered-form">
          <div className="centered-form__form">
            <form action="/">
              <div className="form-field">
                <h3>Login</h3>
              </div>
              <div className="form-field">
                <label>Username</label>
                <input type="text" autofocus/>
              </div>
              <div className="form-field">
                <label>Password</label>
                <input type="password"/>
              </div>
              <div className="form-field">
                <button>Login</button>
              </div>
              <div className="form-field" style={{ justifyContent: "Center" }}>
                <p>
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
