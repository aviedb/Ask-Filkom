import React, { Component } from 'react'

import Styling from '../components/styling'

export default class Login extends Component {
  render() {
    return(
      <div>
        <Styling />
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
            </form>
          </div>
        </div>
      </div>
    )
  }
}
