import React, { Component } from 'react'
import FlatButton from 'material-ui/FlatButton'

import { auth } from '../firebase'

export default class SignOutButton extends Component {
  handleClick = () => {
    auth.doSignOut()
  }

  render() {
    return (
      <div style={{textAlign: "right"}}>
        <FlatButton
          label="Sign Out"
          labelStyle={{color: "white"}}
          hoverColor="#1F4C69"
          onClick={this.handleClick}
        />
      </div>
    )
  }
}
