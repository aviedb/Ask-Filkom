import React, { Component } from 'react'
import Router from 'next/router'
import moment from 'moment'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import Chip from 'material-ui/Chip'

import { db } from '../firebase'

export default class Questions extends Component {
  constructor(props) {
    super(props)

    this.state = {
      upvotedByMe: false,
      downvotedByMe: false,
      upvotedBy: [],
      downvotedBy: []
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


  }

  handleClick = (id) => {
    Router.push(`/answers?id=${id}`)
  }

  handleClickChip = (tag) => {
    Router.push(`/search?searchKeyword=${tag}`)
  }

  handleUpvote = () => {
    const { upvotedBy, downvotedBy } = this.state
    const { vote, user, id } = this.props
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
          tempUpvotedBy.push(user.uid)

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
          tempUpvotedBy.push(user.uid)

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
    const { upvotedBy, downvotedBy } = this.state
    const { vote, user, id } = this.props
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
          tempDownvotedBy.push(user.uid)

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
          tempDownvotedBy.push(user.uid)

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

  render() {
    const {
      title,
      senderEmail,
      time,
      tags,
      question,
      answers,
      id,
      vote
    } = this.props

    const {
      upvotedByMe,
      downvotedByMe
    } = this.state

    return(
      <div>
        <Card style={{margin: "10px 0"}}>
          <CardHeader
            title={title}
            titleStyle={{ fontWeight: "600" }}
            subtitle={`${senderEmail}. ${moment(time).calendar()}`}
            actAsExpander={true}
            showExpandableButton={true}
          >
            <ul style={{display: "flex", flexWrap: "wrap"}}>
              {tags.map((tag, index) =>
                <Chip
                  key={index}
                  style={{ margin: "4", marginTop: "10px", marginRight: "5px" }}
                  onClick={() => this.handleClickChip(tag)}
                >
                  {tag}
                </Chip>
              )}
            </ul>
          </CardHeader>
          <CardText
            expandable={true}
            style={{ borderTop: "1px solid #E5EAED", whiteSpace: "pre-line" }}
          >
            <div style={{display: "flex"}}>
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
              </div>
              <p style={{flex: 1, marginLeft: "10px", marginTop: "10px"}}>
                {question}
              </p>
            </div>
            <CardActions style={{padding:"0", paddingTop: "20px" }}>
              <RaisedButton
                backgroundColor="#275E82"
                labelColor="#FFFFFF"
                label={`${answers} Answers`}
                onClick={() => this.handleClick(id)}
              />
            </CardActions>
          </CardText>
        </Card>
      </div>
    )
  }
}
