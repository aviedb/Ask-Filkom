import React from 'react'
import FlatButton from 'material-ui/FlatButton'

import { auth } from '../firebase'

const SignOut = () => (
  <div className="form-field" >
    <FlatButton
      label="Sign Out"
      labelStyle={{color: "white"}}
      hoverColor="#1F4C69"
      onClick={auth.doSignOut}
    />
  </div>
)

export default SignOut
