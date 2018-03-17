import React, { Component } from 'react'
import Head from 'next/head'
import moment from 'moment'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import Paper from 'material-ui/Paper'

import { firebase, auth, db } from '../firebase'
import Header from '../components/header'
import Footer from '../components/footer'
import SignedInSidebar from '../components/signedInSidebar'
import NotSignedInSidebar from '../components/notSignedInSidebar'

const muiTheme = getMuiTheme({ userAgent: false })

export default class Answers extends Component {
  constructor(props) {
    super(props)

    this.state = {
      authUser: null,
      question: null,
      qAnswers: [],
      loading: true
    }
  }

  componentDidMount() {
    firebase.auth.onAuthStateChanged(authUser => {
      authUser
        ? this.setState(() => ({authUser}))
        : this.setState(() => ({authUser: null}))
    })

    db.doGetQuestion(this.props.url.query.id, (snapshot) =>
      this.showQuestion(snapshot.val())
    )
  }

  showQuestion(snapshot) {
    let qAnswers = []

    if(snapshot.qAnswers) {
      qAnswers = Object.entries(snapshot.qAnswers)
        .map((item) => Object.assign({}, {key: item[0]}, item[1]))
    }

    this.setState({
      question: snapshot,
      qAnswers,
      loading: false
    })
  }

  render() {
    const ValidId = () => (
      <Paper style={{width: "100%", padding: "30px", marginTop: "10px"}}>
        {!this.state.loading &&
          <div>
            <p style={{fontWeight: "600"}}>
              {this.state.question.title}
            </p>
            <p style={{marginTop: "10px", marginBottom: "10px"}}>
              {this.state.question.question}
            </p>
            <p style={{color: "#265C7D", textAlign: "right", paddingBottom: "10px", borderBottom: "1px solid #265C7D"}}>
              {`${this.state.question.senderEmail}. ${moment(this.state.question.time).calendar()}`}
            </p>
            <h3 style={{margin: "30px"}}>
              {`${this.state.question.answers} Answers`}
            </h3>
            
          </div>
        }
      </Paper>
    )

    const InvalidId = () => (
      <div style={{paddingTop: "250px"}}>
        <h3>404 Question Not Found</h3>
      </div>
    )

    const { authUser } = this.state

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

            <div style={{ padding: "30px", paddingTop: "100px", flex: 1, marginLeft: "10px" }}>
              {this.props.url.query.id
                ? <ValidId />
                : <InvalidId />

              }
            </div>
            <div className="home__sidebar" style={{padding: "30px", paddingTop: "100px"}}>
              <Paper style={{width: "100%", height: "100%", marginTop: "10px", padding: "10px"}}>
                Ads
              </Paper>
            </div>
          </div>
          <Footer />
        </div>
      </MuiThemeProvider>
    )
  }
}
