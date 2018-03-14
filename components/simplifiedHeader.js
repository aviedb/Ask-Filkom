import React, { Component } from 'react'
import Link from 'next/link'

export default class SimplifiedHeader extends Component {
  render() {
    return(
      <div style={{ padding: "25px", position: "fixed" }}>
        <Link href="/">
          <a>
            <img src="../static/img/LogoWhite.png" />
          </a>
        </Link>
      </div>
    )
  }
}
