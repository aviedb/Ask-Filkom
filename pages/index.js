import React, { Component } from 'react'
import Head from 'next/head'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import Header from '../components/header'
import Questions from '../components/questions'

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
          <div style={{ display: "flex" }}>
            <div style={{ padding: "30px", paddingTop: "100px", flex: 3 }}>
              <Questions
                username="Username"
                questionTitle="Question Title"
                question="Question"
                time={new Date()}
                answers="9"
              />
              <Questions
                username="Avied"
                questionTitle="How to define a variable in Java?"
                question="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                time={new Date()}
                answers="999"
              />
            </div>
            <div style={{ marginLeft: "0px", padding: "30px", paddingTop: "100px", flex: 1 }}>
              <Questions
                username="Username"
                questionTitle="Question Title"
                question="Question"
                time={new Date()}
              />
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}
