import React, { Component } from 'react'
import Link from 'next/link'

import SignOutButton from './signOutButton'
import SignInButton from './signInButton'

export default class Header extends Component {
  render() {
    return(
      <div className="header">
        <div style={{ padding: "20px" }}>
          <Link href="/">
            <a>
              <img src="../static/img/LogoWhite.png" />
            </a>
          </Link>
        </div>
        <div style={{ flex: 1 }}>
          <div className="form-field">
            <input
              type="text"
              style={{ background: "rgb(229, 234, 237)" }}
              placeholder="Search..."
            >
            </input>
          </div>
        </div>
        <div style={{ padding: "20px" }}>
          <div className="form-field">
            {this.props.user
              ? <SignOutButton />
              : <SignInButton />
            }
          </div>
        </div>
      </div>
    )
  }
}
