import React, { Component } from 'react'
import Head from 'next/head'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import Header from '../components/header'

const muiTheme = getMuiTheme({ userAgent: false })

export default class Index extends Component {
  render() {
    return(
      <MuiThemeProvider muiTheme={muiTheme}>
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
      </MuiThemeProvider>
    )
  }
}
