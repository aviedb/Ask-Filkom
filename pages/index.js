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
            <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
            <title>ask-filkom - Home</title>
          </Head>
          <Header />
          <div style={{ display: "flex" }}>
            <div style={{ padding: "30px", paddingTop: "100px", flex: 1 }}>
              <Questions
                username="Username"
                questionTitle="Question Title"
                question="Question"
                time={new Date()}
                tags="tag"
                answers="9"
              />
              <Questions
                username="Avied"
                questionTitle="How to define a variable in Java?"
                question="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                time={new Date()}
                tags="Java"
                answers="999"
              />
              <Questions
                username="Satya Nadella"
                questionTitle="Bagi kisi-kisi UTS Jarkom dong!"
                question="Aku ga paham sama seklai jarkom :("
                time={new Date()}
                tags="Jarkom"
                answers="0"
              />
            </div>
            <div className="home__sidebar">

            </div>
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}
