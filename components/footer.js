import React, { Component } from 'react'
import Link from 'next/link'

export default class Footer extends Component {
  render() {
    return(
      <div className="footer">
        <div className="footer__form" style={{textAlign: "center"}}>
          <img src="../static/img/Logo.png"/>
        </div>
        <div className="footer__form" style={{ marginTop: "80px" }}>
          <p>Copyright © 2018 ask-filkom</p>
        </div>
        <div className="footer__form" style={{textAlign: "right"}}>
          <p>Kelompok 10:</p>
          <p>Muhammad Avied Bachmid</p>
          <p>Rizky Fachrizzar Revaldy</p>
          <p>Khairi Ubaidah</p>
        </div>
      </div>
    )
  }
}
