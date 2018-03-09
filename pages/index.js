import React, { Component } from 'react'
import Head from 'next/head'

import Header from '../components/header'

export default class Index extends Component {
  render() {
    return(
      <div>
        <Head>
          <link rel="stylesheet" href="../static/css/styles.css" />
          <link rel="shortcut icon" href="../static/img/simplified_logo_favicon.ico"/>
          <title>ask-filkom - Home</title>
        </Head>
        <Header />
        <div style={{ padding: "30px", paddingTop: "100px" }}>
          
        </div>
      </div>
    )
  }
}
