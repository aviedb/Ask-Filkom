import React, { Component } from 'react'
import Link from 'next/link'
import Router from 'next/router'

import SignOutButton from './signOutButton'
import SignInButton from './signInButton'

export default class Header extends Component {
  constructor(props) {
    super(props)

    this.state = {
      searchKeyword: ''
    }
  }

  handleClick = () => {
    Router.push(`/search?searchKeyword=${this.state.searchKeyword}`)
  }

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
              style={{ background: "#FFFFFF", borderRadius: "5px", height: "35px" }}
              placeholder="Search..."
              onChange={event => (
                this.setState({searchKeyword: event.target.value})
              )}
            >
            </input>
          </div>
        </div>
        <button
          style={{padding: "20px", color: "#FFFFFF", backgroundColor: "transparent"}}
          type="submit"
          onClick={this.handleClick}
        >
          <i className="material-icons">search</i>
        </button>
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
