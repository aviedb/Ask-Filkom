import React, { Component } from 'react'
import Link from 'next/link'
import Head from 'next/head'

export default class Header extends Component {
  render() {
    return(
      <div>
        <Head>
          <link rel="stylesheet" href="../static/css/styles.css" />
        </Head>
        <div className="header">
          <div style={{ padding: "20px" }}>
            <Link href="/">
              <a>
                <img src="../static/img/LogoWhite.png"></img>
              </a>
            </Link>
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
              <Link href="/login">
                <button className="button-login">Log In</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
