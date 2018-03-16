import React, { Component } from 'react'
import Head from 'next/head'
import Router from 'next/router'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import { firebase } from '../firebase'
import Header from '../components/header'
import Footer from '../components/footer'

const muiTheme = getMuiTheme({ userAgent: false })

export default class NewQuestion extends Component {
  constructor(props) {
    super(props)

    this.state = {
      authUser: null
    }
  }

  componentDidMount() {
    firebase.auth.onAuthStateChanged(authUser => {
      authUser
        ? this.setState(() => ({authUser}))
        : this.setState(() => ({authUser: null}))

      if(authUser) {
        this.setState(() => ({authUser}))
      } else {
        Router.push('/signIn')
      }

    })
  }

  render() {
    const { authUser } = this.state

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <Head>
            <link rel="stylesheet" href="../static/css/styles.css" />
            <link rel="shortcut icon" href="../static/img/simplified_logo_favicon.ico"/>
            <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
            <title>New Question - ask-filkom</title>
          </Head>
          <Header user={authUser}/>
          <div style={{paddingTop: "100px"}}>
            nyeh
          </div>
          <Footer />
        </div>
      </MuiThemeProvider>
    )
  }
}
