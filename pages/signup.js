import React, { Component } from 'react'
import Head from 'next/head'

export default class Signup extends Component {
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
                <h3>Create an account</h3>
              </div>
              <div className="form-field">
                <label>Username</label>
                <input type="text" required autoFocus/>
              </div>
              <div className="form-field">
                <label>Email</label>
                <input type="email" required/>
              </div>
              <div className="form-field">
                <label>Password</label>
                <input type="password" required/>
              </div>
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
