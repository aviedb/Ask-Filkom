import React, { Component } from 'react'
import Head from 'next/head'
import Router from 'next/router'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

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
          <div style={{display: "flex"}}>
            <div className="home__sidebar">

            </div>
            <div style={{flex: "1", padding: "30px", paddingTop: "100px"}}>
              <Paper style={{padding: "30px", textAlign: "right"}}>
                <p><h3>Ask a Question</h3></p>
                <TextField
                  floatingLabelText="Title"
                  floatingLabelStyle={{ color: "rgb(39, 94, 130)" }}
                  type="text"
                  fullWidth={true}
                  underlineStyle={{ borderColor: "rgb(39, 107, 129)" }}
                  underlineFocusStyle={{ borderColor: "rgb(39, 94, 130)" }}
                  style={{marginBottom: "20px"}}
                />
                <textarea rows={10} placeholder="Your Question" style={{padding: "10px"}}/>
                  <RaisedButton
                    label="Submit"
                    backgroundColor="rgb(38, 95, 130)"
                    labelColor="white"
                    disabledBackgroundColor="#698EA5"
                    disabledLabelColor="white"
                    style={{marginTop: "10px"}}
                  />
              </Paper>
            </div>
            <div className="home__sidebar">

            </div>
          </div>
          <Footer />
        </div>
      </MuiThemeProvider>
    )
  }
}
