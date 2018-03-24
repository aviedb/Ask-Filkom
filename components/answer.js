import React, { Component } from 'react'
import moment from 'moment'
import Paper from 'material-ui/Paper'

import { db } from '../firebase'

export default class Answer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      upvotedByMe: false,
      downvotedByMe: false,
      upvotedBy: [],
      downvotedBy: [],
      verified: false
    }
  }

  componentDidMount() {
    if(this.props.upvotedBy) {
      this.setState({
        upvotedBy: this.props.upvotedBy
      })

      if(this.props.user) {
        for(var i=0; i<this.props.upvotedBy.length; i++) {
          if(this.props.upvotedBy[i] === this.props.user.uid) {
            this.setState({
              upvotedByMe: true
            })
          }
        }
      }
    }

    if(this.props.downvotedBy) {
      this.setState({
        downvotedBy: this.props.downvotedBy
      })

      if(this.props.user) {
        for(var i=0; i<this.props.downvotedBy.length; i++) {
          if(this.props.downvotedBy[i] === this.props.user.uid) {
            this.setState({
              downvotedByMe: true
            })
          }
        }
      }
    }

    if(this.props.verified) {
      this.setState({
        verified: this.props.verified
      })
    }
  }

  handleUpvote = () => {
    const { upvotedBy, downvotedBy } = this.state
    const { user, qId, id, vote, myQuestion } = this.props
    let cekUpvote, cekDownvote, iU, iD

    for(var i=0; i<upvotedBy.length; i++) {
      if (upvotedBy[i] === user.uid) {
        cekUpvote = true
        iU = i
      }
    }

    for(var i=0; i<downvotedBy.length; i++) {
      if(downvotedBy[i] === user.uid) {
        cekDownvote = true
        iD = i
      }
    }

    if (cekUpvote) {
      db.doDownvoteAnswer(qId, id, vote)
        .then(() => {
          let tempUpvotedBy = upvotedBy
          tempUpvotedBy.splice(iU, 1)

          db.doUpvoteAnswerByUser(qId, id, tempUpvotedBy)
            .then(() => {
              this.setState({
                upvotedBy: tempUpvotedBy,
                upvotedByMe: false
              })

              if(myQuestion) {
                db.doToggleVerified(qId, id, false)
                this.setState({
                  verified: false
                })
              }
            })
        })
    } else if (cekDownvote) {
      db.doUpvoteAnswer(qId, id, (vote+1))
        .then(() => {
          let tempDownvotedBy = downvotedBy
          tempDownvotedBy.splice(iD, 1)

          let tempUpvotedBy = upvotedBy
          tempUpvotedBy.push(user.uid)

          db.doDownvoteAnswerByUser(qId, id, tempDownvotedBy)
            .then(() => {
              this.setState({
                downvotedBy: tempDownvotedBy,
                downvotedByMe: false
              })
            })

          db.doUpvoteAnswerByUser(qId, id, tempUpvotedBy)
            .then(() => {
              this.setState({
                upvotedBy: tempUpvotedBy,
                upvotedByMe: true
              })

              if(myQuestion) {
                db.doToggleVerified(qId, id, true)
                this.setState({
                  verified: true
                })
              }
            })
        })
    } else {
      db.doUpvoteAnswer(qId, id, vote)
        .then(() => {
          let tempUpvotedBy = upvotedBy
          tempUpvotedBy.push(user.uid)

          db.doUpvoteAnswerByUser(qId, id, tempUpvotedBy)
            .then(() => {
              this.setState({
                upvotedBy: tempUpvotedBy,
                upvotedByMe: true
              })

              if(myQuestion) {
                db.doToggleVerified(qId, id, true)
                this.setState({
                  verified: true
                })
              }
            })
        })
    }
  }

  handleDownvote = () => {
    const { upvotedBy, downvotedBy } = this.state
    const { user, qId, id, vote, myQuestion } = this.props
    let cekUpvote, cekDownvote, iU, iD

    for(var i=0; i<upvotedBy.length; i++) {
      if (upvotedBy[i] === user.uid) {
        cekUpvote = true
        iU = i
      }
    }

    for(var i=0; i<downvotedBy.length; i++) {
      if(downvotedBy[i] === user.uid) {
        cekDownvote = true
        iD = i
      }
    }

    if (cekDownvote) {
      db.doUpvoteAnswer(qId, id, vote)
        .then(() => {
          let tempDownvotedBy = downvotedBy
          tempDownvotedBy.splice(iU, 1)

          db.doDownvoteAnswerByUser(qId, id, tempDownvotedBy)
            .then(() => {
              this.setState({
                downvotedBy: tempDownvotedBy,
                downvotedByMe: false
              })
            })
        })
    } else if (cekUpvote) {
      db.doDownvoteAnswer(qId, id, (vote-1))
        .then(() => {
          let tempUpvotedBy = upvotedBy
          tempUpvotedBy.splice(iU, 1)

          let tempDownvotedBy = downvotedBy
          tempDownvotedBy.push(user.uid)

          db.doUpvoteAnswerByUser(qId, id, tempUpvotedBy)
            .then(() => {
              this.setState({
                upvotedBy: tempUpvotedBy,
                upvotedByMe: false
              })
            })

          db.doDownvoteAnswerByUser(qId, id, tempDownvotedBy)
            .then(() => {
              this.setState({
                downvotedBy: tempDownvotedBy,
                downvotedByMe: true
              })
            })

          if(myQuestion) {
            db.doToggleVerified(qId, id, false)
            this.setState({
              verified: false
            })
          }
        })
    } else {
      db.doDownvoteAnswer(qId, id, vote)
        .then(() => {
          let tempDownvotedBy = downvotedBy
          tempDownvotedBy.push(user.uid)

          db.doDownvoteAnswerByUser(qId, id, tempDownvotedBy)
            .then(() => {
              this.setState({
                downvotedBy: tempDownvotedBy,
                downvotedByMe: true
              })
            })
        })
    }
  }

  render() {
    const { senderEmail, time, vote, answer, myQuestion, user } = this.props
    const { upvotedByMe, downvotedByMe, verified } = this.state

    return (
      <Paper style={{width: "100%", padding: "20px", marginTop: "10px"}}>
        <p style={{color: "#265C7D", borderBottom: "1px solid #265C7D"}}>
          {`${senderEmail}. ${moment(time).calendar()}`}
        </p>
        <div style={{display: "flex", marginTop: "20px"}}>
          <div>
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
              {vote}
            </h3>
            <a
              className="downvote"
              onClick={this.handleDownvote}
              style={{color: (downvotedByMe? '#D32F2F':'#858C93')}}
            >
              <i className="material-icons md-48">keyboard_arrow_down</i>
            </a>
            {verified &&
              <div style={{color: '#2E7D32', marginTop: "-10px"}}>
                <i className="material-icons md-48">check</i>
              </div>
            }
          </div>
          <p style={{flex: 1, marginTop: "10px", marginLeft: "10px", whiteSpace: "pre-line"}}>
            {answer}
          </p>
        </div>
      </Paper>
    )
  }
}
