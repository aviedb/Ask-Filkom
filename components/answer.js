import React, { Component } from 'react'
import moment from 'moment'
import Paper from 'material-ui/Paper'

export default class Answer extends Component {
  render() {
    return (
      <Paper style={{width: "100%", padding: "20px", marginTop: "10px"}}>
        <p style={{color: "#265C7D", borderBottom: "1px solid #265C7D"}}>
          {`${this.props.senderEmail}. ${moment(this.props.time).calendar()}`}
        </p>
        <p style={{marginTop: "20px"}}>
          {this.props.answer}
        </p>
      </Paper>
    )
  }
}
