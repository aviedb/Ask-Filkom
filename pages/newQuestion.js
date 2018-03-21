import React, { Component } from 'react'
import Head from 'next/head'
import Router from 'next/router'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import CircularProgress from 'material-ui/CircularProgress'
import AutoComplete from 'material-ui/AutoComplete'
import Chip from 'material-ui/Chip'
import Snackbar from 'material-ui/Snackbar'

import { firebase, auth, db } from '../firebase'
import Header from '../components/header'
import Footer from '../components/footer'
import TagsDataSource from '../utils/tagsDataSource'

const muiTheme = getMuiTheme({ userAgent: false })

const INITIAL_STATE = {
  title: '',
  question: '',
  tags: [],
  tagsValue: '',
  loadingSubmit: false,
  openSnackbar: false,
  error: ''
}

const byPropKey = (propertyName, value) => ({
  [propertyName]: value
})

export default class NewQuestion extends Component {
  constructor(props) {
    super(props)

    this.state = {
      authUser: null,
      ...INITIAL_STATE
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

  handleClick = () => {
    this.setState({
      loadingSubmit: true
    })

    const {
      authUser,
      title,
      question,
      tags
    } = this.state

    db.doCreateQuestion(authUser.uid, authUser.email, title, question, tags, new Date().getTime(), 0)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }))
        const { tags } = this.state
        let tempTags = tags
        tempTags.splice(0, 1)

        this.setState({tags: tempTags})
        Router.push('/')
      })

  }

  onNewRequest = (chosenRequest) => {
    const { tags } = this.state
    let tempTags = tags
    let cek = false

    for(var i=0; i<tempTags.length; i++) {
      if(chosenRequest === tempTags[i]) {
        cek = true
      }
    }

    if (!cek) {
      tempTags.push(chosenRequest)
    } else {
      this.setState({
        openSnackbar: true,
        error: 'Cannot add duplicate tags!'
      })
    }

    if(tempTags.length > 3) {
      this.setState({
        openSnackbar: true,
        error: 'You can only add 3 Tags!'
      })
    }

    this.setState({
      tags: tempTags.slice(0, 3),
      tagsValue: ''
    })

  }

  onNewUpdateInput = (searchText) => {
    this.setState({
      tagsValue: searchText
    })
  }

  handleRequestDelete = (index) => {
    const { tags } = this.state
    let tempTags = tags
    tempTags.splice(index, 1)

    this.setState({tags: tempTags})
  }

  handleRequestClose = () => {
    this.setState({
      openSnackbar: false,
      error: ''
    })
  }

  render() {
    const {
      authUser,
      title,
      question,
      tags,
      tagsValue,
      time,
      loadingSubmit,
      openSnackbar,
      error
    } = this.state

    const isInvalid =
      title === '' ||
      question === '' ||
      tags.length === 0

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <Head>
            <link rel="stylesheet" href="../static/css/styles.css" />
            <link rel="shortcut icon" href="../static/img/simplified_logo_favicon.ico"/>
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
              rel="stylesheet"/>
            <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
            <title>New Question - ask-filkom</title>
          </Head>
          <Header user={authUser}/>
          <div style={{display: "flex"}}>
            <div className="home__sidebar">

            </div>
            <div className="newQuestion_main">
              <Paper style={{padding: "30px", marginTop: "10px", textAlign: "right"}}>
                <h3>Ask a Question</h3>
                <TextField
                  floatingLabelText="Title"
                  floatingLabelStyle={{ color: "rgb(39, 94, 130)" }}
                  type="text"
                  fullWidth={true}
                  underlineStyle={{ borderColor: "rgb(39, 107, 129)" }}
                  underlineFocusStyle={{ borderColor: "rgb(39, 94, 130)" }}
                  style={{marginBottom: "10px"}}
                  value={title}
                  onChange={event =>
                    this.setState(byPropKey('title', event.target.value))}
                />
                <textarea
                  rows={10}
                  placeholder="Question"
                  style={{padding: "10px"}}
                  value={question}
                  onChange={event =>
                    this.setState(byPropKey('question', event.target.value))}
                />
                <div style={{width: "100%", display: "flex", justifyContent: "space-between"}}>
                  <div style={{textAlign: "left"}}>
                    <AutoComplete
                      floatingLabelText="Tags"
                      filter={AutoComplete.fuzzyFilter}
                      dataSource={TagsDataSource}
                      floatingLabelStyle={{ color: "rgb(39, 94, 130)" }}
                      type="text"
                      underlineStyle={{ borderColor: "rgb(39, 107, 129)" }}
                      underlineFocusStyle={{ borderColor: "rgb(39, 94, 130)" }}
                      style={{width: "100%", marginTop: "-10px"}}
                      textFieldStyle={{width: "100%"}}
                      searchText={tagsValue}
                      onUpdateInput={this.onNewUpdateInput.bind(this)}
                      onNewRequest={this.onNewRequest.bind(this)}
                    />
                  </div>
                  <div>
                    { loadingSubmit &&
                      <CircularProgress
                        style={{ position: "absolute", marginTop: "15px", marginLeft: "27px", zIndex: "1"}}
                        color="white"
                        size={35}
                      />
                    }
                    <RaisedButton
                      label="Submit"
                      backgroundColor="rgb(38, 95, 130)"
                      labelColor="white"
                      disabledBackgroundColor="#698EA5"
                      disabledLabelColor="white"
                      style={{marginTop: "15px"}}
                      disabled={isInvalid || loadingSubmit}
                      onClick={this.handleClick}
                    />
                  </div>
                </div>
                {tags.length>0 &&
                  <ul style={{display: "flex", flexWrap: "wrap"}}>
                    {tags.map((tag, index) =>(
                      <Chip style={{marginTop: "10px", marginRight: "5px"}} onRequestDelete={() => this.handleRequestDelete(index)} key={index}>
                        {tag}
                      </Chip>
                    ))}
                  </ul>
                }
              </Paper>
            </div>
            <div className="home__sidebar" style={{padding: "30px", paddingTop: "100px"}}>
              <Paper style={{width: "100%", height: "100%", marginTop: "10px", padding: "10px"}}>
                Ads
              </Paper>
            </div>
          </div>
          <Snackbar
            open={openSnackbar}
            message={error}
            autoHideDuration={4000}
            onRequestClose={this.handleRequestClose}
          />
          <Footer />
        </div>
      </MuiThemeProvider>
    )
  }
}
