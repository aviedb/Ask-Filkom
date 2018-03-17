import React, { Component } from 'react'
import Router from 'next/router'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'

export default class SignedInSidebar extends Component {
  handleClick() {
    Router.push('/newQuestion')
  }

  render() {
    const { email } = this.props.authUser

    return (
      <div style={{position: "fixed", width: "250px", borderRight: "1px solid grey"}}>
        <Paper style={{margin: "10px", padding: "15px"}}>
          <p>Welcome,</p>
          <p style={{fontWeight: "600"}}>{email}</p>
          <RaisedButton
            backgroundColor="rgb(38, 95, 130)"
            labelColor="white"
            label="Ask Question"
            style={{width: "100%", marginTop: "10px"}}
            onClick={this.handleClick}
          />
        </Paper>
      </div>
    )
  }
}
