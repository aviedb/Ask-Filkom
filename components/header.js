import React, { Component } from 'react'

import Styling from './styling'

export default class Header extends Component {
  render() {
    return(
      <div>
        <Styling />
        <div className="header">
          <div style={{ padding: "20px" }}>
            <img src="../static/img/LogoWhite.png"></img>
          </div>
          <div style={{ flex: 1 }}>
            <div className="form-field">
              <input
                type="text"
                style={{ background: "rgb(229, 234, 237)" }}
                autoFocus
                placeholder="Search..."
              ></input>
            </div>
          </div>
          <div style={{ padding: "20px" }}>
            <div className="form-field">
              <button className="button-login">Login</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
