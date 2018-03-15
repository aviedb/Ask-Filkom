import React from 'react'
import Link from 'next/link'
import FlatButton from 'material-ui/FlatButton'

const signIn = () => (
    <div className="form-field">
      <Link href="/signIn">
        <FlatButton
          label="Sign In"
          labelStyle={{color: "white"}}
          hoverColor="#1F4C69"
        />
      </Link>
    </div>
)

export default signIn
