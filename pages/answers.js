import React, { Component } from 'react'
import Head from 'next/head'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import Paper from 'material-ui/Paper'

import { firebase, auth, db } from '../firebase'
import Header from '../components/header'
import Footer from '../components/footer'

const muiTheme = getMuiTheme({ userAgent: false })

export default class Answers extends Component {
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
    })
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <Head>
            <link rel="stylesheet" href="../static/css/styles.css" />
            <link rel="shortcut icon" href="../static/img/simplified_logo_favicon.ico"/>
            <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
            <title>Answers - ask-filkom</title>
          </Head>
          <Header user={this.state.authUser} />
          <div style={{ display:"flex" }}>
            <div className="home__sidebar" style={{padding: "30px", paddingTop: "100px"}}>

            </div>
            <div style={{ padding: "30px", paddingTop: "100px", flex: 1, marginLeft: "10px" }}>
              <Paper style={{width: "100%", height: "100%", padding: "10px"}}>
                Nyeh
              </Paper>
            </div>
            <div className="home__sidebar" style={{padding: "30px", paddingTop: "100px"}}>

            </div>
          </div>
          <Footer />
        </div>
      </MuiThemeProvider>
    )
  }
}
