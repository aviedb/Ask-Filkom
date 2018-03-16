const SimplifiedErrorMessage = (error, email) => {
  if(error === 'The email address is badly formatted.')
    return `${email} is not a valid email.`

  if(error === 'The email address is already in use by another account.')
    return `${email} is already used by another account.`

  if(error === 'The password is invalid or the user does not have a password.')
    return `Incorrect password for ${email}.`

  if(error === 'There is no user record corresponding to this identifier. The user may have been deleted.')
    return `${email} did not match any account.`

  if(error === 'A network error (such as timeout, interrupted connection or unreachable host) has occurred.')
    return 'Connection error. Please try again later.'

  return error
}

export default SimplifiedErrorMessage
