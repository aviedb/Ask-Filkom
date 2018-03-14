const SimplifiedErrorMessage = (error, email) => {
  if(error === 'The email address is badly formatted.')
    return `${email} is not a valid email.`

  if(error === 'The email address is already in use by another account.')
    return `${email} is already used by another account`

  if(error === 'The password is invalid or the user does not have a password.')
    return `Incorrect password for ${email}`

  return error
}

export default SimplifiedErrorMessage
