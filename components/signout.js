import React from 'react'
import { auth } from '../firebase'

const SignOut = () => (
  <div className="form-field" >
    <button className="button-login" type="button" onClick={auth.doSignOut}>
      Log Out
    </button>
  </div>
)

export default SignOut
