import React, { Component } from 'react'
import Paper from 'material-ui/Paper'

export default class NotSignedInSidebar extends Component {
  render() {
    return (
      <div style={{position: "fixed", width: "250px", borderRight: "1px solid grey"}}>
        <Paper style={{margin: "10px", padding: "15px"}}>
          <p>Want to ask question?</p>
          <a href="/signIn">
            <p style={{fontWeight: "600", color: "#286A81"}}>Sign In now</p>
          </a>
        </Paper>
      </div>
    )
  }
}
