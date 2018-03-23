import React, { Component } from 'react'
import Router from 'next/router'
import Link from 'next/link'
import Drawer from 'material-ui/Drawer'
import RaisedButton from 'material-ui/RaisedButton'

import { auth } from '../firebase'

export default class HederMobile extends Component {
  constructor(props) {
    super(props)

    this.state = {
      openDrawer: false,
      searchKeyword: ''
    }
  }

  handleSubmit = () => {
    Router.push(`/search?searchKeyword=${this.state.searchKeyword}`)
  }

  handleToggle = () => this.setState({openDrawer: !this.state.openDrawer})

  handleClick = () => {
    Router.push('/newQuestion')
  }

  handleSignOut = () => {
    auth.doSignOut().then(() => {
      Router.push('/')
    })
  }

  handleSignIn = () => {
    Router.push('/signIn')
  }

  render() {
    const { user } = this.props

    return(
      <div className="header_mobile">
        <div className="sideHeader" style={{padding: "20px"}}>
          <a onClick={this.handleToggle}>
            <i className="material-icons md-30" style={{color: "#FFFFFF"}}>menu</i>
          </a>
          <Drawer
            docked={false}
            open={this.state.openDrawer}
            onRequestChange={(openDrawer) => this.setState({openDrawer})}
            containerStyle={{padding: "10px", background: "-webkit-linear-gradient(125deg, rgba(39,107,130,1) 0%, rgba(49,84,129,1) 100%)", display: "flex"}}
          >
            {user
              ? <div className="drawer_container">
                  <div>
                    <div style={{width: "100%", textAlign: "center", marginBottom: "30px"}}>
                      <Link href="/">
                        <a>
                          <img src="../static/img/LogoWhite.png" />
                        </a>
                      </Link>
                    </div>
                    <p>Welcome,</p>
                    <p style={{fontWeight: "600"}}>{user.email}</p>
                    <RaisedButton
                      labelColor="rgb(38, 95, 130)"
                      label="Ask Question"
                      style={{width: "100%", marginTop: "10px"}}
                      onClick={this.handleClick}
                    />
                  </div>
                  <div style={{marginBottom: "10px"}}>
                    <RaisedButton
                      backgroundColor="#FFEBEE"
                      labelColor="#B71C1C"
                      label="Sign Out"
                      style={{width: "100%"}}
                      onClick={this.handleSignOut}
                    />
                  </div>
                </div>
              : <div className="drawer_container">
                  <div>
                    <div style={{width: "100%", textAlign: "center", marginBottom: "30px"}}>
                      <Link href="/">
                        <a>
                          <img src="../static/img/LogoWhite.png" />
                        </a>
                      </Link>
                    </div>
                    <p style={{fontWeight: "600"}}>You're not signed in</p>
                    <RaisedButton
                      labelColor="rgb(38, 95, 130)"
                      label="Sign In"
                      style={{width: "100%", marginTop: "10px"}}
                      onClick={this.handleSignIn}
                    />
                  </div>
                </div>
            }
          </Drawer>
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
          onClick={this.handleSubmit}
        >
          <i className="material-icons">search</i>
        </button>
      </div>
    )
  }
}
