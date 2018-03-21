import React, { Component } from 'react'
import Link from 'next/link'

import SignOutButton from './signOutButton'
import SignInButton from './signInButton'

export default class Header extends Component {
  render() {
    return(
      <div className="header">
        <div className="sideHeader" style={{padding: "30px", marginRight: "40px"}}>
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
              style={{ background: "#FFFFFF", borderRadius: "2px" }}
              placeholder="Search..."
            >
            </input>
          </div>
        </div>
        <div className="sideHeader">
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
