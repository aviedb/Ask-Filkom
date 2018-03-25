import React, { Component } from 'react'
import Head from 'next/head'
import Router from 'next/router'
import moment from 'moment'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import RaisedButton from 'material-ui/RaisedButton'
import CircularProgress from 'material-ui/CircularProgress'
import Paper from 'material-ui/Paper'
import Chip from 'material-ui/Chip'

import { firebase, auth, db } from '../firebase'
import Header from '../components/header'
import Footer from '../components/footer'
import Answer from '../components/answer'

const muiTheme = getMuiTheme({ userAgent: false })

const INITIAL_STATE = {
  myAnswer: '',
  qAnswer: [],
  verAnswers: [],
  othAnswers: [],
  loading: true,
  question: null,
  loadingSubmit: false,
  myQuestion: false,
  upvotedByMe: false,
  downvotedByMe: false,
  upvotedBy: [],
  downvotedBy: [],
  id: ''
}

const byPropKey = (propertyName, value) => ({
  [propertyName]: value
})

export default class Answers extends Component {
  constructor(props) {
    super(props)

    this.state = {
      authUser: null,
      ...INITIAL_STATE
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
    let verAnswers = []
    let othAnswers = []
    const { authUser } = this.state

    if(snapshot.upvotedBy) {
      this.setState({
        upvotedBy: snapshot.upvotedBy
      })

      if(authUser) {
        for(var i=0; i<snapshot.upvotedBy.length; i++) {
          if(snapshot.upvotedBy[i] === authUser.uid) {
            this.setState({
              upvotedByMe: true
            })
          }
        }
      }
    }

    if(snapshot.downvotedBy) {
      this.setState({
        downvotedBy: snapshot.downvotedBy
      })

      if(authUser) {
        for(var i=0; i<snapshot.downvotedBy.length; i++) {
          if(snapshot.downvotedBy[i] === authUser.uid) {
            this.setState({
              downvotedByMe: true
            })
          }
        }
      }
    }

    if(snapshot.qAnswer) {
      qAnswers = Object.entries(snapshot.qAnswer)
        .map((item) => Object.assign({}, {key: item[0]}, item[1]))
    }

    verAnswers = qAnswers.filter((qAnswer) =>
      qAnswer.verified
    )

    othAnswers = qAnswers.filter((qAnswer) =>
      !qAnswer.verified
    )

    this.setState({
      question: snapshot,
      qAnswers,
      verAnswers,
      othAnswers,
      loading: false,
      id: this.props.url.query.id
    })

    if(authUser) {
      this.setState({
        myQuestion: (snapshot.senderId === authUser.uid)
      })
    }
  }

  handleUpvote = () => {
    const { upvotedBy, downvotedBy, authUser, id } = this.state
    const { vote } = this.state.question
    let cekUpvote, cekDownvote, iU, iD

    for(var i=0; i<upvotedBy.length; i++) {
      if (upvotedBy[i] === authUser.uid) {
        cekUpvote = true
        iU = i
      }
    }

    for(var i=0; i<downvotedBy.length; i++) {
      if(downvotedBy[i] === authUser.uid) {
        cekDownvote = true
        iD = i
      }
    }

    if (cekUpvote) {
      db.doDownvoteQuestion(id, vote)
        .then(() => {
          let tempUpvotedBy = upvotedBy
          tempUpvotedBy.splice(iU, 1)

          db.doUpvoteQuestionByUser(id, tempUpvotedBy)
            .then(() => {
              this.setState({
                upvotedBy: tempUpvotedBy,
                upvotedByMe: false
              })
            })
        })
    } else if (cekDownvote) {
      db.doUpvoteQuestion(id, (vote+1))
        .then(() => {
          let tempDownvotedBy = downvotedBy
          tempDownvotedBy.splice(iD, 1)

          let tempUpvotedBy = upvotedBy
          tempUpvotedBy.push(authUser.uid)

          db.doDownvoteQuestionByUser(id, tempDownvotedBy)
            .then(() => {
              this.setState({
                downvotedBy: tempDownvotedBy,
                downvotedByMe: false
              })
            })

          db.doUpvoteQuestionByUser(id, tempUpvotedBy)
          .then(() => {
            this.setState({
              upvotedBy: tempUpvotedBy,
              upvotedByMe: true
            })
          })
        })
    } else {
      db.doUpvoteQuestion(id, vote)
        .then(() => {
          let tempUpvotedBy = upvotedBy
          tempUpvotedBy.push(authUser.uid)

          db.doUpvoteQuestionByUser(id, tempUpvotedBy)
          .then(() => {
            this.setState({
              upvotedBy: tempUpvotedBy,
              upvotedByMe: true
            })
          })
        })
    }
  }

  handleDownvote = () => {
    const { upvotedBy, downvotedBy, authUser, id } = this.state
    const { vote } = this.state.question
    let cekUpvote, cekDownvote, iU, iD

    for(var i=0; i<upvotedBy.length; i++) {
      if (upvotedBy[i] === authUser.uid) {
        cekUpvote = true
        iU = i
      }
    }

    for(var i=0; i<downvotedBy.length; i++) {
      if(downvotedBy[i] === authUser.uid) {
        cekDownvote = true
        iD = i
      }
    }

    if (cekDownvote) {
      db.doUpvoteQuestion(id, vote)
        .then(() => {
          let tempDownvotedBy = downvotedBy
          tempDownvotedBy.splice(iU, 1)

          db.doDownvoteQuestionByUser(id, tempDownvotedBy)
            .then(() => {
              this.setState({
                downvotedBy: tempDownvotedBy,
                downvotedByMe: false
              })
            })
        })
    } else if (cekUpvote) {
      db.doDownvoteQuestion(id, (vote-1))
        .then(() => {
          let tempUpvotedBy = upvotedBy
          tempUpvotedBy.splice(iU, 1)

          let tempDownvotedBy = downvotedBy
          tempDownvotedBy.push(authUser.uid)

          db.doUpvoteQuestionByUser(id, tempUpvotedBy)
            .then(() => {
              this.setState({
                upvotedBy: tempUpvotedBy,
                upvotedByMe: false
              })
            })

          db.doDownvoteQuestionByUser(id, tempDownvotedBy)
            .then(() => {
              this.setState({
                downvotedBy: tempDownvotedBy,
                downvotedByMe: true
              })
            })
        })
    } else {
      db.doDownvoteQuestion(id, vote)
        .then(() => {
          let tempDownvotedBy = downvotedBy
          tempDownvotedBy.push(authUser.uid)

          db.doDownvoteQuestionByUser(id, tempDownvotedBy)
            .then(() => {
              this.setState({
                downvotedBy: tempDownvotedBy,
                downvotedByMe: true
              })
            })
        })
    }
  }

  handleClick = () => {
    this.setState(byPropKey('loadingSubmit', true))

    const {
      authUser,
      myAnswer,
      question,
      loading,
      qAnswers
    } = this.state

    db.doCreateAnswer(this.props.url.query.id, authUser.uid, authUser.email, myAnswer, 0, new Date().getTime())
      .then(() => {
        db.doUpdateAnswerCount(this.props.url.query.id, question.answers)
          .then(() => {
            this.setState({
              myAnswer: '',
              loadingSubmit: false
            })
          })
      })
  }

  handleClickChip = (tag) => {
    Router.push(`/search?searchKeyword=${tag}`)
  }

  render() {
    const {
      authUser,
      myAnswer,
      question,
      loading,
      qAnswers,
      verAnswers,
      othAnswers,
      loadingSubmit,
      myQuestion,
      upvotedByMe,
      downvotedByMe
    } = this.state

    const isInvalid = myAnswer === ''

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <Head>
            <link rel="stylesheet" href="../static/css/styles.css" />
            <link rel="shortcut icon" href="../static/img/simplified_logo_favicon.ico"/>
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
              rel="stylesheet"/>
            <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
            {!loading &&
              <title>{question.title} - ask-filkom</title>
            }
          </Head>
          <Header user={authUser} />
          <div style={{ display:"flex" }}>

            <div className="answers_main">
              {this.props.url.query.id &&
                <Paper style={{width: "100%", padding: "30px", marginTop: "10px"}}>
                  {loading &&
                    <div style={{textAlign: "center"}}>
                      <CircularProgress color="rgb(39, 94, 130)"/>
                    </div>
                  }
                  {!loading &&
                    <div>
                      <p style={{fontWeight: "600"}}>
                        {question.title}
                      </p>
                      <div style={{display: "flex"}}>
                        <div style={{marginLeft: "-10px"}}>
                          <a
                            className="upvote"
                            onClick={this.handleUpvote}
                            style={{color: (upvotedByMe? '#2E7D32':'#858C93')}}
                          >
                            <i className="material-icons md-48">keyboard_arrow_up</i>
                          </a>
                          <h3
                            style={{
                              color: (upvotedByMe? '#2E7D32':(downvotedByMe?'#D32F2F':'#858C93'))
                            }}
                          >
                            {question.vote}
                          </h3>
                          <a
                            className="downvote"
                            onClick={this.handleDownvote}
                            style={{color: (downvotedByMe? '#D32F2F':'#858C93')}}
                          >
                            <i className="material-icons md-48">keyboard_arrow_down</i>
                          </a>
                        </div>
                        <p style={{flex: 1, marginTop: "10px", marginBottom: "10px", marginLeft: "10px", whiteSpace: "pre-line"}}>
                          {question.question}
                        </p>
                      </div>
                      <div style={{marginTop: "20px", paddingBottom: "10px", borderBottom: "1px solid #265C7D"}}>
                        <div style={{color: "#265C7D",textAlign: "right"}}>
                          <p>
                            {question.senderEmail}
                          </p>
                          <p>
                            {moment(question.time).calendar()}
                          </p>
                        </div>
                        <ul style={{display: "flex", flexWrap: "wrap"}}>
                          {question.tags.map((tag, index) =>
                            <Chip
                              key={index}
                              style={{marginTop: "10px", marginRight: "5px"}}
                              onClick={() => this.handleClickChip(tag)}
                            >
                              {tag}
                            </Chip>
                          )}
                        </ul>
                      </div>
                      {!loadingSubmit &&
                        <div>
                          <h3 style={{margin: "30px"}}>
                            {`${question.answers} Answers`}
                          </h3>
                          <ul style={{paddingBottom: "20px", borderBottom: "1px solid #265C7D"}}>
                            {verAnswers.map((qAnswer) =>
                              <Answer
                                user={authUser}
                                id={qAnswer.key}
                                qId={this.props.url.query.id}
                                myQuestion={myQuestion}
                                {...qAnswer}
                              />
                            )}
                            {othAnswers.map((qAnswer) =>
                              <Answer
                                user={authUser}
                                id={qAnswer.key}
                                qId={this.props.url.query.id}
                                myQuestion={myQuestion}
                                {...qAnswer}
                              />
                            )}
                          </ul>
                        </div>
                      }
                    </div>
                  }
                  {authUser &&
                    <div>
                      <p style={{fontWeight: "600", marginTop: "30px"}}>
                        Your Answer
                      </p>
                      <textarea
                        rows={10}
                        placeholder="Answer here"
                        style={{padding: "10px"}}
                        value={myAnswer}
                        onChange={event =>
                          this.setState(byPropKey('myAnswer', event.target.value))}
                      />
                      <div>
                        {loadingSubmit &&
                          <CircularProgress
                            style={{ position: "absolute", marginTop: "10px", marginLeft: "27px", zIndex: "1"}}
                            color="#FFFFFF"
                            size={35}
                          />
                        }
                        <RaisedButton
                          label="Submit"
                          backgroundColor="rgb(38, 95, 130)"
                          labelColor="#FFFFFF"
                          disabledBackgroundColor="#698EA5"
                          disabledLabelColor="#FFFFFF"
                          disabled={isInvalid || loadingSubmit}
                          style={{marginTop: "10px"}}
                          onClick={this.handleClick}
                        />
                      </div>
                    </div>
                  }
                </Paper>
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
